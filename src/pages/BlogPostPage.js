import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';
import { blogPosts } from '../data/blogPosts.js';
import { trackEvent } from '../utils/analytics.js';
import BlogLikeButton from '../components/BlogLikeButton.js';
import { likeBlogPost, subscribeToBlogLikes, unlikeBlogPost } from '../utils/blogLikes.js';
import {
  getStoredLikedPosts,
  removeLikedPost,
  storeLikedPost,
} from '../utils/blogLikeStorage.js';

import mermaid from 'mermaid';

const DEFAULT_INLINE_ZOOM = 1;
const DEFAULT_MODAL_ZOOM = 2.1;
const MAX_READER_PAGES = 2;

const LIKE_PROMPT = 'If you liked my blog, a like would mean a lot.';

function TypewriterPrompt({ animationKey }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let cancelled = false;
    const typeDelay = 42;
    const deleteDelay = 20;
    const pauseAtEnd = 2000;
    const pauseBeforeRestart = 500;

    const wait = (ms) =>
      new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });

    async function runTypewriterLoop() {
      while (!cancelled) {
        for (let index = 1; index <= LIKE_PROMPT.length && !cancelled; index += 1) {
          setDisplayText(LIKE_PROMPT.slice(0, index));
          await wait(typeDelay);
        }

        if (cancelled) break;
        await wait(pauseAtEnd);

        for (let index = LIKE_PROMPT.length - 1; index >= 0 && !cancelled; index -= 1) {
          setDisplayText(LIKE_PROMPT.slice(0, index));
          await wait(deleteDelay);
        }

        if (cancelled) break;
        await wait(pauseBeforeRestart);
      }
    }

    setDisplayText('');
    runTypewriterLoop();

    return () => {
      cancelled = true;
    };
  }, [animationKey]);

  return (
    <p className="post-like-prompt" aria-label={LIKE_PROMPT}>
      <span className="post-like-prompt-text" aria-hidden="true">
        {displayText}
      </span>
      <span className="post-like-prompt-caret" aria-hidden="true" />
    </p>
  );
}

function PostLikeControl({
  liked,
  likeCount,
  isLiking,
  onToggle,
  showPrompt = false,
  promptKey = 0,
}) {
  return (
    <div className={`post-like-control${showPrompt ? ' post-like-control--prompt' : ''}`}>
      <BlogLikeButton
        liked={liked}
        likeCount={likeCount}
        isLiking={isLiking}
        onToggle={onToggle}
      />
      {showPrompt ? <TypewriterPrompt animationKey={promptKey} /> : null}
    </div>
  );
}

function getSvgDimensions(svg) {
  const fallback = { width: 900, height: 520 };
  const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
  const svgElement = doc.querySelector('svg');

  if (!svgElement) return fallback;

  const viewBox = svgElement.getAttribute('viewBox');
  if (viewBox) {
    const [, , width, height] = viewBox.split(/\s+/).map(Number);
    if (Number.isFinite(width) && Number.isFinite(height)) {
      return { width, height };
    }
  }

  const width = parseFloat(svgElement.getAttribute('width'));
  const height = parseFloat(svgElement.getAttribute('height'));
  return {
    width: Number.isFinite(width) ? width : fallback.width,
    height: Number.isFinite(height) ? height : fallback.height
  };
}

function makeSvgFillContainer(container) {
  const svg = container?.querySelector('svg');
  if (!svg) return;

  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.maxWidth = 'none';
  svg.style.display = 'block';
}

