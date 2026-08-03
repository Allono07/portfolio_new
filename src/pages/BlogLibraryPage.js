import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogLikeButton from '../components/BlogLikeButton.js';
import { blogPosts } from '../data/blogPosts.js';
import { trackEvent } from '../utils/analytics.js';
import { likeBlogPost, subscribeToBlogLikes, unlikeBlogPost } from '../utils/blogLikes.js';
import {
  getStoredLikedPosts,
  removeLikedPost,
  storeLikedPost,
} from '../utils/blogLikeStorage.js';

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
  const [likedPosts, setLikedPosts] = useState(getStoredLikedPosts);
  const [likeCounts, setLikeCounts] = useState({});
  const [likingPostId, setLikingPostId] = useState(null);

  useEffect(() => {
    trackEvent('blog_library_loaded', {
      page_title: document.title,
      page_path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    const unsubscribers = blogPosts.map((post) =>
      subscribeToBlogLikes(
        post.id,
        (count) => {
          setLikeCounts((previousCounts) => ({
            ...previousCounts,
            [post.id]: count,
          }));
        },
        () => {},
      ),
    );

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const trackBlogClick = (post, clickSource) => {
    trackEvent('blog_post_clicked', {
      post_id: post.id,
      post_title: post.title,
      click_source: clickSource,
      page_path: window.location.pathname,
    });
  };

  const handleLikeToggle = async (post) => {
    if (likingPostId) return;

    const liked = likedPosts.includes(post.id);
    const likeCount = likeCounts[post.id] ?? 0;

    setLikingPostId(post.id);

    try {
      if (liked) {
        await unlikeBlogPost(post.id);
        removeLikedPost(post.id);
        setLikedPosts((previousLikedPosts) =>
          previousLikedPosts.filter((id) => id !== post.id),
        );
        trackEvent('blog_post_unliked', {
          post_id: post.id,
          post_title: post.title,
          like_count: Math.max(0, likeCount - 1),
          click_source: 'blog_library',
        });
      } else {
        await likeBlogPost(post.id);
        storeLikedPost(post.id);
        setLikedPosts((previousLikedPosts) => [...previousLikedPosts, post.id]);
        trackEvent('blog_post_liked', {
          post_id: post.id,
          post_title: post.title,
          like_count: likeCount + 1,
          click_source: 'blog_library',
        });
      }
    } catch {
      // Keep UI unchanged if Firestore write fails.
    } finally {
      setLikingPostId(null);
    }
  };

  return (
    <section className="page">
      <p className="page-kicker"></p>
      <h1 className="page-title">Blogs</h1>

      <ol className="library-list" aria-label="Blog post list">
        {blogPosts.map((post) => (
          <li className="library-item" key={post.id}>
            <article>
              <div className="library-item-top">
                <p className="library-meta">
                  {post.date} · {getReadingTime(post.content)} min read
                </p>
                <BlogLikeButton
                  liked={likedPosts.includes(post.id)}
                  likeCount={likeCounts[post.id] ?? 0}
                  isLiking={likingPostId === post.id}
                  onToggle={() => handleLikeToggle(post)}
                  className="library-like-button"
                />
              </div>
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
