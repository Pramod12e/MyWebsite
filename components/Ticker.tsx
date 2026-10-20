export default function Ticker({ items }: { items: string[] }) {
  return (
    <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className="marquee-track flex w-max hover:[animation-play-state:paused]">
        {items.map((item) => (
          <li
            key={item}
            className="mb-3 mr-3 rounded-full border border-border px-4 py-2 font-mono text-sm text-muted"
          >
            {item}
          </li>
        ))}
        {items.map((item) => (
          <li
            key={`${item}-copy`}
            aria-hidden="true"
            className="marquee-dup mb-3 mr-3 rounded-full border border-border px-4 py-2 font-mono text-sm text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}