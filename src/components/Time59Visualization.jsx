import { useEffect, useMemo, useRef, useState } from 'react';
import {
  angularVelocity,
  formatSeconds,
  hourlyDrift,
  newMinuteDuration,
  requiredRelativisticVelocity,
  secondsPerDay,
  secondsPerHour,
  timeDilationFactor,
} from './Time59Project.js';

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function EquationBlock({ label, children }) {
  return (
    <div className="time59-eq">
      <p className="time59-eq-label">{label}</p>
      <div className="time59-eq-body">{children}</div>
    </div>
  );
}

function ClockSvg({ title, tickCount, minuteSeconds, hourSeconds, minuteAngle, hourAngle, accent, digitalTime }) {
  const radius = 78;
  const center = 96;
  const tickMarks = Array.from({ length: tickCount }, (_, index) => {
    const angle = (index / tickCount) * Math.PI * 2 - Math.PI / 2;
    const x1 = center + Math.cos(angle) * (radius - 18);
    const y1 = center + Math.sin(angle) * (radius - 18);
    const x2 = center + Math.cos(angle) * radius;
    const y2 = center + Math.sin(angle) * radius;
    return { x1, y1, x2, y2, isLong: index % 5 === 0 };
  });

  return (
    <div className="time59-clock-card">
      <div className="time59-card-heading">
        <h3>{title}</h3>
        <p>{minuteSeconds} s per revolution</p>
      </div>
      <svg viewBox="0 0 192 192" className="time59-clock-svg" role="img" aria-label={`${title} clock`}> 
        <circle cx={center} cy={center} r={radius} className="time59-ring" />
        {tickMarks.map((tick, index) => (
          <line
            key={`${title}-${index}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            className={tick.isLong ? 'time59-tick time59-tick--major' : 'time59-tick'}
          />
        ))}
        <g transform={`rotate(${minuteAngle} ${center} ${center})`}>
          <line
            x1={center}
            y1={center + 8}
            x2={center}
            y2={center - 58}
            className="time59-hand time59-hand--minute"
            style={{ stroke: '#111111', strokeLinecap: 'round' }}
          />
        </g>
        <g transform={`rotate(${hourAngle} ${center} ${center})`}>
          <line
            x1={center}
            y1={center + 8}
            x2={center}
            y2={center - 38}
            className="time59-hand time59-hand--hour"
            style={{ stroke: '#111111', strokeLinecap: 'round' }}
          />
        </g>
        <circle cx={center} cy={center} r="7" className="time59-pivot" />
      </svg>
      <div className="time59-clock-meta">
        <span>{digitalTime}</span>
        <span>{hourSeconds} s per full day</span>
      </div>
    </div>
  );
}

function PeriodFrequencyVisualizer({ periodSeconds }) {
  const [phase, setPhase] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let frameId = 0;

    const frame = (timestamp) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }

      const elapsed = (timestamp - startRef.current) / 1000;
      setElapsedTime(elapsed);
      setPhase((elapsed / periodSeconds) * Math.PI * 2);
      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
      startRef.current = null;
    };
  }, [periodSeconds]);

  const frequency = 1 / periodSeconds;
  const cycles = elapsedTime / periodSeconds;
  const x = 60 + Math.cos(phase) * 34;
  const y = 60 + Math.sin(phase) * 34;

  return (
    <div className="time59-compact-card">
      <div className="time59-compact-visual">
        <svg viewBox="0 0 120 120" className="time59-oscillator" role="img" aria-label="Oscillator visualization">
          <circle cx="60" cy="60" r="44" className="time59-ring" />
          <line x1="60" y1="60" x2={x} y2={y} className="time59-hand time59-hand--minute" />
          <circle cx={x} cy={y} r="6" className="time59-pivot" />
        </svg>
        <div className="time59-counter-stack">
          <div className="time59-counter-row"><span>Time</span><strong>{elapsedTime.toFixed(1)} s</strong></div>
          <div className="time59-counter-row"><span>Cycles</span><strong>{cycles.toFixed(2)}</strong></div>
          <div className="time59-counter-row"><span>T</span><strong>{periodSeconds.toFixed(2)} s</strong></div>
          <div className="time59-counter-row"><span>f</span><strong>{frequency.toFixed(2)} Hz</strong></div>
        </div>
      </div>
      <div className="time59-compact-equations">
        <div className="time59-eq">
          <p className="time59-eq-label">Equation</p>
          <div className="time59-eq-body">f = 1/T = 1/{periodSeconds.toFixed(2)} = {frequency.toFixed(2)} Hz</div>
        </div>
      </div>
    </div>
  );
}

function RelativityPair({ velocityRatio, stationaryElapsed, movingElapsed }) {
  const movingProgress = Math.min(1, velocityRatio);
  const stationaryProgress = 1;

  return (
    <div className="time59-relativity-card">
      <div className="time59-relativity-bars">
        <div className="time59-relativity-bar">
          <span>Stationary</span>
          <div className="time59-bar-track"><div className="time59-bar-fill" style={{ width: `${stationaryProgress * 100}%` }} /></div>
          <strong>{stationaryElapsed.toFixed(3)} s</strong>
        </div>
        <div className="time59-relativity-bar">
          <span>Moving</span>
          <div className="time59-bar-track"><div className="time59-bar-fill time59-bar-fill--accent" style={{ width: `${movingProgress * 100}%` }} /></div>
          <strong>{movingElapsed.toFixed(3)} s</strong>
        </div>
      </div>
      <p className="time59-footnote">Relativity thought experiment: this does not mean the proposed 59-minute clock requires relativity; it just shows what physically different elapsed time would look like.</p>
    </div>
  );
}

export default function Time59Visualization() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(10);
  const [timeRange, setTimeRange] = useState(24);
  const [minutesPerHour, setMinutesPerHour] = useState(59);
  const [secondsPerMinute, setSecondsPerMinute] = useState(60);
  const [hoursPerDay, setHoursPerDay] = useState(24);
  const [relativityVelocity, setRelativityVelocity] = useState(0.18);
  const [periodSeconds, setPeriodSeconds] = useState(2);
  const [simulationSeconds, setSimulationSeconds] = useState(0);
  const [resetNonce, setResetNonce] = useState(0);
  const accumulatorRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    let frameId = 0;

    const frame = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsedMs = timestamp - startTimeRef.current;
      startTimeRef.current = timestamp;
      accumulatorRef.current += (elapsedMs / 1000) * speedMultiplier;
      setSimulationSeconds(accumulatorRef.current);
      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
      startTimeRef.current = null;
    };
  }, [isPlaying, speedMultiplier, resetNonce]);

  const standardSecondPeriod = 3600;
  const hypotheticalSecondPeriod = secondsPerHour(minutesPerHour, secondsPerMinute);
  const standardMinuteAngularVelocity = angularVelocity(standardSecondPeriod);
  const hypotheticalMinuteAngularVelocity = angularVelocity(hypotheticalSecondPeriod);
  const velocityRatio = hypotheticalMinuteAngularVelocity / standardMinuteAngularVelocity;
  const velocityPercentIncrease = (velocityRatio - 1) * 100;
  const standardMinuteAngle = (simulationSeconds / standardSecondPeriod) * 360;
  const hypotheticalMinuteAngle = (simulationSeconds / hypotheticalSecondPeriod) * 360;
  const standardHourAngle = (simulationSeconds / 86400) * 360;
  const hypotheticalHourAngle = (simulationSeconds / secondsPerDay(hoursPerDay, minutesPerHour, secondsPerMinute)) * 360;

  const standardDisplay = formatDuration(simulationSeconds);
  const hypotheticalDisplay = formatDuration(simulationSeconds * (3600 / hypotheticalSecondPeriod));
  const newMinute = newMinuteDuration(3600, minutesPerHour);
  const relativityFactor = timeDilationFactor(relativityVelocity);
  const stationaryElapsed = 1;
  const movingElapsed = relativityFactor;
  const specialCaseFactor = timeDilationFactor(59 / 60);
  const relativityVelocityKmS = requiredRelativisticVelocity(59 / 60) / 1000;
  const generalizedSecondsPerHour = secondsPerHour(minutesPerHour, secondsPerMinute);
  const generalizedSecondsPerDay = secondsPerDay(hoursPerDay, minutesPerHour, secondsPerMinute);

  const handleReset = () => {
    setSimulationSeconds(0);
    accumulatorRef.current = 0;
    setResetNonce((value) => value + 1);
    setIsPlaying(true);
  };

  return (
    <section className="time59-section">
      <div className="time59-intro">
        <h2 className="time59-title">59-minute hour: a clock experiment</h2>
        <div className="time59-lead-card">
          <p className="time59-lead">
            The goal isn't to change the laws of physics, but to explore how far we can push timekeeping by changing the rules inside the clock.
          </p>
          <div className="time59-lead-grid">
            <div className="time59-lead-pill">
              <strong>Mathematics</strong>
              <span>How does a 59-minute hour affect accumulated drift and the passage of time?</span>
            </div>
            <div className="time59-lead-pill">
              <strong>Engineering</strong>
              <span>What would need to change in a quartz oscillator, digital counter, or mechanical gear train?</span>
            </div>
            <div className="time59-lead-pill">
              <strong>Physics</strong>
              <span>What changes when we redefine time versus actually altering how time passes?</span>
            </div>
          </div>
        </div>
      </div>

      <div className="time59-grid time59-grid--two">
        <div className="time59-card">
          <h3>Clock comparison</h3>
          <div className="time59-metrics">
            <div className="time59-metric">
              <span>Standard minute hand angular speed</span>
              <strong>{formatSeconds(standardMinuteAngularVelocity)} rad/s</strong>
            </div>
            <div className="time59-metric">
              <span>59-minute hand angular speed</span>
              <strong>{formatSeconds(hypotheticalMinuteAngularVelocity)} rad/s</strong>
            </div>
            <div className="time59-metric time59-metric--accent">
              <span>Relative speed</span>
              <strong>+{formatSeconds(velocityPercentIncrease)}%</strong>
            </div>
          </div>
          <div className="time59-metrics time59-metrics--inline">
            <div className="time59-stat">
              <span>1 hour =</span>
              <strong>{secondsPerHour(59, 60)} s</strong>
            </div>
            <div className="time59-stat">
              <span>Drift per real hour</span>
              <strong>{hourlyDrift(59, 60)} s</strong>
            </div>
          </div>
          <div className="time59-clock-row">
            <ClockSvg
              title="Normal 60 min"
              tickCount={60}
              minuteSeconds={3600}
              hourSeconds={86400}
              minuteAngle={standardMinuteAngle}
              hourAngle={standardHourAngle}
              accent="var(--ink)"
              digitalTime={standardDisplay}
            />
            <ClockSvg
              title="59 min hour"
              tickCount={59}
              minuteSeconds={hypotheticalSecondPeriod}
              hourSeconds={secondsPerDay(hoursPerDay, minutesPerHour, secondsPerMinute)}
              minuteAngle={hypotheticalMinuteAngle}
              hourAngle={hypotheticalHourAngle}
              accent="var(--accent)"
              digitalTime={hypotheticalDisplay}
            />
          </div>
        </div>

        <div className="time59-card">
          <div className="time59-controls">
            <button type="button" className="forum-submit-button" onClick={() => setIsPlaying((value) => !value)}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button type="button" className="forum-submit-button" onClick={handleReset}>Reset</button>
            <label className="time59-select">
              <span>Speed</span>
              <select value={speedMultiplier} onChange={(event) => setSpeedMultiplier(Number(event.target.value))}>
                <option value="1">1×</option>
                <option value="10">10×</option>
                <option value="60">60×</option>
                <option value="600">600×</option>
                <option value="3600">3600×</option>
              </select>
            </label>
          </div>

          <div className="time59-metrics time59-metrics--inline">
            <div className="time59-stat">
              <span>Real elapsed</span>
              <strong>{formatSeconds(simulationSeconds)} s</strong>
            </div>
            <div className="time59-stat">
              <span>Displayed drift</span>
              <strong>{formatSeconds(simulationSeconds / 3600)} min</strong>
            </div>
          </div>

          <EquationBlock label="Core relation">
            <span>ω₅₉ / ω₆₀ = 3600 / 3540 ≈ {formatSeconds(velocityRatio)} and the minute hand is {formatSeconds(velocityPercentIncrease)}% faster.</span>
          </EquationBlock>
        </div>
      </div>

      <div className="time59-card">
        <div className="time59-card-heading">
          <h3>Relativity thought experiment</h3>
          <p>Compact period/frequency and two-clock visualization</p>
        </div>
        <div className="time59-grid time59-grid--two time59-grid--compact">
          <div className="time59-card time59-card--inner">
            <div className="time59-card-heading">
              <h3>Period and frequency</h3>
              <p>Use actual elapsed time to drive the animation.</p>
            </div>
            <label className="time59-select time59-select--full">
              <span>T = {periodSeconds.toFixed(2)} s</span>
              <input type="range" min="0.5" max="5" step="0.1" value={periodSeconds} onChange={(event) => setPeriodSeconds(Number(event.target.value))} />
            </label>
            <PeriodFrequencyVisualizer periodSeconds={periodSeconds} />
            <EquationBlock label="Equation">
              <span>f = 1/T = 1/{periodSeconds.toFixed(2)} = {(1 / periodSeconds).toFixed(2)} Hz</span>
            </EquationBlock>
          </div>
          <div className="time59-card time59-card--inner">
            <div className="time59-card-heading">
              <h3>Two-clock comparison</h3>
              <p>Stationary observer vs moving clock.</p>
            </div>
            <label className="time59-select time59-select--full">
              <span>v/c = {relativityVelocity.toFixed(2)}</span>
              <input type="range" min="0" max="0.99" step="0.01" value={relativityVelocity} onChange={(event) => setRelativityVelocity(Number(event.target.value))} />
            </label>
            <RelativityPair velocityRatio={relativityVelocity} stationaryElapsed={stationaryElapsed} movingElapsed={movingElapsed} />
            <EquationBlock label="Relativistic factor">
              <span>Δτ/Δt = √(1 - v²/c²) ≈ {relativityFactor.toFixed(3)}</span>
            </EquationBlock>
            <div className="time59-eq">
              <p className="time59-eq-label">Special case</p>
              <div className="time59-eq-body">Δτ/Δt = 59/60 ⇒ v ≈ {formatSeconds(0.181)}c ≈ {formatSeconds(relativityVelocityKmS / 1000)} × 10^3 km/s</div>
            </div>
          </div>
        </div>
      </div>

      <div className="time59-grid time59-grid--two">
        <div className="time59-card">
          <div className="time59-card-heading">
            <h3>Can we keep the hour physically 3600 s?</h3>
            <p>Yes — by redefining the minute instead of the second</p>
          </div>
          <EquationBlock label="New minute duration">
            <span>1 minute = 3600 / 59 ≈ {formatSeconds(newMinute)} s</span>
          </EquationBlock>
          <div className="time59-bars">
            <div className="time59-bar-row">
              <span>Normal</span>
              <div className="time59-bar-track"><div className="time59-bar-fill" style={{ width: '100%' }} /></div>
              <strong>60 divisions</strong>
            </div>
            <div className="time59-bar-row">
              <span>Redefined</span>
              <div className="time59-bar-track"><div className="time59-bar-fill time59-bar-fill--accent" style={{ width: '98%' }} /></div>
              <strong>59 divisions</strong>
            </div>
          </div>
        </div>

        <div className="time59-card">
          <div className="time59-card-heading">
            <h3>Frequency and period</h3>
            <p>f = 1/T stays physically unchanged</p>
          </div>
          <div className="time59-pulse-row">
            {[...Array(12)].map((_, index) => (
              <span key={index} className="time59-pulse" />
            ))}
          </div>
          <div className="time59-metrics time59-metrics--inline">
            <div className="time59-stat">
              <span>Oscillator period</span>
              <strong>1 s</strong>
            </div>
            <div className="time59-stat">
              <span>Frequency</span>
              <strong>1 Hz</strong>
            </div>
          </div>
          <EquationBlock label="Counter logic">
            <span>60 cycles → 1 minute, 3540 cycles → 1 hour</span>
          </EquationBlock>
        </div>
      </div>

      <div className="time59-grid time59-grid--three">
        <div className="time59-card">
          <div className="time59-card-heading">
            <h3>Quartz clock model</h3>
            <p>Common digital example: 32768 Hz</p>
          </div>
          <div className="time59-stack">
            {['32768', '16384', '8192', '4096', '2048', '1024', '512', '256', '128', '64', '32', '16', '8', '4', '2', '1'].map((value) => (
              <span key={value} className="time59-chip">{value}</span>
            ))}
          </div>
          <p className="time59-footnote">A practical clock uses a high-frequency crystal and divides it down until it reaches 1 Hz.</p>
        </div>

        <div className="time59-card">
          <div className="time59-card-heading">
            <h3>Mechanical gear idea</h3>
            <p>Illustrative train ratio only</p>
          </div>
          <div className="time59-gear-row">
            <div className="time59-gear">60</div>
            <div className="time59-gear time59-gear--accent">59</div>
          </div>
          <EquationBlock label="Gear ratio">
            <span>1/60 vs 1/59</span>
          </EquationBlock>
        </div>

        <div className="time59-card">
          <div className="time59-card-heading">
            <h3>Relativity thought experiment</h3>
            <p>Not how a wristwatch would be built</p>
          </div>
          <label className="time59-select time59-select--full">
            <span>v/c</span>
            <input type="range" min="0" max="0.99" step="0.01" value={relativityVelocity} onChange={(event) => setRelativityVelocity(Number(event.target.value))} />
          </label>
          <div className="time59-metrics time59-metrics--inline">
            <div className="time59-stat">
              <span>Δτ/Δt</span>
              <strong>{formatSeconds(relativityFactor)}</strong>
            </div>
            <div className="time59-stat">
              <span>Slowdown</span>
              <strong>{formatSeconds((1 - relativityFactor) * 100)}%</strong>
            </div>
          </div>
          <p className="time59-footnote">For the 59/60 ratio, the required velocity is ~{formatSeconds(relativityVelocityKmS / 1000)} × 10^3 km/s.</p>
        </div>
      </div>

      <div className="time59-card">
        <div className="time59-card-heading">
          <h3>Generalized time system</h3>
          <p>Try a different minute/hour/day convention</p>
        </div>
        <div className="time59-control-stack">
          <label className="time59-select time59-select--full">
            <span>Minutes per hour</span>
            <input type="range" min="1" max="120" value={minutesPerHour} onChange={(event) => setMinutesPerHour(Number(event.target.value))} />
          </label>
          <label className="time59-select time59-select--full">
            <span>Seconds per minute</span>
            <input type="range" min="1" max="120" value={secondsPerMinute} onChange={(event) => setSecondsPerMinute(Number(event.target.value))} />
          </label>
          <label className="time59-select time59-select--full">
            <span>Hours per day</span>
            <input type="range" min="1" max="48" value={hoursPerDay} onChange={(event) => setHoursPerDay(Number(event.target.value))} />
          </label>
          <div className="time59-metrics time59-metrics--inline">
            <div className="time59-stat">
              <span>Seconds/hour</span>
              <strong>{generalizedSecondsPerHour}</strong>
            </div>
            <div className="time59-stat">
              <span>Seconds/day</span>
              <strong>{generalizedSecondsPerDay}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="time59-card">
        <div className="time59-card-heading">
          <h3>Conceptual summary</h3>
          <p>Three distinct interpretations</p>
        </div>
        <div className="time59-summary-list">
          <div className="time59-summary-item">
            <h4>1. Unit redefinition</h4>
            <p>59 new minutes can be defined to equal 3600 SI seconds, and no physical time needs to change.</p>
          </div>
          <div className="time59-summary-item">
            <h4>2. Shorter physical hour</h4>
            <p>If each minute remains 60 SI seconds, the clock drifts by 60 s per real hour and 24 min per day.</p>
          </div>
          <div className="time59-summary-item">
            <h4>3. Real relativistic physics</h4>
            <p>Actual time dilation is a physical effect and would require motion near a substantial fraction of the speed of light.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
