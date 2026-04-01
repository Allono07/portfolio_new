import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';
import { blogPosts } from '../data/blogPosts.js';

function countWords(paragraphs) {
  return paragraphs.join(' ').trim().split(/\s+/).filter(Boolean).length;
}

function getReadingTime(paragraphs) {
  return Math.max(1, Math.round(countWords(paragraphs) / 180));
}

function paginateParagraphs(paragraphs, fontScale) {
  const wordsPerPage = Math.max(120, Math.round(240 / fontScale));
  const pages = [];
  let currentPage = [];
  let currentWordCount = 0;

  paragraphs.forEach((paragraph) => {
    const paragraphWordCount = paragraph.split(/\s+/).filter(Boolean).length;
    const shouldStartNewPage =
      currentPage.length > 0 &&
      currentWordCount + paragraphWordCount > wordsPerPage;

    if (shouldStartNewPage) {
      pages.push(currentPage);
      currentPage = [paragraph];
      currentWordCount = paragraphWordCount;
      return;
    }

    currentPage.push(paragraph);
    currentWordCount += paragraphWordCount;
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

export default function BlogPostPage() {
  const { postId } = useParams();
  const { fontScale, isBookmarked, toggleBookmark } = useKindle();
  const [currentPage, setCurrentPage] = useState(0);
  const postIndex = blogPosts.findIndex((item) => item.id === postId);
  const post = blogPosts[postIndex];

  useEffect(() => {
    setCurrentPage(0);
  //   window.gtag('event', 'blog_page_visited', {
  //   page_title: document.title,
  //   page_path: window.location.pathname
  // });
  }, [fontScale, postId]);

  if (!post) {
    return (
      <section className="page page-reader">
        <p className="page-kicker">Reading Error</p>
        <h1 className="page-title">This page is not on the device.</h1>
        <Link className="text-link" to="/blog">
          Return to Library >
        </Link>
      </section>
    );
  }

  const pages = paginateParagraphs(post.content, fontScale);
  const activePage = pages[currentPage] || [];
  const totalPages = pages.length;
  const progress = Math.round(((currentPage + 1) / totalPages) * 100);
  const previousPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const bookmarked = isBookmarked(post.id);

  return (
    <section className="page page-reader">
      <div className="reader-topline">
        <Link className="text-link" to="/blog">
          Back to Library >
        </Link>

        <button
          className="text-button"
          onClick={() => toggleBookmark(post.id)}
          type="button"
          aria-pressed={bookmarked}
        >
          {bookmarked ? 'Remove Bookmark' : 'Bookmark Page'}
        </button>
      </div>

      <header className="reader-header">
        <p className="reader-meta">
          {post.date} · {getReadingTime(post.content)} min read
        </p>
        <h1>{post.title}</h1>
        <p className="reader-excerpt">{post.excerpt}</p>
      </header>

      <div className="reader-progress" aria-label={`Reading progress ${progress}%`}>
        <span className="reader-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <article
        className="reader-page-sheet"
        style={{ fontSize: '1.02rem' }}
      >
        {activePage.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </article>

      <div className="reader-footer">
        <p className="reader-page-count">
          Page {currentPage + 1} of {totalPages}
        </p>

        <div className="reader-page-actions">
          <button
            className="reader-nav-button"
            onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            type="button"
            disabled={currentPage === 0}
          >
            Previous Page
          </button>

          <button
            className="reader-nav-button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages - 1, page + 1))
            }
            type="button"
            disabled={currentPage === totalPages - 1}
          >
            Next Page
          </button>
        </div>
      </div>

      <div className="reader-shelf-links">
        {previousPost ? (
          <Link className="text-link" to={`/blog/${previousPost.id}`}>
            Previous Essay >
          </Link>
        ) : (
          <span className="reader-placeholder">Start of library</span>
        )}

        {nextPost ? (
          <Link className="text-link" to={`/blog/${nextPost.id}`}>
            Next Essay >
          </Link>
        ) : (
          <span className="reader-placeholder">Last essay on device</span>
        )}
      </div>
    </section>
  );
}
