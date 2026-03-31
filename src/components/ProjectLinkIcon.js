export default function ProjectLinkIcon({ href, title }) {
  return (
    <a
      aria-label={`Open ${title}`}
      className="project-icon-link"
      href={href}
      rel="noreferrer"
      target="_blank"
      title={`Open ${title}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12 .5A11.5 11.5 0 0 0 .5 12.2a11.7 11.7 0 0 0 7.9 11.1c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.4-5.3-6 0-1.3.4-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.7 11.7 0 0 0 7.9-11.1A11.5 11.5 0 0 0 12 .5Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
