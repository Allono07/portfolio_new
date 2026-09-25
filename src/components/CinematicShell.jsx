import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';
import SocialRail from './SocialRail.js';
import ArrowIcon from './ArrowIcon.jsx';
import StatusBar from './StatusBar.js';
import resume from '../../allenresume_27_08.pdf';

export default function CinematicShell() {
  const { theme, toggleTheme, fontScale, increaseFontSize, decreaseFontSize } = useKindle();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicMuted, setMusicMuted] = useState(true);
  const [showMusicCredit, setShowMusicCredit] = useState(false);
  const musicEmbed = `https://www.youtube.com/embed/x4RXNO9oaS0?autoplay=1&mute=${musicMuted ? 1 : 0}&loop=1&playlist=x4RXNO9oaS0&controls=0&showinfo=0&rel=0&playsinline=1`;
  useEffect(() => {
    if (!showMusicCredit) return undefined;
    const creditTimer = window.setTimeout(() => setShowMusicCredit(false), 3500);
    return () => window.clearTimeout(creditTimer);
  }, [showMusicCredit]);
  const toggleMusic = () => {
    setMusicMuted((current) => {
      if (current) setShowMusicCredit(true);
      return !current;
    });
  };
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
      <Link to="/" className="wordmark" aria-label="Allen Thomson home">
        <img src="/assets/astraunaut.webp" alt="Allen Thomson home" className="wordmark-mark" />
      </Link>
      <span className="header-caption mono">ENGINEER. BUILDER. ALWAYS CURIOUS.</span>
      {location.pathname === '/' && <div className="site-audio" aria-label="Background music">
        <iframe className="site-audio-frame" src={musicEmbed} title="Background music" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen={false} referrerPolicy="strict-origin-when-cross-origin" />
        <button type="button" className={`site-audio-toggle${showMusicCredit ? ' site-audio-toggle--expanded' : ''}${musicMuted ? ' site-audio-toggle--muted' : ''}`} onClick={toggleMusic} aria-label={musicMuted ? 'Turn background music on' : 'Turn background music off'}>
          <span className="site-audio-icon" aria-hidden="true">{musicMuted ? '▶' : '❚❚'}</span>
          <span className="site-audio-credit">TEN by Fred Again</span>
        </button>
      </div>}
      <button className="menu-toggle mono" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
      <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
      <NavLink to="">Home</NavLink>  <NavLink to="/about">About</NavLink><NavLink to="/portfolio">Work</NavLink><Link to="/forum">Building</Link><NavLink to="/blog">Blogs</NavLink><NavLink to="/forum">Forum</NavLink><NavLink to="/contact" className="nav-contact">Let’s talk <ArrowIcon /></NavLink>
      </nav>
      <button className="theme-switch" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? '◑' : '◐'}</button>
    </header>
    <main id="main-content" tabIndex="-1" className={location.pathname === '/' ? 'landing-main' : 'inner-main'}><Outlet /></main>
    <footer className="editorial-footer">
      <Link className="footer-signature" to="/">Allen Thomson<ArrowIcon /></Link>
      <div className="footer-row"><p className="mono">SOFTWARE ENGINEER & TINKERER</p><SocialRail /></div>
      <div className="footer-row footer-baseline"><p>© allenthomson.com</p><div className="footer-links"><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><a href={resume} download>Résumé ↓</a><details className="reading-settings"><summary>Reading settings</summary><div><button onClick={decreaseFontSize} aria-label="Decrease reading text size">A−</button><button onClick={increaseFontSize} aria-label="Increase reading text size">A+</button><StatusBar /></div></details></div></div>
    </footer>
  </div>;
}
