"use client";

import { useCallback, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { startLenis, stopLenis } from "@/lib/lenis";
import { pad } from "@/lib/utils";
import { Icon } from "@/components/ui/Icons";

type ProjectDialogProps = {
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function ProjectDialog({ index, onClose, onNavigate }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const project = index === null ? null : site.projects[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (index === null) {
      if (dialog.open) dialog.close();
      startLenis();
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
      stopLenis();
    }

    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 18, scale: 0.985, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [index]);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
      startLenis();
    };
  }, []);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const dialog = dialogRef.current;
    const card = cardRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      closingRef.current = false;
      if (dialog?.open) dialog.close();
      onClose();
      startLenis();
    };

    if (reduce || !card) {
      finish();
      return;
    }

    gsap.to(card, {
      y: 18,
      scale: 0.985,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: finish,
    });
  }, [onClose]);

  const navigate = (delta: number) => {
    if (index === null) return;
    const next = (index + delta + site.projects.length) % site.projects.length;
    onNavigate(next);
  };

  if (!project) {
    return <dialog className="dialog project-dialog" id="project-dialog" ref={dialogRef} aria-label="Project case study" />;
  }

  return (
    <dialog
      className="dialog project-dialog"
      id="project-dialog"
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) requestClose();
      }}
    >
      <div className="dialog-card" ref={cardRef}>
        <div className="dialog-scroll" ref={scrollRef}>
          <div
            className="dialog-hero"
            style={
              {
                "--pa": project.colors[0],
                "--pb": project.colors[1],
              } as CSSProperties
            }
          >
            <div className="dialog-hero-top">
              <span>
                {project.index} — {project.category}
              </span>
              <button className="dialog-close" type="button" onClick={requestClose} aria-label="Close case study">
                <Icon name="close" />
              </button>
            </div>
            <div className="dialog-hero-bottom">
              <h2 id="project-dialog-title">{project.title}</h2>
              <span className="dialog-year">{project.year}</span>
            </div>
          </div>

          <div className="dialog-body">
            <p className="dialog-lede">{project.longDescription}</p>

            <div className="dialog-links">
              <a
                className="dialog-link dialog-link--primary"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live site</span>
                <Icon name="arrowUpRight" />
              </a>
              {project.repos.map((repo) => (
                <a
                  className="dialog-link"
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{repo.label}</span>
                  <Icon name="arrowUpRight" />
                </a>
              ))}
            </div>

            <div className="dialog-meta">
              <div>
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>Year</span>
                <strong>{project.year}</strong>
              </div>
              <div>
                <span>Stack</span>
                <strong>{project.stack.join(", ")}</strong>
              </div>
            </div>

            <h3 className="dialog-section-title">What I did</h3>
            <ul className="dialog-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="dialog-nav">
              <button type="button" onClick={() => navigate(-1)}>
                ← Previous
              </button>
              <span className="dialog-counter">
                {project.index} / {pad(site.projects.length)}
              </span>
              <button type="button" onClick={() => navigate(1)}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
