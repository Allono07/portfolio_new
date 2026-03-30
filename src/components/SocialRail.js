const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/allen-thomson-5b1309110/',
    icon: (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path
          d="M5.2 8.6h3.1V19H5.2zM6.8 4.8a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM10.4 8.6h3v1.4h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.1 4 5V19h-3.1v-4.9c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7V19h-3.1z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/allen.thomson7?igsh=OXlvZW8yanQ0NWR4',
    icon: (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/AllenThomson/',
    icon: (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path
          d="M15.7 5.2 9.4 11.5a1 1 0 0 0 0 1.4l6.3 6.3M12.3 8.2H8.6a4.6 4.6 0 0 0 0 9.2h4.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Allono07',
    icon: (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path
          d="M12 3.2a8.8 8.8 0 0 0-2.8 17.1c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5 0-.5 0-.5.8 0 1.2.8 1.2.8.7 1.2 1.8.8 2.2.6.1-.5.3-.8.5-1-1.8-.2-3.8-.9-3.8-4.1 0-.9.3-1.7.8-2.3-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.3.8a7.7 7.7 0 0 1 4.2 0c1.6-1 2.3-.8 2.3-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.4.8 2.3 0 3.2-2 3.9-3.8 4.1.3.2.6.8.6 1.5v2.2c0 .2.1.5.5.4A8.8 8.8 0 0 0 12 3.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social links">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          className="social-rail-link"
          href={link.href}
          rel="noreferrer"
          target="_blank"
          aria-label={link.label}
          title={link.label}
        >
          {link.icon}
        </a>
      ))}
    </aside>
  );
}
