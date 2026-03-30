import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

function getScreenLabel(pathname) {
  if (pathname === '/') {
    return 'Home';
  }

  if (pathname === '/portfolio') {
    return 'Portfolio';
  }

  if (pathname === '/blog') {
    return 'Library';
  }

  if (pathname.startsWith('/blog/')) {
    return 'Now Reading';
  }

  if (pathname === '/about') {
    return 'About';
  }

  if (pathname === '/contact') {
    return 'Contact';
  }

  return 'Kindle Portfolio';
}

function formatTime(date) {
  const formattedTime = new Intl.DateTimeFormat([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return formattedTime.replace(/\b(am|pm)\b/i, (period) => period.toUpperCase());
}

export default function StatusBar() {
  const location = useLocation();
  const screenLabel = getScreenLabel(location.pathname);
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [batteryLevel, setBatteryLevel] = useState(72);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let batteryManager;
    let removeListeners = () => {};
    let isMounted = true;

    const syncBattery = () => {
      if (!batteryManager || !isMounted) {
        return;
      }

      setBatteryLevel(Math.round(batteryManager.level * 100));
    };

    const bindBattery = async () => {
      if (!navigator.getBattery) {
        return;
      }

      batteryManager = await navigator.getBattery();

      if (!isMounted) {
        return;
      }

      syncBattery();

      const handleBatteryChange = () => syncBattery();

      batteryManager.addEventListener('levelchange', handleBatteryChange);
      batteryManager.addEventListener('chargingchange', handleBatteryChange);

      removeListeners = () => {
        batteryManager.removeEventListener('levelchange', handleBatteryChange);
        batteryManager.removeEventListener('chargingchange', handleBatteryChange);
      };
    };

    bindBattery();

    return () => {
      isMounted = false;
      removeListeners();
    };
  }, []);

  const batteryFillWidth = useMemo(
    () => `${Math.max(8, Math.min(100, batteryLevel))}%`,
    [batteryLevel],
  );

  return (
    <header className="status-bar" aria-label="Kindle device status bar">
      <span className="status-time">{time}</span>
      <span className="status-label">{screenLabel || '\u00a0'}</span>

      <div className="status-icons">
        <span className="wifi-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path
              d="M2.5 8.5a15.2 15.2 0 0 1 19 0M5.6 11.6a10.7 10.7 0 0 1 12.8 0M8.8 14.7a6.2 6.2 0 0 1 6.4 0M12 18.2h.01"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            />
          </svg>
        </span>

        <span className="signal-icon" aria-hidden="true">
          <span className="signal-bar signal-bar--one" />
          <span className="signal-bar signal-bar--two" />
          <span className="signal-bar signal-bar--three" />
          <span className="signal-bar signal-bar--four" />
        </span>

        <span className="battery-level">{batteryLevel}%</span>

        <span
          className="battery-icon"
          aria-label={`Battery at ${batteryLevel} percent`}
        >
          <span className="battery-body">
            <span className="battery-fill" style={{ width: batteryFillWidth }} />
          </span>
          <span className="battery-cap" />
        </span>
      </div>
    </header>
  );
}
