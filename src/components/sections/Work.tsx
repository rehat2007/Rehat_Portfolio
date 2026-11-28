"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { site, type ProjectCategory } from "@/content/site";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { pad } from "@/lib/utils";
import { Icon } from "@/components/ui/Icons";
import { ProjectDialog } from "@/components/ui/ProjectDialog";

type Filter = "all" | ProjectCategory;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "All" },
  { value: "Full-stack", label: "Full-stack" },
  { value: "Marketplace", label: "Marketplace" },
  { value: "Data", label: "Data" },
  { value: "E-commerce", label: "E-commerce" },
];

const GITHUB_URL =
  site.socials.find((social) => social.label === "GitHub")?.url ?? "https://github.com";

export function Work() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewVisible = useRef(false);
  const previewIndexRef = useRef(0);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const visibleProjects = site.projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === "all" || project.category === filter);

  const previewProject = site.projects[previewIndex];

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>(".project-row", list);
        if (!rows.length) return;

        gsap.set(rows, { opacity: 0, y: 18 });
        ScrollTrigger.batch(rows, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: listRef, dependencies: [filter] }
  );

  useEffect(() => {
    if (!finePointer || reduceMotion) return;
    const preview = previewRef.current;
    if (!preview) return;

    gsap.set(preview, { xPercent: 0, yPercent: 0, autoAlpha: 0, scale: 0.94 });
    xTo.current = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3" });
    yTo.current = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3" });
  }, [finePointer, reduceMotion]);

  const hidePreview = useCallback(() => {
    if (!previewVisible.current) return;
    previewVisible.current = false;
    if (previewRef.current) {
      gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.94, duration: 0.2, overwrite: true });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", hidePreview, { passive: true });
    return () => window.removeEventListener("scroll", hidePreview);
  }, [hidePreview]);

  useEffect(() => {
    const onOpenProject = (event: Event) => {
      setOpenIndex((event as CustomEvent<number>).detail);
    };
    window.addEventListener("open-project", onOpenProject);
    return () => window.removeEventListener("open-project", onOpenProject);
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer || reduceMotion) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>(".project-row");
    const preview = previewRef.current;
    if (!target || !preview) return;

    const nextIndex = Number(target.dataset.index);
    if (Number.isFinite(nextIndex) && nextIndex !== previewIndexRef.current) {
      previewIndexRef.current = nextIndex;
      setPreviewIndex(nextIndex);
    }

    if (!previewVisible.current) {
      previewVisible.current = true;
      gsap.set(preview, { x: event.clientX + 26, y: event.clientY + 22 });
      gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.28, overwrite: true });
    }

    const width = preview.offsetWidth || 330;
    const height = preview.offsetHeight || 250;
    xTo.current?.(gsap.utils.clamp(14, window.innerWidth - width - 14, event.clientX + 26));
    yTo.current?.(gsap.utils.clamp(14, window.innerHeight - height - 14, event.clientY + 22));
  };

  return (
    <section className="section work" id="work">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label reveal">
              <span>01</span> Selected work
            </p>
            <h2 className="reveal">
              Things I&rsquo;ve built
              <br />
              <em>recently</em>.
            </h2>
          </div>
          <p className="section-lead reveal">
            A few full-stack products and front-end builds from the last year. Click any row for the
            story behind it.
          </p>
        </header>

        <div className="work-toolbar reveal">
          <div className="filters" role="group" aria-label="Filter projects by type">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                className={`filter${filter === item.value ? " is-active" : ""}`}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => {
                  hidePreview();
                  setFilter(item.value);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="work-count mono" id="project-count" aria-live="polite">
            {pad(visibleProjects.length)} {visibleProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <div
          className="project-list"
          id="project-list"
          ref={listRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={hidePreview}
        >
          {visibleProjects.map(({ project, index }) => (
            <button
              key={project.slug}
              className="project-row"
              type="button"
              data-index={index}
              data-category={project.category}
              aria-label={`Open case study: ${project.title}`}
              onClick={() => {
                hidePreview();
                setOpenIndex(index);
              }}
            >
              <span className="project-index">{project.index}</span>
              <span className="project-main">
                <span className="project-title">
                  {project.title}
                  <span className="project-year">{project.year}</span>
                </span>
                <span className="project-desc">{project.description}</span>
              </span>
              <span className="project-tags">
                {project.stack.slice(0, 3).map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </span>
              <span className="project-arrow">
                <Icon name="arrowUpRight" />
              </span>
            </button>
          ))}
        </div>

        <div className="work-foot reveal">
          <p className="mono">
            More work lives on{" "}
            <a className="text-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
          <a className="text-link work-foot-cta" href={`mailto:${site.profile.email}`}>
            Request the full archive
          </a>
        </div>
      </div>

      <div
        className="project-preview"
        id="project-preview"
        ref={previewRef}
        aria-hidden="true"
        style={
          {
            "--pa": previewProject.colors[0],
            "--pb": previewProject.colors[1],
          } as CSSProperties
        }
      >
        <div className="preview-art">
          <span className="preview-orb" />
        </div>
        <div className="preview-top">
          <span className="preview-index">{previewProject.index}</span>
          <span className="preview-year">{previewProject.year}</span>
        </div>
        <div className="preview-title">{previewProject.title}</div>
        <span className="preview-cta">
          View case study
          <Icon name="arrowUpRight" />
        </span>
      </div>

      <ProjectDialog index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}
