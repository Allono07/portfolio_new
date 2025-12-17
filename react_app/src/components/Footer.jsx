import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-masthead">The Developer Chronicle</div>
        <p className="footer-tagline">Est. {currentYear} • Portfolio Edition</p>
        
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/projects" className="footer-link">Projects</Link>
          <Link to="/blogs" className="footer-link">Articles</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        <hr className="footer-divider" />

        <p className="copyright">
          © {currentYear} Allen Thomson. All rights reserved. | 
          Built with React & Vintage Aesthetics
        </p>
      </div>
    </footer>
  );
};

export default Footer;
