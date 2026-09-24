import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';
import SocialRail from './SocialRail.js';
import StatusBar from './StatusBar.js';
import resume from '../../allenresume_27_08.pdf';

export default function CinematicShell() {
  const { theme, toggleTheme, fontScale, increaseFontSize, decreaseFontSize } = useKindle();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    setMenuOpen(false);
    if (location.hash) {
      const id = requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return <div className="cinematic-shell" style={{ '--font-scale': fontScale }}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label="Allen Thomson home">at<span>✳</span></Link>
      <span className="header-caption mono">ENGINEER. BUILDER. ALWAYS CURIOUS.</span>
      <button className="menu-toggle mono" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
      <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        <NavLink to="/about">About</NavLink><NavLink to="/portfolio">Work</NavLink><Link to="/#building">Building</Link><NavLink to="/blog">Writing</NavLink><NavLink to="/forum">Forum</NavLink><NavLink to="/contact" className="nav-contact">Let’s talk <span aria-hidden="true">↗</span></NavLink>
      </nav>
      <button className="theme-switch" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? '◑' : '◐'}</button>
    </header>
    <main id="main-content" tabIndex="-1" className={location.pathname === '/' ? 'landing-main' : 'inner-main'}><Outlet /></main>
    <footer className="editorial-footer">
      <Link className="footer-signature" to="/">Allen Thomson<span>↗</span></Link>
      <div className="footer-row"><p className="mono">SOFTWARE ENGINEER & ENTREPRENEUR</p><SocialRail /></div>
      <div className="footer-row footer-baseline"><p>© allenthomson.com</p><div className="footer-links"><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><a href={resume} download>Résumé ↓</a><details className="reading-settings"><summary>Reading settings</summary><div><button onClick={decreaseFontSize} aria-label="Decrease reading text size">A−</button><button onClick={increaseFontSize} aria-label="Increase reading text size">A+</button><StatusBar /></div></details></div></div>
    </footer>
  </div>;
}
