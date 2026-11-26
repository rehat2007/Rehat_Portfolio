"use client";

import { useCallback, useEffect, useRef } from "react";
import { site } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { startLenis, stopLenis } from "@/lib/lenis";
import { Icon } from "@/components/ui/Icons";

type ArticleDialogProps = {
  index: number | null;
  onClose: () => void;
};

export function ArticleDialog({ index, onClose }: ArticleDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const note = index === null ? null : site.writing[index];

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

  if (!note) {
    return <dialog className="dialog article-dialog" id="article-dialog" ref={dialogRef} aria-label="Article" />;
  }

  return (
    <dialog
      className="dialog article-dialog"
      id="article-dialog"
      ref={dialogRef}
      aria-labelledby="article-dialog-title"
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
          <div className="article-head">
            <div>
              <p className="mono-label" style={{ marginBottom: "0.6rem" }}>
                Note — {note.category}
              </p>
              <h2 id="article-dialog-title">{note.title}</h2>
            </div>
            <button className="article-close" type="button" onClick={requestClose} aria-label="Close note">
              <Icon name="close" />
            </button>
          </div>
          <div className="article-body">
            <div className="article-meta">
              <span>{note.date}</span>
              <span>·</span>
              <span>{note.read} read</span>
            </div>
            {note.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="article-end">
              <span>Thanks for reading.</span>
              <button className="text-link" type="button" onClick={requestClose}>
                Close note
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
