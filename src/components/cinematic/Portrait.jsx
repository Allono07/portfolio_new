import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import BinaryEyeBar from './BinaryEyeBar.jsx';
import { EYE_BAR, HEAD, PORTRAIT } from './calibration.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
export default function Portrait() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [debug, setDebug] = useState(false);
  useLayoutEffect(() => {
    const stage = ref.current.parentElement;
    const hero = stage.closest('.hero');
    const alignOrbit = () => {
      // Use portrait coordinates so tall and folded screens cannot expose the glow.
      const eyeY = stage.offsetTop + stage.offsetHeight * (EYE_BAR.y + EYE_BAR.h / 2) / 100;
      hero.style.setProperty('--portrait-eye-y', `${eyeY}px`);
      hero.style.setProperty('--blackhole-size', `${stage.offsetWidth * .30}px`);
    };
    alignOrbit();
    const observer = new ResizeObserver(alignOrbit);
    observer.observe(stage);
    observer.observe(hero);
    return () => {
      observer.disconnect();
      hero.style.removeProperty('--portrait-eye-y');
      hero.style.removeProperty('--blackhole-size');
    };
  }, []);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const onKey = event => { if (event.key.toLowerCase() === 'd' && !/INPUT|TEXTAREA/.test(event.target.tagName)) setDebug(value => !value); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    if (reduced || !matchMedia('(pointer: fine) and (min-width: 761px)').matches) return;
    const visual = ref.current;
    const hero = visual.closest('.hero');
    const move = e => { if(window.scrollY > 100) { visual.style.transform = ''; return; } const bounds = hero.getBoundingClientRect(); visual.style.transform = `translate(${(e.clientX / bounds.width - .5) * 5}px,${(e.clientY / bounds.height - .5) * 3}px)`; };
    const reset = () => { visual.style.transform = ''; };
    hero.addEventListener('pointermove', move); hero.addEventListener('pointerleave', reset);
    return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset); reset(); };
  }, [reduced]);
  return <div className="portrait-stage" style={{ aspectRatio: `${PORTRAIT.width} / ${PORTRAIT.height}` }}><div ref={ref} className="portrait-visual"><img className="hero-portrait" src={PORTRAIT.src} alt="Allen Thomson, monochrome portrait with a binary eye bar" width={PORTRAIT.width} height={PORTRAIT.height} fetchpriority="high"/><BinaryEyeBar/></div>{debug && <div className="calibration-debug" aria-hidden="true">{Object.entries({ HEAD, EYE_BAR }).map(([name,box])=><div key={name} style={{left:`${box.x}%`,top:`${box.y}%`,width:`${box.w}%`,height:`${box.h}%`}}>{name}</div>)}<span style={{top:`${HEAD.shoulderY}%`}}>SHOULDER / PRESS D TO HIDE</span></div>}</div>;
}
