import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createBinaryTexture } from './binaryRain.js';
// Named nodes are the only interface used by the timeline. A future GLB adapter
// can return this manifest without changing choreography.
export const PART_NAMES = ['helmet','visor','chest','backpack','upperArm_L','upperArm_R','forearm_L','forearm_R','glove_L','glove_R','hips','thigh_L','thigh_R','shin_L','shin_R','boot_L','boot_R'];
export function createAstronaut() {
  const root = new THREE.Group(); root.name = 'astronaut';
  const parts = {}, joints = {}, latches = [];
  const texture = createBinaryTexture(THREE);
  const white = new THREE.MeshStandardMaterial({color:0xe5e5e2,roughness:.48,metalness:.08});
  const seam = new THREE.MeshStandardMaterial({color:0x525252,roughness:.7});
  const black = new THREE.MeshStandardMaterial({color:0x111111,roughness:.24,metalness:.4});
  const silver = new THREE.MeshStandardMaterial({color:0xababaa,roughness:.4,metalness:.35});
  function group(name,parent,x,y,z=0) {const g=new THREE.Group();g.name=name;g.position.set(x,y,z);parent.add(g);return g;}
  function mesh(geometry,material,parent,x=0,y=0,z=0) {const m=new THREE.Mesh(geometry,material.clone());m.position.set(x,y,z);parent.add(m);return m;}
  function box(parent,size,pos=[0,0,0],material=white,radius=.1) {return mesh(new RoundedBoxGeometry(...size,2,radius),material,parent,...pos);}
  function sphere(parent,size,pos=[0,0,0],material=white) {const m=mesh(new THREE.SphereGeometry(1,24,16),material,parent,...pos);m.scale.set(...size);return m;}
  function ring(parent,radius,pos,material=seam,rotate=true){const m=mesh(new THREE.TorusGeometry(radius,.048,8,36),material,parent,...pos);if(rotate)m.rotation.x=Math.PI/2;return m;}
  function part(name,parent,x,y,z=0){const g=group(name,parent,x,y,z);parts[name]=g;return g;}
  const chest=part('chest',root,0,.05);
  box(chest,[1.72,1.65,.88]);
  box(chest,[1.1,.8,.12],[0,.05,.51],silver,.06);
  box(chest,[.92,.5,.07],[0,.05,.6],white,.035);
  for(let i=0;i<3;i++)box(chest,[.48,.035,.025],[-.08,.2-i*.13,.65],seam,.01);
  sphere(chest,[.065,.065,.03],[.57,-.4,.51],black);
  sphere(chest,[.065,.065,.03],[-.57,-.4,.51],black);
  const neck=ring(chest,.57,[0,.94,0],silver);latches.push(neck);
  const backpack=part('backpack',root,0,.15,-.75);box(backpack,[1.5,1.8,.75]);
  box(backpack,[.42,1.6,.4],[-.62,0,-.32],silver);box(backpack,[.42,1.6,.4],[.62,0,-.32],silver);
  const helmet=part('helmet',root,0,1.85);
  sphere(helmet,[1.08,1.18,.87]);
  ring(helmet,1.01,[0,0,.2],silver,false).scale.y=1.08;
  box(helmet,[.22,.58,.5],[-1.02,-.05,0],silver);box(helmet,[.22,.58,.5],[1.02,-.05,0],silver);
  const visor=part('visor',helmet,0,.08,.79);
  box(visor,[1.65,.69,.25],[0,0,0],black,.2);
  const visorScreen=mesh(new THREE.PlaneGeometry(1.52,.5),new THREE.MeshBasicMaterial({map:texture,color:0xdddddd}),visor,0,0,.138);
  box(visor,[1.16,.018,.01],[0,.245,.15],silver,.005);
  const hips=part('hips',root,0,-1.1);box(hips,[1.42,.72,.85]);box(hips,[1.45,.14,.94],[0,.25,0],seam,.035);
  for(const [suffix,sign] of [['L',-1],['R',1]]) {
    const shoulder=group(`shoulder_${suffix}`,root,sign*1.01,.57);joints[`shoulder_${suffix}`]=shoulder;
    const upper=part(`upperArm_${suffix}`,shoulder,sign*.19,-.4);
    sphere(upper,[.4,.43,.44],[0,.34,0]);box(upper,[.53,.87,.58],[0,-.12,0]);
    const elbow=group(`elbow_${suffix}`,upper,0,-.63);joints[`elbow_${suffix}`]=elbow;
    const fore=part(`forearm_${suffix}`,elbow,0,-.43);box(fore,[.54,.86,.58]);ring(fore,.275,[0,.35,0]);
    const wrist=ring(fore,.28,[0,-.42,0],silver);latches.push(wrist);
    const glove=part(`glove_${suffix}`,fore,0,-.72,.04);sphere(glove,[.29,.36,.32]);sphere(glove,[.14,.2,.18],[-sign*.24,.02,.15]);
    const hip=group(`hip_${suffix}`,root,sign*.43,-1.38);joints[`hip_${suffix}`]=hip;
    const thigh=part(`thigh_${suffix}`,hip,0,-.53);box(thigh,[.68,1.04,.69]);
    box(thigh,[.35,.37,.11],[sign*.19,-.06,.38],silver,.035);
    const knee=group(`knee_${suffix}`,thigh,0,-.58);joints[`knee_${suffix}`]=knee;
    const shin=part(`shin_${suffix}`,knee,0,-.54);box(shin,[.62,1.07,.65]);box(shin,[.55,.29,.2],[0,.4,.35],silver);
    ring(shin,.32,[0,-.45,0]);
    const boot=part(`boot_${suffix}`,shin,0,-.77,.14);box(boot,[.7,.45,1.01]);box(boot,[.74,.12,1.04],[0,-.22,0],seam,.035);
  }
  for(const [name,node] of Object.entries(parts)) {
    node.userData.rest = node.position.clone();
    node.userData.materials=[];
    // Directly owned meshes only; nested parts animate independently.
    function collect(n){for(const child of n.children){if(child.isMesh)node.userData.materials.push(child.material);else if(!Object.values(parts).includes(child))collect(child);}}
    collect(node);
    node.userData.materials.forEach(m=>{m.transparent=true;m.opacity=1;});
  }
  function dispose(){const geo=new Set(),mat=new Set();root.traverse(n=>{if(n.isMesh){geo.add(n.geometry);mat.add(n.material);}});geo.forEach(g=>g.dispose());mat.forEach(m=>m.dispose());[white,seam,black,silver].forEach(m=>m.dispose());texture.dispose();}
  return {root,parts,joints,latches,texture,visorScreen,dispose};
}
