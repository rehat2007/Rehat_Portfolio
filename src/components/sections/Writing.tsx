"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { pad } from "@/lib/utils";
import { Icon } from "@/components/ui/Icons";
import { ArticleDialog } from "@/components/ui/ArticleDialog";

export function Writing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const onOpenNote = (event: Event) => {
      setOpenIndex((event as CustomEvent<number>).detail);
    };
    window.addEventListener("open-note", onOpenNote);
    return () => window.removeEventListener("open-note", onOpenNote);
  }, []);

  return (
    <section className="section writing" id="writing">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label reveal">
              <span>03</span> Notes
            </p>
            <h2 className="reveal">
              Thinking
              <br />
              <em>out loud</em>.
            </h2>
          </div>
          <p className="section-lead reveal">
            Practical notes on building full-stack products &mdash; APIs, databases, auth, and the details
            that keep features shipping.
          </p>
        </header>

        <div className="notes-grid">
          {site.writing.map((note, index) => (
            <button
              className="note-card reveal"
              type="button"
              key={note.slug}
              data-note={index}
              style={{ "--d": index % 2 } as CSSProperties}
              aria-label={`Read note: ${note.title}`}
              onClick={() => setOpenIndex(index)}
            >
              <span className="note-meta">
                <span className="note-cat">{note.category}</span>
                <span>{note.date}</span>
                <span>·</span>
                <span>{note.read}</span>
              </span>
              <span className="note-title">{note.title}</span>
              <span className="note-excerpt">{note.excerpt}</span>
              <span className="note-foot">
                <span>Note {pad(index + 1)}</span>
                <span className="note-read">
                  Read note <Icon name="arrowRight" />
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="notes-foot reveal">
          <p className="mono">New notes land roughly once a month.</p>
          <a className="text-link" href="#contact">
            Suggest a topic
          </a>
        </div>
      </div>

      <ArticleDialog index={openIndex} onClose={() => setOpenIndex(null)} />
    </section>
  );
}
