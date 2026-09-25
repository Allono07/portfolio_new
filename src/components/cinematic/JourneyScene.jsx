import { useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createAstronaut, SUIT_DIMENSIONS } from './astronaut.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { getBinarySurface } from './binaryRain.js';
import { EYE_BAR, HEAD, JOURNEY } from './calibration.js';

gsap.registerPlugin(ScrollTrigger);
const PART_ORDER = [['chest'],['backpack'],['upperArm_L','upperArm_R'],['forearm_L','forearm_R'],['glove_L','glove_R'],['hips','thigh_L','thigh_R','shin_L','shin_R','boot_L','boot_R'],['helmet'],['visor']];

export default function JourneyScene({ reduced }) {
  const container = useRef(null);
  const [ready,setReady] = useState(false);
  const [failed,setFailed] = useState(false);
  const [debug,setDebug] = useState(false);
  const seek=useRef(()=>{});
  useLayoutEffect(() => {
    const host=container.current;
    const home=host.closest('.cinematic-home');
    const hero=home.querySelector('.hero');
    const portrait=home.querySelector('.portrait-stage');
    const photo=home.querySelector('.portrait-visual');
    const landing=home.querySelector('.landing-zone');
    const onDebug=event=>{if(import.meta.env.DEV&&event.key.toLowerCase()==='d'&&!/INPUT|TEXTAREA/.test(event.target.tagName))setDebug(value=>!value);};
    window.addEventListener('keydown',onDebug);
    let renderer;
    try { renderer=new THREE.WebGLRenderer({alpha:true,antialias:window.innerWidth>760,powerPreference:'low-power',preserveDrawingBuffer:reduced}); }
    catch {setFailed(true);window.removeEventListener('keydown',onDebug);return;}
    renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.02;
    host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
    const scene=new THREE.Scene();
    // Local procedural studio reflections: no HDR download or third-party asset.
    const room=new RoomEnvironment();
    const pmrem=new THREE.PMREMGenerator(renderer);
    const environmentTarget=pmrem.fromScene(room,.035);
    scene.environment=environmentTarget.texture;scene.environmentIntensity=.48;
    scene.environmentRotation.set(.12,.65,0);
    room.dispose();pmrem.dispose();
    const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,5000);camera.position.set(0,0,1600);
    scene.add(new THREE.HemisphereLight(0xffffff,0x454545,.5));
    const key=new THREE.DirectionalLight(0xffffff,1.9);key.position.set(-500,700,900);scene.add(key);
    const fill=new THREE.DirectionalLight(0xffffff,.4);fill.position.set(700,0,400);scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffffff,1.6);rim.position.set(300,400,-700);scene.add(rim);
    const astronaut=createAstronaut();scene.add(astronaut.root);
    const rain=getBinarySurface();
    const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
    const shadowCtx=shadowCanvas.getContext('2d');const gradient=shadowCtx.createRadialGradient(64,64,0,64,64,64);gradient.addColorStop(0,'rgba(0,0,0,.28)');gradient.addColorStop(1,'rgba(0,0,0,0)');shadowCtx.fillStyle=gradient;shadowCtx.fillRect(0,0,128,128);
    const shadowTexture=new THREE.CanvasTexture(shadowCanvas);
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,opacity:0,depthWrite:false}));scene.add(shadow);
    const environment=new THREE.Group();scene.add(environment);
    const gridMaterial=new THREE.LineBasicMaterial({color:0x888888,transparent:true,opacity:.28});
    for(let i=0;i<4;i++){
      const shape=new THREE.EdgesGeometry(new THREE.BoxGeometry(55+i*12,30+i*9,15));
      const lines=new THREE.LineSegments(shape,gridMaterial);lines.position.set(i%2?75:-85,120-i*80,-100);lines.rotation.set(.3,.35,i*.22);environment.add(lines);
    }
    const state={environmentOpacity:0,active:0};
    let timeline, lenis, frame=0, lastFrame=0, stopped=false, resizeTimer, width=0,height=0,resizeObserver;
    let visible=true;
    const performanceSample={start:0,frames:0};
    let contentHeight=0;
    const latchRest=astronaut.latches.map(ring=>ring.position.clone());
    const rest=new Map();for(const [name,node] of Object.entries(astronaut.parts))rest.set(name,node.position.clone());
    function render(time=0) {
      if(stopped)return;
      const mobile=width<761;
      if(visible&&!document.hidden&&(reduced||time-lastFrame>=(mobile?1000/JOURNEY.mobileFps:1000/60)-.7)){
        lastFrame=time;rain.draw(reduced?0:time);astronaut.texture.needsUpdate=true;
        gridMaterial.opacity=state.environmentOpacity;
        environment.visible=!reduced&&state.environmentOpacity>.001;
        for(const node of Object.values(astronaut.parts))node.visible=node.userData.materials.some(material=>material.opacity>.001);
        renderer.render(scene,camera);
        if(import.meta.env.DEV){
          performanceSample.frames++;
          if(time-performanceSample.start>=1000){
            host.dataset.fps=String(Math.round(performanceSample.frames*1000/(time-performanceSample.start)));
            host.dataset.drawCalls=String(renderer.info.render.calls);
            performanceSample.start=time;performanceSample.frames=0;
          }
        }
      }
      if(!reduced&&visible&&!document.hidden)frame=requestAnimationFrame(render);
    }
    function sync(){cancelAnimationFrame(frame);if(visible&&!document.hidden)frame=requestAnimationFrame(render);}
    const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});visibility.observe(home);
    document.addEventListener('visibilitychange',sync);
    function init() {
      timeline?.scrollTrigger?.kill();timeline?.kill();
      width=window.innerWidth;height=window.innerHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio,width<761?JOURNEY.mobileDpr:JOURNEY.desktopDpr));
      renderer.setSize(width,height);camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.zoom=1;camera.updateProjectionMatrix();
      for(const [name,node] of Object.entries(astronaut.parts)){node.position.copy(rest.get(name));node.rotation.set(0,0,0);node.scale.setScalar(1);node.userData.materials.forEach(m=>{m.opacity=1;if(m.emissive){m.emissive.copy(m.userData.restEmissive);m.emissiveIntensity=m.userData.restEmissiveIntensity;}});}
      Object.values(astronaut.joints).forEach(j=>j.rotation.set(0,0,0));
      for(const side of ['L','R'])astronaut.joints[`shoulder_${side}`].position.y=.59;
      astronaut.latches.forEach((ring,i)=>ring.position.copy(latchRest[i]));
      astronaut.root.rotation.set(0,0,0);astronaut.root.visible=true;
      if(reduced){
        host.classList.add('scene-still');
        const size=Math.min((landing.clientHeight-105)/(SUIT_DIMENSIONS.crownY-SUIT_DIMENSIONS.soleY),landing.clientWidth/4,60);
        renderer.setSize(landing.clientWidth,landing.clientHeight);
        camera.left=-landing.clientWidth/2;camera.right=landing.clientWidth/2;camera.top=landing.clientHeight/2;camera.bottom=-landing.clientHeight/2;camera.updateProjectionMatrix();
        const floor=85-landing.clientHeight/2;
        astronaut.root.scale.setScalar(size);astronaut.root.position.set(0,floor-SUIT_DIMENSIONS.soleY*size,0);
        shadow.position.set(0,floor-2,-20);shadow.scale.set(size*3.6,size*.6,1);shadow.material.opacity=.9;
        astronaut.joints.shoulder_L.rotation.z=-.13;astronaut.joints.shoulder_R.rotation.z=.16;
        environment.visible=false;render(0);
        // A true still of the same assembled procedural model, with no ongoing renderer.
        const still=new Image();still.alt='The fully assembled astronaut standing upright';still.src=renderer.domElement.toDataURL('image/png');still.className='astronaut-still';
        landing.querySelector('.astronaut-still')?.remove();landing.appendChild(still);host.style.visibility='hidden';
        setReady(true);return;
      }
      home.classList.add('journey-enabled');
      const heroBounds=hero.getBoundingClientRect(),p=portrait.getBoundingClientRect();
      const eyeX=p.left+p.width*(EYE_BAR.x+EYE_BAR.w/2)/100;
      const eyeY=p.top-heroBounds.top+p.height*(EYE_BAR.y+EYE_BAR.h/2)/100;
      // Fit an enclosing pressure helmet without stretching it into the portrait's shape.
      const scale=Math.max(
        p.width*HEAD.w/100/SUIT_DIMENSIONS.helmetWidth,
        p.height*HEAD.h/100/SUIT_DIMENSIONS.helmetHeight,
        p.width*EYE_BAR.w/100/1.66,
      )*1.12;
      astronaut.calibrateEye(p.width*EYE_BAR.w/100/scale,p.height*EYE_BAR.h/100/scale);
      shadow.material.opacity=0;state.environmentOpacity=0;
      const shoulderY=height/2-(p.top-heroBounds.top+p.height*HEAD.shoulderY/100);
      const rootX=eyeX-width/2,rootY=height/2-eyeY-SUIT_DIMENSIONS.visorY*scale;
      astronaut.root.position.set(rootX,rootY,0);astronaut.root.scale.setScalar(scale);
      // The shoulder calibration adjusts the chest assembly relative to the photo.
      const chestOffset=(shoulderY-rootY)/scale-.9;
      const torsoOffset=Math.max(-.12,Math.min(.12,chestOffset));
      astronaut.parts.chest.position.y=.03+torsoOffset;
      for(const side of ['L','R'])astronaut.joints[`shoulder_${side}`].position.y=.59+torsoOffset;
      const assembly=height*JOURNEY.assemblyScreens;
      const total=Math.max(assembly+height,home.scrollHeight-height);
      const smallScale=width<761?12:Math.min(39,width*.026);
      const laneX=width*(width<761?.89:.88)-width/2;
      const floatY=-height*.06;
      timeline=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'astronaut-master',trigger:home,start:'top top',end:()=>`+=${home.scrollHeight-window.innerHeight}`,scrub:true,pin:host,pinSpacing:false,invalidateOnRefresh:true,onUpdate:self=>{host.dataset.progress=self.progress.toFixed(4);}}});
      timeline.to(state,{active:1,duration:total},0);
      timeline.fromTo(home.querySelectorAll('.hero-copy,.hero-note,.hero-topline,.hero-bottom'),{opacity:1},{opacity:0,duration:height*.42},height*.07);
      timeline.fromTo(home.querySelector('.hero-name'),{opacity:1,y:0},{opacity:.12,y:-30,duration:height*.8},height*.12);
      PART_ORDER.forEach((names,index)=>names.forEach((name,side)=>{
        const node=astronaut.parts[name];const target=node.position.clone();
        const direction=name.endsWith('_L')?-1:name.endsWith('_R')?1:0;
        const start=index===6?[0,8,0]:index===7?[0,0,8]:[direction?(direction*7):(index%2?6:-6),index%2?3:-3,3];
        const at=height*(.18+index*.17+side*.035);
        const duration=height*.43;
        timeline.fromTo(node.position,{x:target.x+start[0],y:target.y+start[1],z:target.z+start[2]},{x:target.x,y:target.y,z:target.z,duration,ease:'power3.out'},at);
        timeline.fromTo(node.rotation,{x:.3,y:direction*.8,z:direction*.7},{x:0,y:0,z:0,duration,ease:'power3.out'},at);
        timeline.fromTo(node.scale,{x:1.04,y:1.04,z:1.04},{x:1,y:1,z:1,duration,ease:'power3.out'},at);
        node.userData.materials.forEach(material=>{
          timeline.fromTo(material,{opacity:0},{opacity:1,duration:height*.14},at);
          // A brief glint on hardware only; fabric never glows like plastic.
          if(material.emissive&&material.metalness>.5){
            material.emissive.set(0x777777);material.emissiveIntensity=0;
            timeline.to(material,{emissiveIntensity:.55,duration:height*.035},at+duration*.85);
            timeline.to(material,{emissiveIntensity:0,duration:height*.1},at+duration);
          }
        });
      }));
      astronaut.latches.forEach((ring,i)=>timeline.fromTo(ring.position,{y:ring.position.y+.18},{y:ring.position.y,duration:height*.15,ease:'power3.out'},height*(1.35+i*.09)));
      timeline.fromTo(photo,{opacity:1},{opacity:0,duration:height*.22},height*1.94);
      timeline.to(camera,{zoom:1.025,duration:height*.15,onUpdate:()=>camera.updateProjectionMatrix()},height*1.83);
      timeline.to(camera,{zoom:1,duration:height*.2,onUpdate:()=>camera.updateProjectionMatrix()},height*2.08);
      timeline.to(astronaut.root.position,{x:rootX+2,duration:height*.025},height*1.96).to(astronaut.root.position,{x:rootX-2,duration:height*.025},height*1.985).to(astronaut.root.position,{x:rootX,duration:height*.025},height*2.01);
      timeline.to(astronaut.root.scale,{x:smallScale,y:smallScale,z:smallScale,duration:height*.62,ease:'power2.inOut'},height*2.18);
      timeline.to(astronaut.root.position,{x:laneX,y:floatY,duration:height*.62,ease:'power2.inOut'},height*2.18);
      timeline.to(astronaut.root.rotation,{z:-.22,y:.3,duration:height*.62},height*2.18);
      timeline.to(state,{environmentOpacity:.28,duration:height*.5},assembly);
      environment.position.set(laneX,floatY,-100);environment.scale.setScalar(width<761?.42:1);
      const journeyEnd=total-height*.83;
      timeline.to(astronaut.root.rotation,{z:-Math.PI*2+.14,y:Math.PI*2+.24,duration:Math.max(1,journeyEnd-assembly),ease:'power1.in'},assembly);
      timeline.to(environment.rotation,{z:-.7,y:.5,duration:Math.max(1,journeyEnd-assembly)},assembly);
      for(const [name,joint] of Object.entries(astronaut.joints)){
        const sign=name.endsWith('_L')?-1:1;
        if(name.startsWith('shoulder'))timeline.to(joint.rotation,{z:sign*.28,x:sign*.12,duration:height*.8},assembly);
        if(name.startsWith('elbow'))timeline.to(joint.rotation,{x:-.28*sign,duration:height*.8},assembly);
        if(name.startsWith('hip'))timeline.to(joint.rotation,{z:sign*.14,x:sign*.18,duration:height*.8},assembly);
        if(name.startsWith('knee'))timeline.to(joint.rotation,{x:.23,duration:height*.8},assembly);
      }
      const landBounds=landing.getBoundingClientRect();
      // Where the landing plane will be at the master timeline's final scroll.
      const homeTop=home.getBoundingClientRect().top+window.scrollY;
      const landTop=landBounds.top+window.scrollY-homeTop;
      const landScale=Math.min(width<761?34:54,landing.clientHeight/7.5);
      const landX=landBounds.left+landBounds.width/2-width/2;
      const floorY=height/2-(landTop-total+landing.clientHeight-85);
      const landY=floorY-SUIT_DIMENSIONS.soleY*landScale;
      timeline.to(astronaut.root.position,{x:landX,y:landY,duration:height*.5,ease:'power2.out'},journeyEnd);
      timeline.to(astronaut.root.scale,{x:landScale,y:landScale,z:landScale,duration:height*.5,ease:'power2.out'},journeyEnd);
      timeline.to(astronaut.root.rotation,{x:0,y:Math.PI*2,z:-Math.PI*2,duration:height*.5,ease:'power2.out'},journeyEnd);
      timeline.to(state,{environmentOpacity:0,duration:height*.3},journeyEnd);
      Object.entries(astronaut.joints).forEach(([name,joint])=>{
        const sign=name.endsWith('_L')?-1:1;
        timeline.to(joint.rotation,{x:name.startsWith('knee')?.4:name.startsWith('hip')?-.22:0,z:name.startsWith('shoulder')?sign*.13:0,duration:height*.15},journeyEnd+height*.4);
        timeline.to(joint.rotation,{x:0,duration:height*.18},journeyEnd+height*.55);
      });
      timeline.to(astronaut.root.position,{y:landY-9,duration:height*.09,ease:'power1.out'},journeyEnd+height*.49);
      timeline.to(astronaut.root.position,{y:landY,duration:height*.15,ease:'power1.out'},journeyEnd+height*.58);
      shadow.position.set(landX,floorY-2,-20);shadow.scale.set(landScale*3.6,landScale*.6,1);
      timeline.to(shadow.material,{opacity:1,duration:height*.25},journeyEnd+height*.27);
      home.querySelectorAll('.story-panel .reveal-line').forEach((heading,index)=>{
        const revealAt=Math.max(assembly,heading.getBoundingClientRect().top+window.scrollY-homeTop-height*.85);
        if(revealAt+height*.25<total)timeline.fromTo(heading,{y:22},{y:0,duration:height*.25},revealAt+(index%2)*height*.055);
      });
      seek.current=stage=>{
        const stops={start:0,chest:height*.8,helmet:height*1.92,suit:height*2.15,about:assembly+height*.65,work:home.querySelector('#work').offsetTop,landing:total};
        const target=stage==='start'?0:homeTop+stops[stage];
        if(lenis)lenis.scrollTo(target,{immediate:true});else window.scrollTo(0,target);
        ScrollTrigger.update();
      };
      ScrollTrigger.refresh();setReady(true);sync();
    }
    // Layout is upgraded atomically before measuring to avoid an intermediate jump.
    if(!reduced)home.classList.add('journey-enabled');
    init();
    if(!reduced){
      lenis=new Lenis({duration:.85,smoothWheel:true,syncTouch:false,anchors:true,prevent:node=>node.closest?.('.modal-overlay,.mermaid-diagram,[data-lenis-prevent]')});
      lenis.on('scroll',ScrollTrigger.update);
    }
    const ticker=time=>lenis?.raf(time*1000);if(lenis)gsap.ticker.add(ticker);
    const resize=()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(init,180);};window.addEventListener('resize',resize);
    resizeObserver=new ResizeObserver(([entry])=>{const next=entry.contentRect.height;if(contentHeight&&Math.abs(next-contentHeight)>2)resize();contentHeight=next;});resizeObserver.observe(home.querySelector('.journey-content'));
    const contextLost=event=>{event.preventDefault();setFailed(true);timeline?.scrollTrigger?.kill();timeline?.kill();home.classList.remove('journey-enabled');gsap.set(photo,{clearProps:'opacity'});};renderer.domElement.addEventListener('webglcontextlost',contextLost);
    return()=>{
      window.removeEventListener('keydown',onDebug);
      stopped=true;clearTimeout(resizeTimer);cancelAnimationFrame(frame);visibility.disconnect();resizeObserver?.disconnect();document.removeEventListener('visibilitychange',sync);window.removeEventListener('resize',resize);
      timeline?.scrollTrigger?.kill();timeline?.kill();lenis?.destroy();gsap.ticker.remove(ticker);
      gsap.set([photo,...home.querySelectorAll('.hero-copy,.hero-note,.hero-topline,.hero-bottom,.hero-name,.reveal-line')],{clearProps:'opacity,transform'});
      home.classList.remove('journey-enabled');landing.querySelector('.astronaut-still')?.remove();
      astronaut.dispose();environmentTarget.dispose();shadow.geometry.dispose();shadow.material.dispose();shadowTexture.dispose();environment.children.forEach(n=>n.geometry.dispose());gridMaterial.dispose();renderer.dispose();renderer.domElement.remove();
    };
  },[reduced]);
  return <><div className="scene-mount"><div ref={container} className="journey-scene" aria-hidden="true">{!ready&&!failed&&<span className="scene-loader mono">ASSEMBLING THE POSSIBILITIES…</span>}{failed&&<span className="scene-loader mono">3D unavailable · explore the portfolio below</span>}</div></div>{import.meta.env.DEV&&debug&&!reduced&&<nav className="journey-debug" aria-label="Journey calibration checkpoints">{['start','chest','helmet','suit','about','work','landing'].map(stage=><button type="button" key={stage} onClick={()=>seek.current(stage)}>{stage}</button>)}</nav>}</>;
}
