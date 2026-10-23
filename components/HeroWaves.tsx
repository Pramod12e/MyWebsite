type Layer = {
  duration: number;
  opacity: number;
  height: string;
  reverse?: boolean;
};

const layers: Layer[] = [
  { duration: 38, opacity: 0.07, height: "h-44 sm:h-64" },
  { duration: 26, opacity: 0.1, height: "h-36 sm:h-52", reverse: true },
  { duration: 18, opacity: 0.16, height: "h-28 sm:h-40" },
];

const WAVE =
  "M0 160 C120 80 240 80 360 160 S600 240 720 160 C840 80 960 80 1080 160 S1320 240 1440 160 L1440 320 L0 320 Z";

export default function HeroWaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className={`absolute inset-x-0 bottom-0 overflow-hidden ${layer.height}`}
        >
          <div
            className={`wave-track flex w-[200%] ${layer.reverse ? "wave-reverse" : ""}`}
            style={{ animationDuration: `${layer.duration}s` }}
          >
            {[0, 1].map((n) => (
              <svg
                key={n}
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="block h-full w-1/2"
              >
                <path d={WAVE} fill="white" fillOpacity={layer.opacity} />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}