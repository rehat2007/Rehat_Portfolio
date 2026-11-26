import type { CSSProperties } from "react";
import { Clock } from "@/components/ui/Clock";
import { Experience } from "@/components/sections/Experience";

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label reveal">
              <span>02</span> About
            </p>
            <h2 className="reveal">
              Engineer by trade,
              <br />
              <em>tinkerer</em> by default.
            </h2>
          </div>
        </header>

        <div className="about-grid">
          <div className="about-copy">
            <p className="reveal">
              I care about the last 10%: the easing curve, the empty state, the way a button responds when
              you press it. For the past eight years I&rsquo;ve helped teams ship design systems, editors
              and WebGL-heavy interfaces.
            </p>
            <p className="reveal" style={{ "--d": 1 } as CSSProperties}>
              Most of my work lives where engineering and design overlap. I write the CSS, wire the state,
              prototype the weird idea &mdash; then make sure it still feels good on a five-year-old laptop.
            </p>
            <p className="reveal" style={{ "--d": 2 } as CSSProperties}>
              Outside of work you&rsquo;ll find me collecting field recordings, rebuilding my keyboard
              firmware, and losing at online chess.
            </p>
            <p className="signature reveal" style={{ "--d": 3 } as CSSProperties}>
              &mdash; Alex
            </p>

            <div className="toolkit reveal" style={{ "--d": 4 } as CSSProperties}>
              <span className="mono-label">Daily toolkit</span>
              <div className="chips">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Three.js",
                  "WebGL / GLSL",
                  "Framer Motion",
                  "Node.js",
                  "Rust",
                  "Figma",
                  "Tailwind",
                  "Postgres",
                  "Vitest",
                ].map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="now-card reveal" aria-label="Current status">
            <div className="now-card-head">
              <span className="mono-label">Currently</span>
              <span className="status-pill">
                <span className="status-dot" /> Available
              </span>
            </div>
            <ul className="now-list">
              <li>
                <span>Location</span>
                <span>
                  Lisbon, PT &middot; <Clock />
                </span>
              </li>
              <li>
                <span>Role</span>
                <span>Senior Frontend Engineer at Novum Labs</span>
              </li>
              <li>
                <span>Building</span>
                <span>A WebGPU shader playground</span>
              </li>
              <li>
                <span>Reading</span>
                <span>&ldquo;The Creative Act&rdquo; &mdash; Rick Rubin</span>
              </li>
              <li>
                <span>Listening</span>
                <span className="now-listen">
                  <span className="eq" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                  Roygbiv &mdash; Boards of Canada
                </span>
              </li>
              <li>
                <span>Availability</span>
                <span>Open for select projects &middot; 2027</span>
              </li>
            </ul>
            <div className="now-card-foot">
              <a className="text-link" href="#contact">
                Start a conversation
              </a>
              <span aria-hidden="true">↗</span>
            </div>
          </aside>
        </div>

        <div className="experience">
          <div className="experience-head reveal">
            <h3>Where I&rsquo;ve been</h3>
            <span className="mono">2017 &mdash; Present</span>
          </div>
          <Experience />
        </div>
      </div>
    </section>
  );
}
