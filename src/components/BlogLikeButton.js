function HeartIcon({ filled }) {
  return (
    <svg
      className={`post-like-icon${filled ? ' post-like-icon--filled' : ''}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function BlogLikeButton({
  liked,
  likeCount,
  isLiking,
  onToggle,
  className = '',
}) {
  return (
    <button
      className={`post-like-button${liked ? ' post-like-button--liked' : ''}${className ? ` ${className}` : ''}`}
      onClick={onToggle}
      type="button"
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      disabled={isLiking}
    >
      <HeartIcon filled={liked} />
      <span className="post-like-count">{likeCount}</span>
    </button>
  );
}
