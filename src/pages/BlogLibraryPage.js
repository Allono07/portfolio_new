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
import { renderInlineLinks } from '../utils/renderInlineLinks.js';
import './BlogLibraryPage.css';

const topics = {
  'meili-map-matching-trashbuddy': 'Mapping',
  'redis-vs-kafka-trashbuddy': 'System design',
};
const topicFor = (post) => topics[post.id] || 'Notes';
const orderedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
const filters = ['All writing', ...new Set(orderedPosts.map(topicFor))];

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
  const [topic, setTopic] = useState('All writing');
  const [query, setQuery] = useState('');
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

  const featured = orderedPosts[0];
  const searching = query.trim().length > 0 || topic !== 'All writing';
  const archive = orderedPosts.filter(post =>
    (searching || post.id !== featured?.id) &&
    (topic === 'All writing' || topicFor(post) === topic) &&
    `${post.title} ${post.excerpt} ${topicFor(post)}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const cover = featured?.content.find(block => block?.type === 'image');
  const likeButton = (post) => <BlogLikeButton
    liked={likedPosts.includes(post.id)} likeCount={likeCounts[post.id] ?? 0}
    isLiking={likingPostId === post.id} onToggle={() => handleLikeToggle(post)}
  />;

  return (
    <section className="page journal-page">
      <header className="journal-masthead">
        <div className="journal-overline"><span>THE JOURNAL / ALLEN THOMSON</span><span>{String(orderedPosts.length).padStart(2, '0')} ARTICLES & COUNTING</span></div>
        <h1>Field notes<span>.</span></h1>
        <div className="journal-introduction"><p>Writing & research</p><p>Ideas, experiments, and lessons from building software.<br/>A place to think out loud.</p></div>
      </header>

      {featured && !searching && <article className="journal-feature">
        <div className="journal-feature-copy">
          <p className="journal-kicker">LATEST STORY / {topicFor(featured)}</p>
          <h2><Link to={`/blog/${featured.id}`} onClick={() => trackBlogClick(featured, 'featured_title')}>{featured.title}</Link></h2>
          <p className="journal-excerpt">{renderInlineLinks(featured.excerpt)}</p>
          <p className="journal-meta">{featured.date} · {getReadingTime(featured.content)} min read</p>
          <div className="journal-actions"><Link className="journal-read" to={`/blog/${featured.id}`} onClick={() => trackBlogClick(featured, 'featured_read')}>Read the story</Link>{likeButton(featured)}</div>
        </div>
        <Link className="journal-feature-art" to={`/blog/${featured.id}`} onClick={() => trackBlogClick(featured, 'featured_cover')} aria-label={`Read ${featured.title}`}>
          {cover ? <img src={cover.src} alt={cover.alt || ''}/> : <span className="journal-art-type" aria-hidden="true">Notes<br/>& ideas.</span>}
          <span className="journal-art-caption">FROM THE FIELD / 001</span>
        </Link>
      </article>}

      <section className="journal-archive" aria-labelledby="journal-archive-title">
        <div className="journal-archive-heading"><h2 id="journal-archive-title">{searching ? 'Explore the journal' : 'More from the journal'}</h2><label className="journal-search"><span className="journal-kicker">Search articles</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find an idea…"/></label></div>
        <div className="journal-filters" role="group" aria-label="Filter articles by topic">{filters.map(filter => <button key={filter} type="button" aria-pressed={topic === filter} onClick={() => setTopic(filter)}>{filter}</button>)}</div>
        <p className="journal-result-count" role="status">{archive.length} {archive.length === 1 ? 'article' : 'articles'}{searching ? ' found' : ' in the archive'}</p>
        <ol className="journal-posts">{archive.map((post, index) => <li key={post.id}>
          <article className="journal-post">
            <div className="journal-post-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
            <div className="journal-post-copy"><p className="journal-kicker">{topicFor(post)}</p><h3><Link to={`/blog/${post.id}`} onClick={() => trackBlogClick(post, 'title')}>{post.title}</Link></h3><p className="journal-excerpt">{renderInlineLinks(post.excerpt)}</p><p className="journal-meta">{post.date} · {getReadingTime(post.content)} min read</p></div>
            <div className="journal-post-actions">{likeButton(post)}<Link className="journal-read" to={`/blog/${post.id}`} onClick={() => trackBlogClick(post, 'continue_reading')} aria-label={`Read ${post.title}`}>Read article</Link></div>
          </article>
        </li>)}</ol>
        {archive.length === 0 && <div className="journal-empty"><p>No articles match this search.</p><button type="button" onClick={() => { setQuery(''); setTopic('All writing'); }}>Clear filters</button></div>}
      </section>
      <div className="journal-endnote"><span>ALWAYS CURIOUS. ALWAYS LEARNING.</span><Link to="/about">About the author</Link></div>
    </section>
  );
}
