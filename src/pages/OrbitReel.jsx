import { useEffect } from 'react';
import './OrbitReel.css';

const planets = [
  { name: 'mars', ring: 1, angle: 25, size: 26, duration: 18 },
  { name: 'jupiter', ring: 2, angle: 195, size: 48, duration: 24 },
  { name: 'saturn', ring: 3, angle: 320, size: 62, duration: 30 },
  { name: 'uranus', ring: 4, angle: 80, size: 31, duration: 36 },
  { name: 'moon', ring: 4, angle: 240, size: 22, duration: 36 },
];

export default function OrbitReel() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Beyond Silicon & Binary — Orbit Study';
    return () => { document.title = previous; };
  }, []);

  return <main className="orbit-reel">
    <div className="reel-frame">
      <header className="reel-masthead"><span>AN EXPLORATION IN MOTION</span><span>VOL. 01 / 2026</span></header>
      <h1 className="reel-title"><span>BEYOND</span><span>SILICON</span><span><i>&</i> BINARY<span className="reel-title-dot">.</span></span></h1>
      <section className="reel-statement" aria-labelledby="reel-love-title">
        <div className="reel-statement-kicker"><span/>A CREATIVE COLLISION<span/></div>
        <h2 id="reel-love-title">Astra 6 Found its Love<br/>in the <em>V8 Engine</em></h2>
        <p>Intelligence. Execution. Motion.</p>
      </section>
      <section className="reel-universe" aria-label="Five planets orbiting a black hole">
        <div className="reel-coordinate reel-coordinate-top" aria-hidden="true">+<span>01 / THE ORBIT</span>+</div>
        <div className="reel-system" aria-hidden="true">
          {[1, 2, 3, 4].map(ring => <div className={`reel-ring reel-ring-${ring}`} key={ring}/>)}
          <div className="reel-axis reel-axis-x"/><div className="reel-axis reel-axis-y"/>
          <div className="reel-core"><img src="/assets/planets/blackhole.png" alt="" width="148" height="148"/></div>
          {planets.map(planet => <div key={planet.name} className={`reel-trajectory reel-trajectory-${planet.ring}`} style={{ '--phase': `${planet.angle}deg`, '--period': `${planet.duration}s`, '--planet-size': `${planet.size}px` }}>
            <div className="reel-planet"><img src={`/assets/planets/${planet.name}.webp`} alt="" /></div>
          </div>)}
          <span className="reel-orbit-label">CONTINUOUS EXPLORATION</span>
        </div>
        <div className="reel-coordinate reel-coordinate-bottom" aria-hidden="true">+<span>THOUGHT → CODE → MOTION</span>+</div>
      </section>
      <footer className="reel-footer">
        <div className="reel-process"><span><small>01 / INTELLIGENCE</small>Imagine.</span><span><small>02 / ENGINE</small>Create.</span><span><small>03 / ANIMATION</small>Move.</span></div>
        <div className="reel-baseline"><span>BEYOND WHAT’S NEXT.</span><div className="reel-signal" aria-hidden="true">{Array.from({length:18}, (_, i) => <i key={i} style={{'--delay': `${i * -.13}s`}}/>)}</div><span>KEEP EXPLORING</span></div>
      </footer>
    </div>
  </main>;
}
