/**
 * Image optimization helper for responsive images with srcset
 */

export function getResponsiveImageSrcset(imagePath, alt = '', sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw') {
  // Assuming images are stored in src/data/images/
  const basePath = imagePath.replace(/\.[^/.]+$/, ''); // remove extension
  const ext = imagePath.match(/\.[^/.]+$/)?.[0] || '.jpg';

  return {
    srcSet: `
      ${basePath}-small${ext} 640w,
      ${basePath}-medium${ext} 1024w,
      ${basePath}-large${ext} 1920w
    `.trim(),
    sizes,
    src: `${basePath}-medium${ext}`,
    alt,
    loading: 'lazy',
    decoding: 'async',
  };
}

export function ResponsiveImage({ src, alt = '', sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw', className = '', ...props }) {
  const imageProps = getResponsiveImageSrcset(src, alt, sizes);
  
  return (
    <img
      {...imageProps}
      className={className}
      {...props}
    />
  );
}

/**
 * Picture element for better format control (webp support)
 */
export function RespectivePicture({ src, alt = '', sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw', className = '', ...props }) {
  const basePath = src.replace(/\.[^/.]+$/, '');
  
  return (
    <picture>
      <source
        srcSet={`
          ${basePath}-small.webp 640w,
          ${basePath}-medium.webp 1024w,
          ${basePath}-large.webp 1920w
        `}
        type="image/webp"
        sizes={sizes}
      />
      <img
        srcSet={`
          ${basePath}-small.jpg 640w,
          ${basePath}-medium.jpg 1024w,
          ${basePath}-large.jpg 1920w
        `}
        src={`${basePath}-medium.jpg`}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        {...props}
      />
    </picture>
  );
}
