"use client";

import { site } from "@/content/site";
import { Clock } from "@/components/ui/Clock";
import { Icon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  const backToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © <span id="year">{year}</span> {site.profile.name}. All rights reserved.
        </p>
        <p className="footer-mid mono">Built by hand with Next.js, GSAP &amp; too much coffee.</p>
        <div className="footer-end">
          <span className="footer-clock mono">
            <Clock showZone />
          </span>
          <button className="back-top" id="back-top" type="button" onClick={backToTop} aria-label="Back to top">
            <Icon name="arrowUp" />
          </button>
        </div>
      </div>
    </footer>
  );
}
