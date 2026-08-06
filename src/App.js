import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import KindleShell from './components/KindleShell.js';
import HomePage from './pages/HomePage.js';
import { initGtag, GA_MEASUREMENT_ID } from './firebase.js';
import { initWebVitalsMonitoring } from './utils/webVitals.js';

// Lazy load route components for code splitting
const BlogLibraryPage = lazy(() => import('./pages/BlogLibraryPage.js'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.js'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.js'));
const ForumPage = lazy(() => import('./pages/ForumPage.js'));
const ForumTopicPage = lazy(() => import('./pages/ForumTopicPage.js'));
const AboutPage = lazy(() => import('./pages/AboutPage.js'));
const ContactPage = lazy(() => import('./pages/ContactPage.js'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.js'));

// Loading fallback component
function PageFallback() {
  return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;
}

function getScreenName(pathname) {
  switch (pathname) {
    case '/':
      return 'Home';
    case '/portfolio':
      return 'Portfolio';
    case '/forum':
      return 'Forum';
    case '/blog':
      return 'BlogLibrary';
    case '/about':
      return 'About';
    case '/contact':
      return 'Contact';
    default:
      if (pathname.startsWith('/blog/')) return 'BlogPost';
      if (pathname.startsWith('/forum/')) return 'ForumTopic';
      return 'Unknown';
  }
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initGtag();
    initWebVitalsMonitoring();
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
        <Route path="portfolio" element={<Suspense fallback={<PageFallback />}><PortfolioPage /></Suspense>} />
        <Route path="forum" element={<Suspense fallback={<PageFallback />}><ForumPage /></Suspense>} />
        <Route path="forum/:topicId" element={<Suspense fallback={<PageFallback />}><ForumTopicPage /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={<PageFallback />}><BlogLibraryPage /></Suspense>} />
        <Route path="blog/:postId" element={<Suspense fallback={<PageFallback />}><BlogPostPage /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageFallback />}><AboutPage /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageFallback />}><ContactPage /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense>} />
      </Route>
    </Routes>
  );
}
