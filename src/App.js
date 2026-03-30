import { Route, Routes } from 'react-router-dom';
import KindleShell from './components/KindleShell.js';
import AboutPage from './pages/AboutPage.js';
import BlogLibraryPage from './pages/BlogLibraryPage.js';
import BlogPostPage from './pages/BlogPostPage.js';
import ContactPage from './pages/ContactPage.js';
import HomePage from './pages/HomePage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import PortfolioPage from './pages/PortfolioPage.js';

export default function App() {
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
