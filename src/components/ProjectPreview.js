export default function ProjectPreview({ type = 'desktop' }) {
  return (
    <div className={`project-preview project-preview--${type}`} aria-hidden="true">
      <span className="preview-block preview-block--one" />
      <span className="preview-block preview-block--two" />
      <span className="preview-block preview-block--three" />
    </div>
  );
}
