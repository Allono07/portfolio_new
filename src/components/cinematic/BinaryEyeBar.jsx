import { useEffect, useRef } from 'react';
import { EYE_BAR } from './calibration.js';
import { getBinarySurface } from './binaryRain.js';
import useReducedMotion from '../../hooks/useReducedMotion.js';
export default function BinaryEyeBar() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const source = getBinarySurface();
    let frame = 0, visible = true;
    function paint(time) {
      source.draw(reduced ? 0 : time);
      ctx.drawImage(source.canvas, 0, 0, canvas.width, canvas.height);
    }
    function tick(time) { paint(time); if (visible && !document.hidden && !reduced) frame = requestAnimationFrame(tick); }
    function sync() { cancelAnimationFrame(frame); if (visible && !document.hidden) { if (reduced) paint(0); else frame = requestAnimationFrame(tick); } }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(canvas); document.addEventListener('visibilitychange', sync); paint(0);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [reduced]);
  return <canvas ref={ref} width="768" height="160" aria-hidden="true" className="binary-eye-bar" style={{left:`${EYE_BAR.x}%`,top:`${EYE_BAR.y}%`,width:`${EYE_BAR.w}%`,height:`${EYE_BAR.h}%`}}/>;
}
