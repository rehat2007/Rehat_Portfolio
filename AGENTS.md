<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo guide

Single-page portfolio: Next.js 16.4 App Router, React 19, strict TypeScript. The production build prerenders every route; there is no backend, database, auth, or env var.

## Verify

- `npm run dev` — Turbopack dev server on port 3000.
- `npm run lint` — ESLint flat config over the whole repo.
- `npx tsc --noEmit` — there is no `typecheck` script.
- `npm run build` — the complete check; also renders the OG image, robots, and sitemap.
- Finish with `npm run lint && npx tsc --noEmit && npm run build`.
- There is no test script, test runner, or CI (Playwright was removed). Don't assume `npm test` exists.

## Structure and styling

- `src/app/page.tsx` is a server component composing the sections; interactive sections are `"use client"`.
- `src/content/site.ts` is the typed content source for projects, notes, experience, stats, and socials.
- Nearly all design/CSS lives in `src/styles/portfolio.css`; `globals.css` only imports Tailwind and that file. Keep the existing class names — no Tailwind utility classes are used in the codebase.
- `next.config.ts` sends every CSS file through the `@tailwindcss/turbopack` loader. Keep that rule and the `@import "tailwindcss"` line; Tailwind v4 is configured here, not via PostCSS.
- Theme state is `html[data-theme]`, managed by next-themes (`ar-theme`); `?theme=light|dark` is applied after hydration. Both palettes are CSS variables in `portfolio.css`.

## Interaction gotchas

- Import GSAP through `src/lib/gsap.ts` only, from client code. Use `MOTION_OK` / `FINE_POINTER` with `gsap.matchMedia()`, and leave hover/ambient animation to CSS so the two don't fight over transforms.
- Lenis is a singleton in `src/lib/lenis.ts`; dialogs and the palette must call `stopLenis()` / `startLenis()`. `SmoothScroll` intercepts in-page `#` anchor clicks itself (`anchors: false`).
- Components communicate through window CustomEvents: `open-palette`, `open-project`, `open-note`. Rename producer and listener together.
- `.reveal` elements are collected once by `ScrollReveals` at mount. Content swapped in later needs its own batch (see the filter dependency in `Work`). Keep `.reveal` free of CSS opacity/transitions so no-JS users still see content.
- Dialogs are native `<dialog>` with an animated inner `.dialog-card`; use `showModal()`, animate the card rather than the dialog, and mirror `ProjectDialog`'s Escape/backdrop handling and Lenis stop/start.

## Content and personalization

- Identity lives in `site.profile` and is consumed by the header, hero, about, contact, footer, clock, metadata, OG image, and JSON-LD. Keep it that way instead of hard-coding names or locations in components.
- `siteUrl` in `src/content/site.ts` is the single source for `metadataBase`, JSON-LD, robots, and the sitemap. It is currently `https://additisla.dev`; replace it with the deployed domain before launch.
- Projects, experience, notes, and experiments are sample content in `site.ts` (experience is one generic entry). Replace them with real work. Social URLs assume the `@additisla` handle and should be verified.
- `CLONE_GUIDE.md` is the original port plan and design analysis, not a description of current behavior (for example, it recommends a dark default while the code uses system). `C:\web_dev\portfolio_ui` is the static reference site.
