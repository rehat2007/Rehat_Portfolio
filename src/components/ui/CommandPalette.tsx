"use client";

import { useCallback, useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { copyText } from "@/lib/clipboard";
import { getLenis, startLenis, stopLenis } from "@/lib/lenis";
import { isExternal } from "@/lib/utils";
import { Icon } from "@/components/ui/Icons";
import { useToast } from "@/components/providers/ToastProvider";

const SECTIONS = [
  { label: "Overview", hint: "Top", hash: "#top" },
  { label: "Selected work", hint: "01", hash: "#work" },
  { label: "About", hint: "02", hash: "#about" },
  { label: "Notes", hint: "03", hash: "#writing" },
  { label: "Contact", hint: "04", hash: "#contact" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = (target?.tagName ?? "").toLowerCase();
      const editable = tag === "input" || tag === "textarea" || Boolean(target?.isContentEditable);
      const anotherDialog = Boolean(document.querySelector("dialog[open], [role='dialog']"));

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const paletteOpen = Boolean(document.querySelector(".palette"));
        if (paletteOpen) {
          setOpen(false);
          return;
        }
        if (document.querySelector("dialog[open]")) return;
        setOpen(true);
        return;
      }

      if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !editable && !anotherDialog) {
        event.preventDefault();
        setOpen(true);
      }
    };

    const onOpenRequest = () => setOpen(true);

    document.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpenRequest);
    };
  }, []);

  useEffect(() => {
    if (open) stopLenis();
    else startLenis();
    return () => startLenis();
  }, [open]);

  const closeThen = useCallback((action: () => void) => {
    setOpen(false);
    window.setTimeout(action, 120);
  }, []);

  const scrollTo = useCallback((hash: string) => {
    const target = document.querySelector(hash);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement);
    } else {
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  }, []);

  const openProject = useCallback(
    (index: number) => {
      closeThen(() => window.dispatchEvent(new CustomEvent("open-project", { detail: index })));
    },
    [closeThen]
  );

  const openNote = useCallback(
    (index: number) => {
      closeThen(() => window.dispatchEvent(new CustomEvent("open-note", { detail: index })));
    },
    [closeThen]
  );

  const copyEmail = useCallback(async () => {
    const ok = await copyText(site.profile.email);
    toast(ok ? "Email copied to clipboard" : `Could not copy — email is ${site.profile.email}`);
  }, [toast]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      contentClassName="palette"
      overlayClassName="palette-overlay"
      aria-describedby={undefined}
    >
      <div className="palette-search">
        <Icon name="search" />
        <Command.Input
          id="palette-input"
          placeholder="Jump to a section, project or link…"
          autoComplete="off"
          spellCheck={false}
        />
        <kbd>Esc</kbd>
      </div>

      <Command.List className="palette-list" aria-label="Search results">
        <Command.Empty className="palette-empty">No results.</Command.Empty>

        <Command.Group heading="Sections">
          {SECTIONS.map((section) => (
            <Command.Item
              key={section.hash}
              value={`section ${section.label} ${section.hint}`}
              className="palette-item"
              onSelect={() => closeThen(() => scrollTo(section.hash))}
            >
              <span className="palette-dot" aria-hidden="true" />
              <span>{section.label}</span>
              <span className="palette-item-hint">{section.hint}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects">
          {site.projects.map((project, index) => (
            <Command.Item
              key={project.slug}
              value={`project ${project.title} ${project.description} ${project.stack.join(" ")}`}
              className="palette-item"
              onSelect={() => openProject(index)}
            >
              <span className="palette-dot" aria-hidden="true" />
              <span>
                {project.title} — {project.description}
              </span>
              <span className="palette-item-hint">{project.category}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Notes">
          {site.writing.map((note, index) => (
            <Command.Item
              key={note.slug}
              value={`note ${note.title} ${note.category} ${note.read}`}
              className="palette-item"
              onSelect={() => openNote(index)}
            >
              <span className="palette-dot" aria-hidden="true" />
              <span>{note.title}</span>
              <span className="palette-item-hint">{note.read}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Links">
          {site.socials.map((social) => (
            <Command.Item
              key={social.label}
              value={`link ${social.label} ${social.handle}`}
              className="palette-item"
              onSelect={() =>
                closeThen(() => {
                  if (isExternal(social.url)) window.open(social.url, "_blank", "noopener,noreferrer");
                  else window.location.href = social.url;
                })
              }
            >
              <span className="palette-dot" aria-hidden="true" />
              <span>{social.label}</span>
              <span className="palette-item-hint">{social.handle}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item
            value="action toggle theme appearance"
            className="palette-item"
            onSelect={() =>
              closeThen(() => {
                setTheme(resolvedTheme === "light" ? "dark" : "light");
                toast("Theme changed");
              })
            }
          >
            <span className="palette-dot" aria-hidden="true" />
            <span>Toggle theme</span>
            <span className="palette-item-hint">Appearance</span>
          </Command.Item>

          <Command.Item
            value={`action copy email ${site.profile.email}`}
            className="palette-item"
            onSelect={() => closeThen(copyEmail)}
          >
            <span className="palette-dot" aria-hidden="true" />
            <span>Copy email address</span>
            <span className="palette-item-hint">{site.profile.email}</span>
          </Command.Item>

          <Command.Item
            value="action back to top scroll"
            className="palette-item"
            onSelect={() => closeThen(() => scrollTo("#top"))}
          >
            <span className="palette-dot" aria-hidden="true" />
            <span>Back to top</span>
            <span className="palette-item-hint">Scroll</span>
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="palette-foot">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> navigate
        </span>
        <span>
          <kbd>↵</kbd> select
        </span>
        <span>
          <kbd>esc</kbd> close
        </span>
      </div>
    </Command.Dialog>
  );
}