function Mermaid({ chart }) {
  const containerRef = useRef(null);
  const modalContainerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const modalScrollContainerRef = useRef(null);
  const dragStateRef = useRef({
    target: null,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    moved: false
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(DEFAULT_MODAL_ZOOM);
  const [inlineZoom, setInlineZoom] = useState(DEFAULT_INLINE_ZOOM);
  const [diagramSize, setDiagramSize] = useState({ width: 900, height: 520 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
    mermaid.render(id, chart)
      .then(({ svg }) => {
        setDiagramSize(getSvgDimensions(svg));
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          makeSvgFillContainer(containerRef.current);
        }
        if (modalContainerRef.current) {
          modalContainerRef.current.innerHTML = svg;
          makeSvgFillContainer(modalContainerRef.current);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, [chart, isOpen]);

  const handlePointerDown = (event, targetRef) => {
    if (event.button !== 0) return;
    const target = targetRef.current;
    if (!target) return;

    dragStateRef.current = {
      target,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: target.scrollLeft,
      scrollTop: target.scrollTop,
      moved: false
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const { target, startX, startY, scrollLeft, scrollTop } = dragStateRef.current;
    if (!target) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStateRef.current.moved = true;
    }
    target.scrollLeft = scrollLeft - dx;
    target.scrollTop = scrollTop - dy;
  };

  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setIsDragging(false);
  };

  const handleInlineClick = () => {
    if (!dragStateRef.current.moved) {
      setIsOpen(true);
      setZoom(DEFAULT_MODAL_ZOOM);
    }
  };

  const iconButtonStyle = {
    padding: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px'
  };

  return (
    <div style={{ margin: '2rem 0', position: 'relative', border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
      <div 
        ref={scrollContainerRef}
        onPointerDown={(event) => handlePointerDown(event, scrollContainerRef)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleInlineClick}
        style={{ 
          overflow: 'auto', 
          width: '100%', 
          minHeight: '360px',
          padding: '20px',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
      >
        <div 
          ref={containerRef} 
          className="mermaid-diagram" 
          style={{ 
            width: `${diagramSize.width * inlineZoom}px`,
            height: `${diagramSize.height * inlineZoom}px`,
            margin: '0 auto',
            pointerEvents: 'none'
          }} 
          title="Hold & drag to move. Click to view full screen."
        />
      </div>
      
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', zIndex: 10 }}>
         <button onClick={(e) => { e.stopPropagation(); setInlineZoom(z => z + 0.2); }} style={iconButtonStyle} title="Zoom In">+</button>
         <button onClick={(e) => { e.stopPropagation(); setInlineZoom(z => Math.max(0.6, z - 0.2)); }} style={iconButtonStyle} title="Zoom Out">-</button>
         <button onClick={(e) => { e.stopPropagation(); setInlineZoom(DEFAULT_INLINE_ZOOM); }} style={iconButtonStyle} title="Reset Zoom">↺</button>
         <button onClick={(e) => { e.stopPropagation(); setIsOpen(true); setZoom(DEFAULT_MODAL_ZOOM); }} style={{...iconButtonStyle, borderBottom: 'none'}} title="Fullscreen">⛶</button>
      </div>
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '10px', marginTop: '40px', marginBottom: '20px', zIndex: 10000 }}>
             <button onClick={() => setZoom(z => z + 0.2)} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', border: 'none' }}>Zoom In (+)</button>
             <button onClick={() => setZoom(z => Math.max(0.6, z - 0.2))} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', border: 'none' }}>Zoom Out (-)</button>
             <button onClick={() => setZoom(DEFAULT_MODAL_ZOOM)} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', border: 'none' }}>Reset</button>
             <button onClick={() => setIsOpen(false)} style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer', marginLeft: '20px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '4px', border: 'none' }}>Close</button>
          </div>
          <div
            ref={modalScrollContainerRef}
            onPointerDown={(event) => handlePointerDown(event, modalScrollContainerRef)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              overflow: 'auto',
              width: '100%',
              height: '100%',
              padding: '30px',
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none'
            }}
          >
            <div 
              ref={modalContainerRef} 
              style={{ 
                width: `${diagramSize.width * zoom}px`,
                height: `${diagramSize.height * zoom}px`,
                margin: '0 auto',
                background: 'white',
                padding: '20px',
                borderRadius: '8px'
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

function getParagraphWordCount(paragraph) {
  if (typeof paragraph === 'string') {
    return paragraph.split(/\s+/).filter(Boolean).length;
  }
  if (paragraph.type === 'text') {
    return paragraph.content.split(/\s+/).filter(Boolean).length;
  }
  if (paragraph.type === 'code') {
    return 10; // drastically reduce code block weight so it fits better
  }
  if (paragraph.type === 'table') {
    return 10;
  }
  if (paragraph.type === 'mermaid') {
    return 10;
  }
  return 0;
}

function countWords(paragraphs) {
  return paragraphs.reduce((sum, p) => sum + getParagraphWordCount(p), 0);
}

function getReadingTime(paragraphs) {
  return Math.max(1, Math.round(countWords(paragraphs) / 180));
}

function shouldStartReaderPage(paragraph) {
  return (
    paragraph?.type === 'text' &&
    /^### Challenge \d+/.test(paragraph.content)
  );
}

function paginateParagraphs(paragraphs, fontScale) {
  let wordsPerPage = Math.max(120, Math.round(240 / fontScale));
  
  const totalWords = countWords(paragraphs);
  if (totalWords > wordsPerPage * MAX_READER_PAGES) {
    wordsPerPage = Math.ceil(totalWords / MAX_READER_PAGES);
  }

  const pages = [];
  let currentPage = [];
  let currentWordCount = 0;

  paragraphs.forEach((paragraph) => {
    const paragraphWordCount = getParagraphWordCount(paragraph);
    const shouldStartNewPage =
      currentPage.length > 0 &&
      (shouldStartReaderPage(paragraph) ||
        currentWordCount + paragraphWordCount > wordsPerPage);

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

  if (pages.length > MAX_READER_PAGES) {
    return [
      pages[0],
      pages.slice(1).flat()
    ];
  }

  return pages;
}

export default function BlogPostPage() {
  const { postId } = useParams();
  const { fontScale } = useKindle();
  const [currentPage, setCurrentPage] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [likedPosts, setLikedPosts] = useState(getStoredLikedPosts);
  const [likeError, setLikeError] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const postIndex = blogPosts.findIndex((item) => item.id === postId);
  const post = blogPosts[postIndex];

  useEffect(() => {
    setCurrentPage(0);
    setLikeError('');
  }, [fontScale, postId]);

  useEffect(() => {
    if (!post) return undefined;

    trackEvent('blog_post_loaded', {
      post_id: post.id,
      post_title: post.title,
      page_path: window.location.pathname,
    });

    return undefined;
  }, [post]);

  useEffect(() => {
    if (!post) return undefined;

    return subscribeToBlogLikes(
      post.id,
      setLikeCount,
      () => setLikeError('Likes are temporarily unavailable.'),
    );
  }, [post]);

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
  const totalPages = pages.length;
  const boundedCurrentPage = Math.min(currentPage, totalPages - 1);
  const activePage = pages[boundedCurrentPage] || [];
  const progress = Math.round(((boundedCurrentPage + 1) / totalPages) * 100);
  const previousPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const liked = likedPosts.includes(post.id);

  const handleLikeToggle = async () => {
    if (isLiking) return;

    setIsLiking(true);
    setLikeError('');

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
        });
      } else {
        await likeBlogPost(post.id);
        storeLikedPost(post.id);
        setLikedPosts((previousLikedPosts) => [...previousLikedPosts, post.id]);
        trackEvent('blog_post_liked', {
          post_id: post.id,
          post_title: post.title,
          like_count: likeCount + 1,
        });
      }
    } catch {
      setLikeError('Could not update your like. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  const trackReaderBlogClick = (targetPost, clickSource) => {
    trackEvent('blog_post_clicked', {
      post_id: targetPost.id,
      post_title: targetPost.title,
      click_source: clickSource,
      page_path: window.location.pathname,
    });
  };

  return (
    <section className="page page-reader">
      <div className="reader-topline">
        <Link className="text-link" to="/blog">
          Back to Blogs >
        </Link>

        <PostLikeControl
          liked={liked}
          likeCount={likeCount}
          isLiking={isLiking}
          onToggle={handleLikeToggle}
        />
      </div>

      <header className="reader-header">
        <p className="reader-meta">
          {post.date} · {getReadingTime(post.content)} min read
        </p>
        <h1>{post.title}</h1>
        <p className="reader-excerpt">{post.excerpt}</p>
        {likeError ? <p className="reader-meta">{likeError}</p> : null}
      </header>

      <div className="reader-progress" aria-label={`Reading progress ${progress}%`}>
        <span className="reader-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <article
        className="reader-page-sheet"
        style={{ fontSize: '1.02rem' }}
      >
        {activePage.map((paragraph, idx) => {
          if (typeof paragraph === 'string') {
            return <p key={paragraph.slice(0, 32) + idx} style={{ whiteSpace: 'pre-wrap' }}>{paragraph}</p>;
          }
          if (paragraph.type === 'text') {
            if (paragraph.content.startsWith('### ')) {
              return <h3 key={'h3' + idx} style={{ marginTop: '2rem', marginBottom: '1rem' }}>{paragraph.content.replace('### ', '')}</h3>;
            }
            return <p key={'txt' + idx} style={{ whiteSpace: 'pre-wrap' }}>{paragraph.content}</p>;
          }
          if (paragraph.type === 'code') {
            return (
              <pre key={'code' + idx} style={{ background: '#f4f4f4', padding: '10px', overflowX: 'auto', borderRadius: '4px', fontSize: '0.9em', margin: '1rem 0' }}>
                <code>{paragraph.content}</code>
              </pre>
            );
          }
          if (paragraph.type === 'mermaid') {
            return <Mermaid key={'merm' + idx} chart={paragraph.content} />;
          }
          if (paragraph.type === 'table') {
            return (
              <div key={'table' + idx} style={{ overflowX: 'auto', margin: '2rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      {paragraph.headers.map((h, i) => (
                        <th key={i} style={{ borderBottom: '2px solid #ccc', padding: '8px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paragraph.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ borderBottom: '1px solid #eaeaea', padding: '8px' }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        })}
      </article>

      <div className="reader-like-footer">
        <PostLikeControl
          liked={liked}
          likeCount={likeCount}
          isLiking={isLiking}
          onToggle={handleLikeToggle}
          showPrompt
          promptKey={`${post.id}-${boundedCurrentPage}`}
        />
      </div>

      <div className="reader-footer">
        <p className="reader-page-count">
          Page {boundedCurrentPage + 1} of {totalPages}
        </p>

        <div className="reader-page-actions">
          <button
            className="reader-nav-button"
            onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
            type="button"
            disabled={boundedCurrentPage === 0}
          >
            Previous Page
          </button>

          <button
            className="reader-nav-button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages - 1, page + 1))
            }
            type="button"
            disabled={boundedCurrentPage === totalPages - 1}
          >
            Next Page
          </button>
        </div>
      </div>

      <div className="reader-shelf-links">
        {previousPost ? (
          <Link
            className="text-link"
            to={`/blog/${previousPost.id}`}
            onClick={() => trackReaderBlogClick(previousPost, 'previous_blog')}
          >
            Previous Blog >
          </Link>
        ) : (
          <span className="reader-placeholder">Start of library</span>
        )}

        {nextPost ? (
          <Link
            className="text-link"
            to={`/blog/${nextPost.id}`}
            onClick={() => trackReaderBlogClick(nextPost, 'next_blog')}
          >
            Next Page >
          </Link>
        ) : (
          <span className="reader-placeholder">Last Blog on device</span>
        )}
      </div>
    </section>
  );
}
