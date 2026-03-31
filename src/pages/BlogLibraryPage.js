import { Link } from 'react-router-dom';
import { useKindle } from '../context/KindleContext.js';
import { blogPosts } from '../data/blogPosts.js';

function getReadingTime(content) {
  const wordCount = content.join(' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 180));
}

export default function BlogLibraryPage() {
  const { isBookmarked } = useKindle();

  return (
    <section className="page">
      <p className="page-kicker">Blog</p>
      <h1 className="page-title">Test Blog</h1>

      <ol className="library-list" aria-label="Blog post list">
        {blogPosts.map((post) => (
          <li className="library-item" key={post.id}>
            <article>
              <p className="library-meta">
                {post.date} · {getReadingTime(post.content)} min read
                {isBookmarked(post.id) ? ' · Saved' : ''}
              </p>
              <h2 className="library-title">
                <Link className="library-link" to={`/blog/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="library-description">{post.excerpt}</p>
              <Link className="text-link" to={`/blog/${post.id}`}>
                Continue Reading >
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
