const TECHNOLOGIES = [
  "TypeScript",
  "React",
  "Next.js",
  "WebGL",
  "Three.js",
  "GSAP",
  "Node.js",
  "Rust",
  "Figma",
  "GLSL",
  "Postgres",
  "Framer Motion",
];

function MarqueeGroup() {
  return (
    <div className="marquee-group">
      {TECHNOLOGIES.map((technology) => (
        <span key={technology}>{technology}</span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}
