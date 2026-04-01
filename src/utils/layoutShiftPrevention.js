/**
 * Layout shift prevention utilities
 * Ensures stable dimensions to prevent Cumulative Layout Shift (CLS)
 */

/**
 * Container with stable aspect ratio to prevent layout shifts
 * Useful for images, videos, or content that loads asynchronously
 */
export function AspectRatioContainer({ 
  ratio = '16 / 9', 
  children, 
  className = '' 
}) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * Skeleton loader with stable dimensions
 * Prevents layout shift when content loads
 */
export function SkeletonLoader({ 
  width = '100%', 
  height = '100px', 
  className = '' 
}) {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width,
        height,
        backgroundColor: 'var(--paper-shadow)',
        borderRadius: '4px',
        animation: 'shimmer 2s infinite',
      }}
    />
  );
}

/**
 * Inline style tag for smooth font loading
 * Prevents layout shift from font swapping
 */
export const fontLoadingStyles = `
  @font-face {
    font-family: 'Georgia', serif;
    font-weight: 400;
    font-display: swap; /* Show fallback immediately, replace when loaded */
  }

  @font-face {
    font-family: 'Georgia', serif;
    font-weight: bold;
    font-display: swap;
  }

  /* Shimmer animation for skeleton loaders */
  @keyframes shimmer {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }

  /* Reserve space for scrollbar to prevent layout shift */
  html {
    scrollbar-gutter: stable;
  }
`;

/**
 * Fixed dimension wrapper
 * Ensures component has stable width/height before content loads
 */
export function FixedDimension({ 
  width, 
  height, 
  children, 
  className = '' 
}) {
  return (
    <div
      className={className}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        containment: 'layout',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Text truncation with stable height
 * Prevents shift when content loads
 */
export function StableText({ 
  children, 
  lines = 1, 
  className = '' 
}) {
  const lineHeight = 1.5;
  const fontSize = 16; // pixels (default)
  const height = lines * fontSize * lineHeight;

  return (
    <div
      className={className}
      style={{
        height: `${height}px`,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </div>
  );
}
