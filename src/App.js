import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import KindleShell from './components/KindleShell.js';
import AboutPage from './pages/AboutPage.js';
import BlogLibraryPage from './pages/BlogLibraryPage.js';
import BlogPostPage from './pages/BlogPostPage.js';
import ContactPage from './pages/ContactPage.js';
import HomePage from './pages/HomePage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import PortfolioPage from './pages/PortfolioPage.js';
import { initGtag, GA_MEASUREMENT_ID } from './firebase.js';

function getScreenName(pathname) {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/portfolio':
      return 'Portfolio';
    case '/blog':
      return 'BlogLibrary';
    case '/about':
      return 'About';
    case '/contact':
      return 'Contact';
    default:
      if (pathname.startsWith('/blog/')) return 'BlogPost';
      return 'Unknown';
  }
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initGtag();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const screenName = getScreenName(location.pathname);

      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_title: document.title,
        screen_name: screenName,
      });

      window.gtag('event', 'screen_view', {
        screen_name: screenName,
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<KindleShell />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="blog" element={<BlogLibraryPage />} />
        <Route path="blog/:postId" element={<BlogPostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
