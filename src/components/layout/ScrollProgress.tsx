"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = ref.current;
    if (!bar) return;

    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
  }, []);

  return <div className="scroll-progress" id="scroll-progress" ref={ref} aria-hidden="true" />;
}
