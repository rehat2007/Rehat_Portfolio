"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export function Counter({ value, suffix = "", className }: CounterProps) {
  const scopeRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = valueRef.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { n: 0 };
        el.textContent = "0";

        gsap.to(state, {
          n: value,
          duration: 1.3,
          ease: "power3.out",
          snap: { n: 1 },
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(state.n));
          },
          onComplete: () => {
            el.textContent = String(value);
          },
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: [value, suffix] }
  );

  return (
    <span ref={scopeRef} className={className}>
      <span ref={valueRef}>{value}</span>
      {suffix ? <span className="stat-suffix">{suffix}</span> : null}
    </span>
  );
}
