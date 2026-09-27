import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PLANETS, SHIRT_MODEL } from './shopConfig.js';

// These swatches are finish studies; the final button artwork can replace them.
function finishTexture(id) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const colors = {
    mars: ['#9b452b', '#ad5734', '#c77b50', '#803d2b'],
    earth: ['#2b6786', '#367a9e', '#5f8263', '#9da98a'],
    saturn: ['#b6a278', '#d1c09a', '#9b825d', '#e0cf9e'],
    neptune: ['#314f98', '#3e63b5', '#547bd0', '#6a8ace'],
  }[id];
  ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y += 3) {
    ctx.fillStyle = colors[Math.floor((Math.sin(y * .13) + 1) * 1.9)];
    ctx.globalAlpha = .55; ctx.fillRect(0, y, 256, 3);
  }
  if (id === 'earth') {
    ctx.globalAlpha = 1; ctx.fillStyle = '#75825a';
    ctx.beginPath(); ctx.moveTo(55, 44); ctx.lineTo(122, 60); ctx.lineTo(106, 99); ctx.lineTo(143, 138); ctx.lineTo(109, 204); ctx.lineTo(81, 137); ctx.lineTo(34, 90); ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.flipY = false;
  return texture;
}

export default function ShirtViewer({ wings, planet }) {
  const host = useRef(null);
  const api = useRef(null);
  const selection = useRef({ wings, planet });
  selection.current = { wings, planet };
  const [state, setState] = useState('loading');
  const [rotating, setRotating] = useState(false);
  useEffect(() => {
    let renderer, controls, model, environment, pmrem, observer, frame = 0, disposed = false, visible = true, last = 0;
    const textures = new Map();
    const materials = new Set();
    const container = host.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .01, 100);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let resetPosition;
    function disposeModel(object) {
      object.traverse(child => { if (child.isMesh) {
        child.geometry.dispose();
        for (const material of [].concat(child.material)) materials.add(material);
      } });
    }
    function render() { if (!disposed && renderer && visible && !document.hidden) renderer.render(scene, camera); }
    function animate(time) {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      controls.autoRotate = api.current?.rotating && !reducedMotion.matches && !container.closest('.shop-motion-paused');
      const changed = controls.update(last ? Math.min((time - last) / 1000, .05) : 0); last = time;
      if (changed) render(); frame = requestAnimationFrame(animate);
    }
    function resume() { if (!frame && renderer && controls && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(animate); } }
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else resume(); }
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
      renderer.domElement.setAttribute('aria-label', 'Interactive Oxford shirt study. Drag to rotate; use the view buttons for front, back, and collar.');
      renderer.domElement.setAttribute('role', 'img');
      container.appendChild(renderer.domElement);
      pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment(); environment = pmrem.fromScene(room, .04); room.dispose(); scene.environment = environment.texture;
      scene.add(new THREE.HemisphereLight(0xffffff, 0x706b56, 1.5));
      const key = new THREE.DirectionalLight(0xfff2db, 2.8); key.position.set(4, 6, 8); scene.add(key);
      const fill = new THREE.DirectionalLight(0xc3e2db, 1.4); fill.position.set(-4, 3, -2); scene.add(fill);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false; controls.enableZoom = false; controls.enableDamping = true;
      controls.autoRotateSpeed = .75; controls.minPolarAngle = .4; controls.maxPolarAngle = Math.PI - .4;
      renderer.domElement.style.touchAction = 'pan-y';
      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix();
        if (resetPosition) api.current?.view('front'); render();
      };
      observer = new ResizeObserver(resize); observer.observe(container);
      new GLTFLoader().load(SHIRT_MODEL, gltf => {
        if (disposed) { disposeModel(gltf.scene); materials.forEach(m => { Object.values(m).forEach(v => v?.isTexture && v.dispose()); m.dispose(); }); return; }
        model = gltf.scene;
        // The supplied model uses Z-up. Orient it before fitting the camera.
        model.rotation.x = -Math.PI / 2;
        model.updateMatrixWorld(true);
        let bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        model.scale.setScalar(4 / Math.max(size.x, size.y)); model.updateMatrixWorld(true);
        bounds = new THREE.Box3().setFromObject(model);
        model.position.sub(bounds.getCenter(new THREE.Vector3()));
        model.traverse(node => {
          if (!node.isMesh) return;
          const mat = node.material;
          if (mat.name === 'cotton_oxford') { mat.color.set(0x2b7042); mat.normalScale.set(.3, .3); }
        });
        scene.add(model);
        const button = model.getObjectByName('planet_button_face');
        const original = button?.material;
        const faceMaterial = original?.clone();
        if (button && faceMaterial) { button.material = faceMaterial; materials.add(original); }
        api.current = {
          rotating: false,
          update({ wings: showWings, planet: id }) {
            for (const name of ['embroidery_left', 'embroidery_right']) { const object = model.getObjectByName(name); if (object) object.visible = showWings; }
            if (faceMaterial) {
              if (id === 'jupiter') { faceMaterial.map = original.map; faceMaterial.color.copy(original.color); }
              else { if (!textures.has(id)) textures.set(id, finishTexture(id)); faceMaterial.map = textures.get(id); faceMaterial.color.set(0xffffff); }
              faceMaterial.needsUpdate = true;
            }
            render();
          },
          view(view) {
            const distance = Math.max(6.8, 2.35 / (Math.tan(THREE.MathUtils.degToRad(17)) * Math.min(camera.aspect, 1)));
            const targetY = view === 'collar' ? 1.25 : 0;
            camera.position.set(0, view === 'collar' ? 1.3 : .15, view === 'back' ? -distance : view === 'collar' ? distance * .43 : distance);
            controls.target.set(0, targetY, 0); controls.update(); render();
          },
        };
        resetPosition = true; resize(); api.current.update(selection.current); setState('ready'); resume();
      }, undefined, () => { if (!disposed) setState('error'); });
    } catch { setState('error'); }
    const intersection = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) resume(); else { cancelAnimationFrame(frame); frame = 0; }
    }); intersection.observe(container);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      disposed = true; cancelAnimationFrame(frame); intersection.disconnect(); observer?.disconnect();
      document.removeEventListener('visibilitychange', visibility); controls?.dispose();
      if (model) disposeModel(model);
      materials.forEach(m => { Object.values(m).forEach(v => { if (v?.isTexture) v.dispose(); }); m.dispose(); });
      textures.forEach(t => t.dispose()); environment?.dispose(); pmrem?.dispose(); renderer?.dispose(); renderer?.domElement.remove(); api.current = null;
    };
  }, []);
  useEffect(() => { api.current?.update({ wings, planet }); }, [wings, planet]);
  return <div className="shop-viewer">
    <div className="shop-viewer-canvas" ref={host}/>
    {state !== 'ready' && <div className="shop-model-message" role="status">{state === 'error' ? '3D is unavailable on this device. Explore the photographs instead.' : 'Opening the 3D study…'}</div>}
    {state === 'ready' && <><span className="shop-viewer-hint">DRAG TO EXPLORE / {PLANETS.find(p => p.id === planet)?.name.toUpperCase()}</span><div className="shop-viewer-tools" aria-label="3D view controls">{['front', 'back', 'collar'].map(view => <button key={view} onClick={() => { api.current.rotating = false; setRotating(false); api.current.view(view); }}>{view}</button>)}<button aria-pressed={rotating} onClick={() => { api.current.rotating = !rotating; setRotating(!rotating); }}>{rotating ? 'Pause' : 'Rotate'}</button></div></>}
  </div>;
}
