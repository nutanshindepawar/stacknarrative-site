// Share links for blog posts. Plain links only: no third-party scripts, trackers or cookies.
const ICONS: Record<string, React.ReactNode> = {
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.75 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4z" />,
  x: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.17h1.7L7.4 4.74H5.58z" />,
  whatsapp: <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.87 3.74zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.02c0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.13 3.65 1.53.66 2.13.72 2.9.6.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28z" />,
  email: <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.4 2 7.6 5.6L19.6 7zM20 8.6l-8 5.9-8-5.9V17h16z" />,
  link: <path d="M10.6 13.4a1 1 0 0 1 0-1.4l3.5-3.5a1 1 0 1 1 1.4 1.4L12 13.4a1 1 0 0 1-1.4 0zm-1.9 5.3a4.5 4.5 0 0 1-3.2-7.7l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a2.5 2.5 0 0 0 3.5 3.5l2.1-2.1a1 1 0 0 1 1.4 1.4l-2.1 2.1a4.5 4.5 0 0 1-3.1 1.4zm7-6.7a1 1 0 0 1-.7-1.7l2.1-2.1a2.5 2.5 0 0 0-3.5-3.5l-2.1 2.1a1 1 0 0 1-1.4-1.4l2.1-2.1a4.5 4.5 0 0 1 6.3 6.3l-2.1 2.1a1 1 0 0 1-.7.3z" />,
};

const Icon = ({ name }: { name: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    {ICONS[name]}
  </svg>
);

export default function Share({ url, title, label }: { url: string; title: string; label?: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "whatsapp", label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { name: "email", label: "Share by email", href: `mailto:?subject=${t}&body=${t}%0A%0A${u}` },
  ];
  return (
    <div className="share">
      {label && <span className="k">{label}</span>}
      <div className="share-row">
        {links.map((l) => (
          <a
            key={l.name}
            className="share-btn"
            href={l.href}
            aria-label={l.label}
            title={l.label}
            {...(l.name === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          >
            <Icon name={l.name} />
          </a>
        ))}
        <button type="button" className="share-btn" data-copy-link={url} aria-label="Copy link" title="Copy link">
          <Icon name="link" />
          <span className="share-copied" aria-live="polite"></span>
        </button>
      </div>
    </div>
  );
}
