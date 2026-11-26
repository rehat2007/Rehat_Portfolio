"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ScrollReveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const elements = gsap.utils.toArray<HTMLElement>(".reveal");
      if (!elements.length) return;

      gsap.set(elements, { opacity: 0, y: 22 });

      ScrollTrigger.batch(elements, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
            overwrite: true,
          }),
      });

      document.fonts.ready.then(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, []);

  return null;
}
