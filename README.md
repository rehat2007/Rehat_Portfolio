# Rehat Islam Addit — Portfolio

A Next.js 16 / React 19 portfolio built from the “Interfaces that feel alive” UI. The original reference lives in `C:\web_dev\portfolio_ui`; the full analysis and build plan lives in [`CLONE_GUIDE.md`](./CLONE_GUIDE.md).

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## What’s included

- **Next.js App Router** with server-rendered sections and client interaction leaves.
- **GSAP** for the hero entrance, scroll reveals, counters, 3D card tilt, cursor-following project preview, and scroll progress.
- **Lenis** for smooth scrolling, with anchor offsets synchronized to the fixed header.
- **cmdk** command palette (`Ctrl/⌘ K` or `/`) covering sections, projects, notes, links, and actions.
- **next-themes** dark/light/system theme with no-flash initialization and `?theme=light|dark` overrides.
- Native `<dialog>` case-study and note readers with focus trapping, Escape/backdrop close, and exit animation.
- Project filtering, animated counters, live local clock, copy-email toast, responsive mobile menu.
- Self-hosted fonts via `next/font`: Inter Tight, Instrument Serif, JetBrains Mono.
- Metadata, JSON-LD, Open Graph image, robots, sitemap, favicon.
- Reduced-motion and no-JS fallbacks.

## Structure

```text
src/
├─ app/                 # layout, page, metadata routes
├─ components/
│  ├─ layout/           # header, footer, grain, progress, smooth scroll
│  ├─ sections/         # hero, work, about, notes, playground, contact
│  ├─ ui/               # dialogs, palette, clock, icons, social links
│  ├─ providers/        # theme and toast
│  └─ motion/           # global scroll reveal hook
├─ content/site.ts      # typed content model
├─ hooks/               # local time, active section, media query
├─ lib/                 # GSAP, Lenis, clipboard, utils
└─ styles/portfolio.css # ported reference design system
```

## Content

Profile data (name, role, email, location, timezone, and social links) lives in `src/content/site.ts`. `siteUrl` in the same file controls the canonical domain used by metadata, JSON-LD, robots, and the sitemap, so set it to the deployed domain before publishing.

The projects, notes, and experiments are sample content in `site.ts` - replace them with your own work. Social profile URLs currently follow the `@additisla` handle; verify them before launch.
