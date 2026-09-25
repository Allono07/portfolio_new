import { Component, lazy, Suspense, useEffect, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';

const loadScene = () => import('./JourneyScene.jsx');
const Scene = lazy(loadScene);
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() {
    document.querySelector('.cinematic-home')?.classList.remove('journey-enabled');
  }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Journey() {
  const reduced = useReducedMotion();
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const home = document.querySelector('.cinematic-home');
    if (!home) return;
    // Reserve the scroll track before the GPU work, so interaction cannot move content.
    if (!reduced) home.classList.add('journey-enabled');
    const events = ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown'];
    const activate = () => {
      setLoad(true);
      events.forEach(event => window.removeEventListener(event, activate));
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => { if (window.scrollY > 4) activate(); };
    let observer;
    if (reduced) {
      // The still is generated only when its Contact panel approaches the viewport.
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { activate(); observer.disconnect(); }
      }, { rootMargin: '600px' });
      observer.observe(home.querySelector('.landing-zone'));
    } else {
      events.forEach(event => window.addEventListener(event, activate, { passive: true }));
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    // Fetch/parse the code while idle, but avoid constructing meshes and compiling
    // GPU shaders until there is intent to explore the interactive part of the page.
    const prefetch = () => { loadScene().catch(() => {}); };
    const id = window.requestIdleCallback
      ? requestIdleCallback(prefetch, { timeout: 2000 })
      : setTimeout(prefetch, 500);
    return () => {
      events.forEach(event => window.removeEventListener(event, activate));
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
      if (window.cancelIdleCallback) cancelIdleCallback(id); else clearTimeout(id);
      home.classList.remove('journey-enabled');
    };
  }, [reduced]);
  return load ? <SceneBoundary><Suspense fallback={<span className="scene-loader mono">INITIALISING / THE JOURNEY</span>}><Scene reduced={reduced}/></Suspense></SceneBoundary> : null;
}
