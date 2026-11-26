import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

export function stopLenis() {
  instance?.stop();
}

export function startLenis() {
  instance?.start();
}
