import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Clock } from "@/components/ui/Clock";

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
              you press it. As a full-stack developer, I build products that feel considered from the
              interface down to the data model.
            </p>
            <p className="reveal" style={{ "--d": 1 } as CSSProperties}>
              Most of my work lives where engineering and product overlap. I write the code, wire the
              state, shape the API, and make sure the result still feels good on a slow connection.
            </p>
            <p className="reveal" style={{ "--d": 2 } as CSSProperties}>
              Outside of work you&rsquo;ll usually find me learning something new, refining my setup, and
              exploring the web platform.
            </p>
            <p className="signature reveal" style={{ "--d": 3 } as CSSProperties}>
              &mdash; Rehat
            </p>

            <div className="toolkit reveal" style={{ "--d": 4 } as CSSProperties}>
              <span className="mono-label">Daily toolkit</span>
              <div className="chips">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "PostgreSQL",
                  "Tailwind CSS",
                  "REST APIs",
                  "Git",
                  "Docker",
                  "Figma",
                  "Prisma",
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
                  {site.profile.location} &middot; <Clock />
                </span>
              </li>
              <li>
                <span>Role</span>
                <span>{site.profile.role}</span>
              </li>
              <li>
                <span>Building</span>
                <span>Products for the web, end to end</span>
              </li>
              <li>
                <span>Focus</span>
                <span>Web apps &middot; APIs &middot; Interfaces</span>
              </li>
              <li>
                <span>Availability</span>
                <span>Open to select projects</span>
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
      </div>
    </section>
  );
}
