"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Icon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SocialIconLinks } from "@/components/ui/SocialLinks";

const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "writing", label: "Notes" },
  { id: "play", label: "Playground" },
  { id: "contact", label: "Contact" },
];

const NAV_IDS = NAV.map((item) => item.id);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const active = useActiveSection(NAV_IDS);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      ticking = false;
    };
    const onScrollRequest = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    };

    onScroll();
    window.addEventListener("scroll", onScrollRequest, { passive: true });
    return () => window.removeEventListener("scroll", onScrollRequest);
  }, []);

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent) ? "⌘ K" : "Ctrl K");
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
      wasOpen.current = true;
      window.requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLElement>("a")?.focus();
      });
    } else {
      document.body.classList.remove("menu-open");
      if (wasOpen.current) {
        wasOpen.current = false;
        toggleRef.current?.focus();
      }
    }

    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 940) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`} id="site-header">
      <div className="container header-inner">
        <a className="logo" href="#top">
          <span className="logo-mark" aria-hidden="true">
            a
          </span>
          <span className="logo-text" aria-hidden="true">
            alex rivera<span className="logo-dot">.</span>
          </span>
          <span className="sr-only">{site.profile.name} — home</span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <a
              key={item.id}
              className="nav-link"
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />

          <button
            className="palette-trigger"
            id="palette-trigger"
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-palette"))}
          >
            <span className="sr-only">Open command menu</span>
            <Icon name="search" />
            <span className="palette-trigger-label" aria-hidden="true">
              Jump to
            </span>
            <kbd className="palette-kbd" data-shortcut aria-hidden="true">
              {shortcut}
            </kbd>
          </button>

          <button
            className="menu-toggle"
            ref={toggleRef}
            id="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu${open ? " is-open" : ""}`}
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {NAV.map((item, index) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <a className="text-link" href={`mailto:${site.profile.email}`}>
            {site.profile.email}
          </a>
          <SocialIconLinks className="mobile-socials" />
        </div>
      </div>
    </header>
  );
}
