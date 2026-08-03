import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts.js';
import { useEffect } from 'react';
import { trackEvent } from '../utils/analytics.js';

function getReadingTime(content) {
  const text = content
    .map((paragraph) => {
      if (typeof paragraph === 'string') return paragraph;
      if (paragraph.type === 'text' || paragraph.type === 'code') return paragraph.content;
      return '';
    })
    .join(' ');
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(wordCount / 180));
}

export default function BlogLibraryPage() {
  useEffect(() => {
    trackEvent('blog_library_loaded', {
      page_title: document.title,
      page_path: window.location.pathname,
    });
  }, []);

  const trackBlogClick = (post, clickSource) => {
    trackEvent('blog_post_clicked', {
      post_id: post.id,
      post_title: post.title,
      click_source: clickSource,
      page_path: window.location.pathname,
    });
  };

  return (
    <section className="page">
      <p className="page-kicker"></p>
      <h1 className="page-title">Blogs</h1>

      <ol className="library-list" aria-label="Blog post list">
        {blogPosts.map((post) => (
          <li className="library-item" key={post.id}>
            <article>
              <p className="library-meta">
                {post.date} · {getReadingTime(post.content)} min read
              </p>
              <h2 className="library-title">
                <Link
                  className="library-link"
                  to={`/blog/${post.id}`}
                  onClick={() => trackBlogClick(post, 'title')}
                >
                  {post.title}
                </Link>
              </h2>
              <p className="library-description">{post.excerpt}</p>
              <Link
                className="text-link"
                to={`/blog/${post.id}`}
                onClick={() => trackBlogClick(post, 'continue_reading')}
              >
                Continue Reading {'>'}
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
