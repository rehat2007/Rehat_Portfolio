"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({ ease: "power3.out", duration: 0.8 });

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(pointer: fine)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
