import { Component, lazy, Suspense, useEffect, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion.js';
const Scene = lazy(() => import('./JourneyScene.jsx'));
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function Journey() {
  const reduced = useReducedMotion();
  const [load,setLoad] = useState(false);
  useEffect(() => {
    const id = window.requestIdleCallback ? requestIdleCallback(() => setLoad(true),{timeout:1500}) : setTimeout(() => setLoad(true),300);
    return () => { if(window.cancelIdleCallback)cancelIdleCallback(id);else clearTimeout(id); };
  },[]);
  return load ? <SceneBoundary><Suspense fallback={<span className="scene-loader mono">INITIALISING / THE JOURNEY</span>}><Scene reduced={reduced}/></Suspense></SceneBoundary> : null;
}
