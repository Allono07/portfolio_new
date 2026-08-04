export function renderInlineLinks(text) {
  if (!text || typeof text !== 'string') return text;

  const parts = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let match = regex.exec(text);
  let key = 0;

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`inline-link-${key}`}
        className="text-link"
        href={match[2]}
        rel="noreferrer"
        target="_blank"
      >
        {match[1]}
      </a>,
    );

    key += 1;
    lastIndex = regex.lastIndex;
    match = regex.exec(text);
  }

  if (parts.length === 0) return text;

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
