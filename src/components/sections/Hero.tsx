"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { FINE_POINTER, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Clock } from "@/components/ui/Clock";
import { Icon } from "@/components/ui/Icons";
import { SocialIconLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const lines = gsap.utils.toArray<HTMLElement>(".hero-line > span", section);
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(lines, { yPercent: 110, duration: 1, stagger: 0.08 })
          .from(".hero-kicker", { y: 16, opacity: 0, duration: 0.6 }, "-=0.75")
          .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.45")
          .from(".hero-actions", { y: 18, opacity: 0, duration: 0.6 }, "-=0.45")
          .from(".hero-socials", { y: 14, opacity: 0, duration: 0.5 }, "-=0.35")
          .from(".profile-card", { y: 28, opacity: 0, scale: 0.97, duration: 0.9 }, "-=0.8")
          .from(".hero-foot", { opacity: 0, y: 12, duration: 0.5 }, "-=0.5");
      });

      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const card = cardRef.current;
        const spot = spotRef.current;

        if (card) {
          gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });
          const rotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
          const rotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });

          const moveCard = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            rotY(x * 9);
            rotX(-y * 9);
          };
          const resetCard = () => {
            rotY(0);
            rotX(0);
          };

          card.addEventListener("pointermove", moveCard);
          card.addEventListener("pointerleave", resetCard);

          if (spot) {
            gsap.set(spot, { xPercent: -50, yPercent: -50, x: section.clientWidth * 0.3, y: 260 });
            const spotX = gsap.quickTo(spot, "x", { duration: 0.5, ease: "power3" });
            const spotY = gsap.quickTo(spot, "y", { duration: 0.5, ease: "power3" });

            const moveSpot = (event: PointerEvent) => {
              const rect = section.getBoundingClientRect();
              spotX(event.clientX - rect.left);
              spotY(event.clientY - rect.top);
            };

            section.addEventListener("pointermove", moveSpot);

            return () => {
              card.removeEventListener("pointermove", moveCard);
              card.removeEventListener("pointerleave", resetCard);
              section.removeEventListener("pointermove", moveSpot);
            };
          }

          return () => {
            card.removeEventListener("pointermove", moveCard);
            card.removeEventListener("pointerleave", resetCard);
          };
        }
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob--a" />
        <span className="blob blob--b" />
        <span className="hero-spot" id="hero-spot" ref={spotRef} />
        <span className="hero-grid-lines" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            <span>Available for select projects</span>
            <span className="kicker-sep" aria-hidden="true">
              /
            </span>
            <span>Lisbon, PT</span>
          </p>

          <h1>
            <span className="hero-line">
              <span>Interfaces</span>
            </span>
            <span className="hero-line">
              <span>
                that feel <em>alive</em>.
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            I&rsquo;m <strong>{site.profile.name}</strong>, a frontend engineer and creative developer
            turning ambitious product ideas into fast, tactile experiences. Currently building at Novum
            Labs.
          </p>

          <div className="hero-actions">
            <a className="btn btn--primary" href="#work">
              View selected work
              <Icon name="arrowUpRight" className="btn-icon" />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
          </div>

          <SocialIconLinks className="hero-socials" />
        </div>

        <div className="hero-side">
          <span className="hero-orbit" aria-hidden="true">
            <span />
          </span>

          <div className="profile-card" id="profile-card" ref={cardRef}>
            <div className="profile-card-inner">
              <div className="profile-top">
                <div className="avatar" aria-hidden="true">
                  <span>{site.profile.initials}</span>
                </div>
                <div className="profile-id">
                  <strong>{site.profile.name}</strong>
                  <span>{site.profile.handle}</span>
                </div>
                <span className="badge badge--live">
                  <span className="status-dot" aria-hidden="true" />
                  Open
                </span>
              </div>

              <div className="profile-now">
                <span className="mono-label">Now</span>
                <p>Prototyping a WebGPU shader playground</p>
              </div>

              <ul className="profile-rows">
                <li>
                  <span>Based in</span>
                  <span>
                    Lisbon, PT &mdash; <Clock id="local-time" />
                  </span>
                </li>
                <li>
                  <span>Role</span>
                  <span>Senior FE @ Novum Labs</span>
                </li>
                <li>
                  <span>Focus</span>
                  <span>Design systems &middot; WebGL &middot; Motion</span>
                </li>
              </ul>

              <div className="profile-listen">
                <div className="eq" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p>
                  <span>Listening to</span> Roygbiv &mdash; Boards of Canada
                </p>
              </div>

              <div className="profile-tags" aria-hidden="true">
                <span>TypeScript</span>
                <span>React</span>
                <span>WebGL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container hero-foot">
        <a className="scroll-cue" href="#work">
          <span className="scroll-line" aria-hidden="true" />
          Scroll to explore
        </a>
        <span className="hero-foot-note">
          Currently obsessed with CSS <span className="hl">view transitions</span>
        </span>
      </div>
    </section>
  );
}
