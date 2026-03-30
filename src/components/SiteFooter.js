import { NavLink } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer navigation">
      <nav className="site-footer-nav">
        {footerLinks.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) =>
              isActive ? 'site-footer-link active' : 'site-footer-link'
            }
            end={link.to === '/'}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <p className="site-footer-copy">© allenthomson.com</p>
    </footer>
  );
}
