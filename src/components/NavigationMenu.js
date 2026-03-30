import { NavLink } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.8v2.5M12 18.7v2.5M21.2 12h-2.5M5.3 12H2.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3 5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path
        d="M18.2 15.4a7.4 7.4 0 0 1-9.6-9.6 8.8 8.8 0 1 0 9.6 9.6Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function NavigationMenu() {
  const { theme, toggleTheme } = useKindle();

  return (
    <nav className="kindle-nav" aria-label="Primary site navigation">
      <span className="nav-side-spacer" aria-hidden="true" />

      <div className="nav-link-list">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              isActive ? 'kindle-nav-link active' : 'kindle-nav-link'
            }
            end={item.to === '/'}
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <button
        className="nav-theme-toggle"
        onClick={toggleTheme}
        type="button"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
