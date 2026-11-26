# Clone Guide — “Interfaces that feel alive”

Reference site: `C:\web_dev\portfolio_ui`
- `index.html` — 481 lines
- `styles.css` — 2,302 lines
- `app.js` — 1,027 lines
- `data.js` — 269 lines

Target: `C:\web_dev\portfolio` (Next.js 16.4.6, React 19.3, TypeScript, Tailwind v4)

---

## 1. Executive summary

This is a **single-page editorial portfolio** with a fictional persona, “Alex Rivera”. It has no images and no third-party libraries — every visual (orbs, grain, project previews, playground art) is CSS, SVG, or DOM.

The design is strong because of four things:

1. **Typography contrast** — Inter Tight for UI, Instrument Serif italic for expressive emphasis, JetBrains Mono for metadata.
2. **A tight palette** — warm near-black surfaces, off-white text, acid-lime accent, violet secondary.
3. **Micro-interactions everywhere** — magnetic-ish hovers, cursor-following project preview, 3D card tilt, accordion, command palette, dialogs.
4. **Restraint** — motion is mostly 200–800 ms, with one strong hero moment and ambient CSS loops.

### Recommended clone strategy

Do **not** redesign it. Port it in this order:

1. Port the design tokens, reset, and almost all of `styles.css` first (highest fidelity, least effort).
2. Convert the HTML into React section components.
3. Convert `data.js` into a typed `site.ts`.
4. Replace DOM manipulation (`app.js`) with React state, refs, and effects.
5. Add GSAP for **scroll reveals, hero entrance, counters, tilt, cursor preview, scroll progress, and dialog/accordion transitions**.
6. Keep CSS for **hover states, ambient loops, marquee, grain, and reduced-motion fallbacks**.
7. Improve what the original does not do well: font self-hosting, metadata/SEO, focus management, no-JS resilience, and deep-linkable case studies.

Doing this gets a pixel-close clone in roughly **4–7 focused days** instead of rebuilding from scratch.

---

## 2. Deep analysis of the reference

### 2.1 Visual language

| Token | Value |
|---|---|
| Background | `#08090a` (near-black, slightly warm) |
| Elevated surface | `#0c0d0f` / `#111214` / `#17181b` |
| Text | `#f4f3ef` |
| Soft text | `#c6c5be` |
| Muted text | `#8b8b84` |
| Lines | `rgba(255,255,255,.09)` / `.18` |
| Accent | `#c9f75a` acid lime |
| Accent ink | `#0b0d06` |
| Violet | `#a78bfa` |
| Hero gradient | lime → mint → violet |
| Radius | 18px / 26px |
| Max width | 1180px |
| Header | 72px |
| Easing | `cubic-bezier(.16, 1, .3, 1)` |
| Spring easing | `cubic-bezier(.34, 1.56, .64, 1)` |

Light theme is a warm paper palette:
- background `#f5f2ea`, surface `#fffdf7`, text `#13140f`
- accent text becomes darker `#4d6b00` for contrast
- gradient becomes `#5d8200 → #237a5c → #6d4bd1`

Typography:
- **Inter Tight** 300/400/500/600
- **Instrument Serif** 400 normal + italic
- **JetBrains Mono** 400/500
- H1: `clamp(3.05rem, 7.4vw, 6.15rem)`, line-height `.94`, letter-spacing `-.045em`
- H2: `clamp(2.2rem, 4.6vw, 3.65rem)`, line-height `1.02`
- Mono labels: ~`.66rem`, uppercase, wide tracking

Visual devices:
- fixed animated film grain over the entire page at 5–6% opacity
- large blurred lime/violet blobs behind the hero
- faint 96px grid masked radially
- 1px hairline borders instead of shadows
- radial spotlight following the pointer in the hero
- profile card with a 3D tilt, conic-gradient avatar, dotted texture, orbit ring
- alternating serif italic words inside sans headlines
- all caps mono metadata creating an “engineer’s notebook” feel

### 2.2 Page anatomy

| # | Section | What it contains | Key interactions |
|---|---|---|---|
| — | Header | logo, nav, theme toggle, command trigger, mobile menu | blur after 8px scroll, active nav, Ctrl/⌘K, `/` |
| 1 | Hero | kicker, H1, intro, CTAs, socials, profile card, scroll cue | entrance, spotlight, 3D tilt, orbit spin, live clock, ambient blobs |
| — | Marquee | duplicated tech list | infinite 38s loop, pause on hover |
| — | Stats | 4 counters | count up at 20% visibility |
| 2 | Work | 6 projects, filters, count, preview | hover preview follows cursor, filter by category, case-study dialog with prev/next |
| 3 | About | 3 paragraphs, signature, toolkit chips, sticky Now card, experience accordion | sticky card, accordion, reveal |
| 4 | Notes | 4 article cards | article dialog |
| 5 | Playground | 4 experiment cards with CSS art | hover art transforms, external links |
| 6 | Contact | email, copy button, socials, local time | copy + toast, live clock |
| — | Footer | copyright, clock, back-to-top | smooth scroll |
| — | Global | project dialog, article dialog, command palette, toast | native `<dialog>`, keyboard navigation |

### 2.3 Complete motion inventory

This is the list to reproduce. Note which ones should be GSAP and which should stay CSS.

| Effect | Original implementation | Recommendation |
|---|---|---|
| Section reveal | IntersectionObserver adds `.in-view`; CSS 800ms opacity + translateY(22px), 70ms stagger via `--d` | **GSAP ScrollTrigger** batch or per-element `from` |
| Stat counters | rAF + cubic ease-out, 1.3s, trigger at 20% | **GSAP** `to` + `snap` + ScrollTrigger |
| Hero entrance | CSS delay stagger | **GSAP timeline** + SplitText lines |
| Blob drift | CSS 22s/26s alternate | **CSS** (cheaper) or GSAP yoyo |
| Orbit spin | CSS 34s linear | **CSS** |
| Marquee | CSS 38s, duplicated group, translateX(-50%) | **CSS**; pause on hover |
| Scroll progress bar | rAF + `scaleX` | **GSAP** ScrollTrigger `onUpdate` |
| Header blur | class toggle at `scrollY > 8` | ScrollTrigger or scroll listener |
| Active nav | IntersectionObserver, rootMargin `-42% 0 -52% 0` | IO or ScrollTrigger |
| 3D card tilt | mouse position → CSS vars `--rx/--ry`, max 9deg | **GSAP quickTo** rotationX/Y |
| Hero spotlight | follow mouse, radial gradient | **GSAP quickTo** x/y |
| Project preview | rAF lerp (`0.2`), clamp to viewport, scale/opacity | **GSAP quickTo** x/y + content crossfade |
| Project row hover | CSS background scaleY, padding shift, arrow rotate | **CSS**; GSAP only for entrance |
| Filters | toggle `hidden` attr | React state; optional GSAP Flip for reflow |
| Accordion | CSS grid `0fr → 1fr`, 450ms | **CSS** (robust); GSAP height optional |
| Dialogs | native `<dialog>` + CSS keyframe in | **GSAP in, animate out**, native dialog |
| Command palette | hand-rolled filtering + keyboard | **cmdk** + native dialog |
| Toast | CSS opacity/translate | React state + GSAP or CSS |
| Theme switch | 450ms global color transition class | CSS transitions or View Transitions |
| Playground art | CSS keyframes (squish, grain, hue drift, type slide) | **CSS** |
| Reduced motion | global CSS + JS checks | GSAP `matchMedia` + CSS media query |

### 2.4 Layout and responsive behavior

- Container: `width: min(1180px, 100% - 2 * gutter)` with gutter `clamp(1.15rem, 4.5vw, 3.5rem)`.
- Header fixed, 72px; anchor offset via `scroll-padding-top`.
- Breakpoints and changes:

| Breakpoint | Changes |
|---|---|
| `max-width: 1080px` | hero columns 1.2/0.8, narrower preview tags, timeline columns |
| `max-width: 940px` | desktop nav hidden, menu toggle shown, hero single column, section head single column, about/contact single column, project preview hidden, project tags hidden |
| `max-width: 760px` | stats 2×2, notes/playground 1 column, timeline simplified, footer stacked, dialog meta 1 column |
| `max-width: 520px` | logo text hidden, palette compact, H1 smaller, buttons full width, profile tags hidden, copy button icon-only, toast full width |

- Mobile menu uses `100svh - header`, `inert` when closed, body scroll lock.
- Sticky Now card becomes static below 940px.

### 2.5 Z-index map

| Layer | z-index |
|---|---|
| Header | 60 |
| Grain | 70 |
| Scroll progress | 90 |
| Toast | 120 |
| Project preview | 55 |
| Dialogs / palette | native top layer |
| Skip link | 200 |

### 2.6 Accessibility the original gets right

- Skip link.
- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- One H1, section H2s.
- Native `<dialog>` for modals (top layer, Escape, focus trap).
- `aria-expanded`, `aria-controls`, `aria-hidden` on accordion/menu.
- `aria-pressed` on filters.
- `aria-current` on active nav.
- `role="listbox"` / `role="option"` on the palette.
- Visible focus rings (`:focus-visible`).
- Decorative elements marked `aria-hidden`.
- Reduced-motion media query and JS checks.
- `<noscript>` fallback that reveals content.

### 2.7 Accessibility gaps to fix in the clone

- The palette is a hand-rolled listbox; **use `cmdk`** (accessible combobox/listbox behavior, filtering, roving focus).
- Dialog close animation is absent; the dialog disappears instantly. Add an exit animation and then `dialog.close()`.
- Restore focus explicitly after filters/dialogs/palette; native dialog usually does, but don’t rely on it blindly.
- Announce filter result count with `aria-live="polite"`.
- `aria-hidden` must not be applied to focusable panels; use `inert` when closed.
- The mobile menu toggles `inert` correctly, but focus should move into the menu on open and return to the toggle on close.
- Add `aria-labelledby` to dialogs rather than only `aria-label`.
- Ensure the copy-email toast is announced (`role="status" aria-live="polite"` — original has this).
- Check light-theme accent contrast (`#4d6b00` on `#f5f2ea` is good; the lime accent itself is not text-safe on light).
- `overflow-x: hidden` on `body` can break `position: sticky`; use `overflow-x: clip` in the clone.

### 2.8 Performance observations

- Very light: no images, no dependencies, inline SVG icons.
- Google Fonts is the only network request; replace with `next/font` for self-hosting and zero layout shift.
- Large blurred blobs (`filter: blur(90px)`, up to 640px) can be expensive on low-end mobile. Keep them but reduce size/blur on small screens or replace with a static radial gradient.
- Fixed grain overlay is cheap because it uses a repeating background image, but keep `pointer-events: none`.
- Animating `height` and `filter` is costly; the accordion already uses grid rows. Keep that.
- A single 64KB CSS file is fine for a clone, but split by section once stable.
- GSAP + ScrollTrigger + SplitText + Lenis adds roughly 50–80KB gzipped; acceptable for this design. Do not import Three.js unless you actually add a 3D scene.

### 2.9 Original issues / quirks worth fixing

- Content stats live in `index.html`, while the rest lives in `data.js`; centralize all content in `site.ts`.
- `data-count` values (8, 34, 6, 12) are different from the screenshot mid-animation; don’t copy a mid-animation frame.
- Project filter uses `hidden`, so there is no exit animation; optional GSAP Flip can improve it.
- The floating preview uses hard-coded `330×250` clamping; in React measure the element.
- Theme initialization runs twice (inline script + `initTheme`); harmless but redundant.
- `html:has(dialog[open]) { overflow: hidden }` is good, but with Lenis you must also stop Lenis when a dialog opens.
- The command palette uses `window.setTimeout(..., 90)` after close before opening a dialog; in React, sequence state updates instead.
- Project/note dialogs are not URL-addressable. For the clone, consider adding `/work/[slug]` and `/notes/[slug]` plus intercepting routes later.
- The site is a fictional persona with placeholder social URLs; replace before publishing.

---

## 3. Recommended stack

### Core

| Package | Purpose |
|---|---|
| `gsap` | animation engine |
| `@gsap/react` | `useGSAP` hook with automatic cleanup |
| `lenis` | optional smooth scrolling |
| `cmdk` | accessible command palette |
| `next-themes` | theme persistence + no-flash script |

```bash
npm i gsap @gsap/react lenis cmdk next-themes
```

GSAP 3.13+ makes all plugins free (including ScrollTrigger, SplitText, Flip, ScrollSmoother). Verify the license/version you install. You do **not** need a club membership for SplitText on current versions.

### Optional, only if the design grows

| Package | Use |
|---|---|
| `motion` (Framer Motion successor) | shared layout animations, `AnimatePresence`, gesture-driven UI |
| `three`, `@react-three/fiber`, `@react-three/drei` | a real 3D hero or project visual |
| `ogl` | tiny WebGL renderer if you want raw shaders |
| `@radix-ui/react-dialog` or Base UI | accessible primitives if you move away from native `<dialog>` |
| `auto-animate` | zero-config list/grid transitions |
| `theatre.js` | choreographed 3D sequences |
| `next-view-transitions` | native page transitions in App Router |

### Recommendation

Start with **GSAP + ScrollTrigger + SplitText + Lenis + cmdk + next-themes**. That covers 100% of this reference. Add Motion only for layout transitions if you find yourself fighting GSAP for React state-driven animations, and add Three.js only if you replace the CSS art with actual 3D.

Do **not** use Locomotive Scroll or Barba.js with Next.js — Lenis + App Router is simpler and better maintained.

---

## 4. Target architecture

```text
portfolio/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # fonts, metadata, providers, shell
│  │  ├─ page.tsx                # server composition of sections
│  │  ├─ globals.css             # tokens, reset, base, shared keyframes
│  │  ├─ icon.svg                # favicon
│  │  └─ opengraph-image.tsx     # optional
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ SiteHeader.tsx
│  │  │  ├─ MobileMenu.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Grain.tsx
│  │  │  ├─ ScrollProgress.tsx
│  │  │  └─ SmoothScroll.tsx
│  │  ├─ sections/
│  │  │  ├─ Hero.tsx
│  │  │  ├─ Marquee.tsx
│  │  │  ├─ Stats.tsx
│  │  │  ├─ Work.tsx
│  │  │  ├─ About.tsx
│  │  │  ├─ Writing.tsx
│  │  │  ├─ Playground.tsx
│  │  │  └─ Contact.tsx
│  │  ├─ ui/
│  │  │  ├─ Reveal.tsx
│  │  │  ├─ Counter.tsx
│  │  │  ├─ TiltCard.tsx
│  │  │  ├─ ProjectPreview.tsx
│  │  │  ├─ ProjectDialog.tsx
│  │  │  ├─ ArticleDialog.tsx
│  │  │  ├─ CommandPalette.tsx
│  │  │  ├─ Toaster.tsx
│  │  │  ├─ Clock.tsx
│  │  │  ├─ SocialLinks.tsx
│  │  │  └─ Icons.tsx
│  │  └─ providers/
│  │     ├─ ThemeProvider.tsx
│  │     └─ ToastProvider.tsx
│  ├─ content/
│  │  └─ site.ts                 # typed version of data.js + stats + hero copy
│  ├─ hooks/
│  │  ├─ useActiveSection.ts
│  │  ├─ useLocalTime.ts
│  │  └─ useMediaQuery.ts
│  ├─ lib/
│  │  ├─ gsap.ts                 # register plugins once
│  │  └─ utils.ts
│  └─ styles/
│     ├─ tokens.css
│     ├─ base.css
│     └─ sections/*.module.css
├─ public/
└─ ...
```

### Server vs client boundaries

Keep as much as possible server-rendered:

| Area | Server or client | Why |
|---|---|---|
| `layout.tsx`, `page.tsx` | Server | metadata, composition |
| Hero copy/markup | Server wrapper | SEO |
| Hero effects | Client child (`HeroMotion`) | pointer/GSAP |
| Marquee | Server | pure CSS |
| Stats values | Server | content |
| Counters | Client leaf | GSAP |
| Work list | Client | filter state, dialog, preview |
| About copy / Now card | Server | static content |
| Experience accordion | Client | open state |
| Writing cards | Client | dialog state (or server cards + client dialog) |
| Playground | Server | CSS art, links |
| Contact | Client | copy, clock |
| Header / menu / palette / toast | Client | global interaction |
| Footer | Client leaf for clock/back-to-top | time + scroll |

A server-rendered page can wrap client components (`Reveal`) around server-rendered children. That is fine: the children stay server-rendered; only the wrapper hydrates.

### Content model (`src/content/site.ts`)

```ts
export type ProjectCategory = "Web app" | "3D & motion" | "Open source";

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  longDescription: string;
  role: string;
  stack: string[];
  highlights: string[];
  colors: [string, string];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
}

export interface Note {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
  excerpt: string;
  body: string[];
}

export interface Experiment {
  title: string;
  blurb: string;
  tags: string[];
  art: "dots" | "type" | "grain" | "squish";
  url: string;
}

export const site = {
  profile: {
    name: "Alex Rivera",
    initials: "AR",
    role: "Frontend engineer & creative developer",
    email: "hello@alexrivera.dev",
    location: "Lisbon, Portugal",
    timezone: "Europe/Lisbon",
    handle: "@alexrivera",
  },
  socials: [
    { label: "GitHub", handle: "@alexrivera", url: "https://github.com", icon: "github" as const },
    // ...
  ],
  stats: [
    { value: 8, suffix: "+", label: "Years shipping" },
    { value: 34, suffix: "", label: "Products launched" },
    { value: 6, suffix: "", label: "OSS libraries" },
    { value: 12, suffix: "", label: "Awards & features" },
  ],
  projects: [
    {
      slug: "orbital",
      index: "01",
      title: "Orbital",
      category: "3D & motion",
      year: "2026",
      description: "A real-time 3D analytics canvas for satellite fleets.",
      longDescription: "Orbital gives mission operators...",
      role: "Design & engineering",
      stack: ["Three.js", "WebGL", "TypeScript", "Web Workers"],
      highlights: [
        "Rendered 12,000 orbital objects at 60fps...",
        "Built a timeline scrubber...",
        "Shipped the design system...",
      ],
      colors: ["#d9ff7a", "#7ef0d0"],
    },
    // ...
  ],
  experience: [/* ... */],
  writing: [/* ... */],
  experiments: [/* ... */],
} satisfies Record<string, unknown>;
```

Better: define a `Site` interface and use `satisfies Site`. Keep colors as a tuple so `project.colors[0]` is typed.

Add `stats` and hero copy to this file so there is one source of truth. Add `slug` to projects and notes now, even if dialogs are used first.

---

## 5. Step-by-step build plan

### Phase 0 — Freeze the reference and define “done” (30–60 min)

1. Keep `C:\web_dev\portfolio_ui` untouched as the reference.
2. Capture screenshots at 1440, 1024, 768, 390, in both themes, plus the palette and both dialogs.
3. Write a one-page checklist:
   - pixel parity of the 6 sections
   - all 12 interactions
   - both themes
   - keyboard-only flow
   - reduced-motion flow
   - Lighthouse ≥ 95 on performance/accessibility/best practices/SEO
4. Replace fictional content only after the UI is stable (otherwise you will chase two moving targets).

### Phase 1 — Install and configure (15 min)

The Next app already exists. Add the animation/interaction dependencies:

```bash
npm i gsap @gsap/react lenis cmdk next-themes
```

Optional now, not required for v1:

```bash
npm i three @react-three/fiber @react-three/drei
```

Do not install Framer Motion and GSAP at the same time unless you have a clear division of labor. Two animation systems both owning transforms is a recipe for bugs.

### Phase 2 — Port design tokens and global CSS (2–4 h)

1. Create `src/styles/tokens.css` and `src/styles/base.css`.
2. Copy `:root` and `html[data-theme="light"]` from the reference `styles.css` (lines 7–63).
3. Copy the reset/base rules (lines 65–127), utilities (129–206), grain/progress (208–228), and shared keyframes (2122–2175).
4. Keep the original class names initially. Do not rename while porting; rename later only if it buys clarity.
5. Import tokens/base in `src/app/globals.css`:

```css
@import "tailwindcss";
@import "../styles/tokens.css";
@import "../styles/base.css";
```

6. Keep `@theme inline` for Tailwind only if you actually use Tailwind utilities. Otherwise remove the Tailwind import to reduce noise. CSS Modules are recommended for section styles; converting 2,300 lines to Tailwind is high effort and risks losing the original’s detail.

7. Fix `body { overflow-x: hidden }` to `overflow-x: clip` to avoid breaking sticky positioning.

Font variables: the original uses `--font-sans`, `--font-serif`, `--font-mono`. With `next/font`, map them like this:

```tsx
// src/app/layout.tsx
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

Then in tokens:

```css
:root {
  --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-instrument-serif), Georgia, serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}
```

Apply all three `variable` classes to `<html>`.

### Phase 3 — Metadata, favicon, theme (2–3 h)

`layout.tsx` skeleton:

```tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Rivera — Frontend Engineer & Creative Developer",
  description:
    "Portfolio of Alex Rivera, a frontend engineer and creative developer building fast, tactile interfaces for the web.",
  metadataBase: new URL("https://alexrivera.dev"),
  openGraph: {
    title: "Alex Rivera — Frontend Engineer & Creative Developer",
    description: "Interfaces that feel alive.",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

Theme options:

**Option A (recommended for speed): `next-themes`**

```tsx
// src/components/providers/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      storageKey="ar-theme"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
```

`next-themes` injects a blocking script that sets the attribute before paint, so there is no flash. The original’s `?theme=light|dark` override is not supported by default; add a tiny client component that reads `useSearchParams()` and calls `setTheme`, or skip it.

**Option B (exact clone): custom provider**

Use a `useTheme` context, a blocking inline script in `<head>`, and a `useEffect` to sync `localStorage`. The script:

```tsx
const themeScript = `(function(){try{
  var stored=localStorage.getItem("ar-theme");
  var param=new URLSearchParams(location.search).get("theme");
  var system=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
  var theme=(param==="light"||param==="dark")?param:
            (stored==="light"||stored==="dark")?stored:system;
  document.documentElement.dataset.theme=theme;
}catch(e){}})();`;
```

Render it inside `<head>` with `dangerouslySetInnerHTML`. Then `ThemeToggle` reads `document.documentElement.dataset.theme`, toggles it, writes `localStorage`, and updates the `theme-color` meta. For the 450ms color transition, add a `theme-transition` class for 500ms (same as the original).

Whichever route you choose, hydrate-safe rendering matters: do not render the sun/moon icon conditionally from `theme` before mount. Use CSS (`html[data-theme="light"] .icon-sun { display:none }`) like the original, or guard with a `mounted` flag.

### Phase 4 — Shell and page composition (2–3 h)

`layout.tsx`:

```tsx
<body>
  <ThemeProvider>
    <ToastProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Grain />
      <ScrollProgress />
      <SiteHeader />
      {children}
      <Footer />
      <CommandPalette />
      <Toaster />
      <SmoothScroll />
    </ToastProvider>
  </ThemeProvider>
</body>
```

`page.tsx`:

```tsx
import { Hero } from "@/components/sections/Hero";
// ...

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Stats />
      <Work />
      <About />
      <Writing />
      <Playground />
      <Contact />
    </main>
  );
}
```

Keep the original structural wrappers (`.container`, `.section`, `.section-head`, `.hero-grid`). This makes the CSS port nearly 1:1.

### Phase 5 — Build the sections statically (1–2 days)

Build top to bottom with **no animation first**, then add motion. This is the fastest path to a faithful clone.

For each section:

1. Copy the markup from `index.html`.
2. Convert HTML to JSX:
   - `class` → `className`
   - `for` → `htmlFor`
   - `stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`
   - `autocomplete` → `autoComplete`, `spellcheck` → `spellCheck`
   - SVG `xlink:href` → `xlinkHref` (not used here)
   - inline `--d` variables:
     ```tsx
     style={{ "--d": 1 } as React.CSSProperties}
     ```
3. Extract repeated items (projects, notes, experiments, socials) into `.map()`.
4. Replace `data-*` DOM hooks with props/state where appropriate. Keep `data-*` only for styling.
5. Convert inline SVG strings into a shared `Icons.tsx` with typed components.

Specific notes:

**Header**
- Fixed, `height: 72px`, transparent until `scrollY > 8`, then `is-scrolled` (blur + border).
- Desktop nav hidden below 940px; mobile toggle appears.
- Active link driven by section observation.
- Theme toggle and palette trigger are buttons with accessible labels.
- Mobile menu: render always, animate opacity/transform, set `inert={!open}`, lock body scroll, close on Escape and on link click.

**Hero**
- Keep the H1 line break and `<em>` gradient. Do not split chars — the gradient and serif italic make it fragile. Split **lines** only.
- Profile card: the orbit ring is decorative; the card has `perspective` on the parent and `transform-style: preserve-3d`.
- Live clock starts as `--:--` and updates after mount to avoid hydration mismatch.
- Background blobs/grid/spotlight are `aria-hidden`.
- The scroll cue is an anchor to `#work`.

**Marquee**
- Duplicate the list twice.
- `aria-hidden` on the whole marquee.
- Animate the track `translateX(-50%)` over 38s linear infinite.
- Pause on hover (`animation-play-state: paused`).
- Disable under reduced motion.

**Stats**
- Render values from `site.stats`.
- The original uses `data-count` and `data-suffix`. In React, pass `value`, `suffix`, `label` props.
- Counters should start at 0 visually and animate only when visible; for SSR/no-JS, render the final value and let GSAP set it to 0 on mount (or use a client-only counter with a stable placeholder). Do not ship “0” as the server-rendered value if SEO/no-JS matters.

**Work**
- `useState<ProjectCategory | "all">`.
- Filter rows with `.filter()`; animate the count.
- Project rows are `<button>` elements, not links, because they open a dialog. If you add `/work/[slug]`, use a link and intercept navigation for the dialog.
- Hover preview: render one fixed-position card, update content from the hovered project, follow pointer with `quickTo`, hide on scroll/leave, disable on touch and reduced motion.
- Case-study dialog: native `<dialog>`, `showModal`, focus management, prev/next wrapping, Escape/backdrop close, scroll reset on change.
- Filter result count: `aria-live="polite"`.

**About**
- Three paragraphs, signature, toolkit chips, sticky Now card.
- Experience accordion: first item open by default.
- Prefer the CSS `grid-template-rows: 0fr → 1fr` technique; it animates smoothly without measuring heights and works with React.
- Set `aria-expanded` on the trigger and `aria-hidden`/`inert` on the closed panel.
- For GSAP, animate the panel’s height only if you need a different feel; remember to recalculate on resize.

**Writing**
- Card grid, 2 columns desktop, 1 mobile.
- Open article dialog on click; full body paragraphs, meta, close.
- If you want real URLs, create `/notes/[slug]` and share the same content component. Start with dialogs for parity.

**Playground**
- Four art variants: `dots`, `type`, `grain`, `squish`.
- Keep these as CSS/JSX components. They are decorative; mark art `aria-hidden`.
- Cards are external links; `target="_blank" rel="noopener noreferrer"`.
- Hover effects are pure CSS.

**Contact**
- Email link + copy button. `navigator.clipboard.writeText` with a `document.execCommand` fallback.
- Toast via context, `role="status"`, auto-dismiss ~2.6s.
- Social rows with icon, label, handle.
- Local time: `Intl.DateTimeFormat` with `timeZone: "Europe/Lisbon"`, update every 15s. Show the timezone abbreviation (`WET/WEST`) via `formatToParts`.
- “Available for select projects” status dot.

**Footer**
- Year from `new Date().getFullYear()` after mount (or hard-code current year at build time).
- Live clock, back-to-top button.

### Phase 6 — GSAP foundation (2–4 h)

Create `src/lib/gsap.ts`:

```ts
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

gsap.defaults({ ease: "power3.out", duration: 0.8 });

export { gsap, ScrollTrigger, SplitText, useGSAP };
```

Only import this from client components. Do not register plugins at module scope in a server component.

Set up reduced-motion once:

```ts
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
```

Use `gsap.matchMedia()` inside effects so desktop-only effects (tilt, preview, spotlight) do not run on touch/reduced motion.

### Phase 7 — Implement the animation layer (1–2 days)

Recommended ownership:

- **CSS**: hover states, marquee, grain, orbit spin, blob drift, playground art, theme color transition, focus rings.
- **GSAP**: hero entrance, scroll reveals, counters, scroll progress, 3D tilt, cursor-following preview, dialog transitions, optional accordion.
- **React state**: filters, menu, theme, dialogs, palette, toast, accordion open/closed.

If you animate the same property with CSS transitions and GSAP, you will get jitter. Decide per element.

#### 7.1 Scroll reveals

Create one reusable client component:

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

Why not keep `.reveal { opacity: 0 }` in CSS? Because if JS fails, the content stays invisible. Let GSAP set the initial state in `useGSAP` (layout effect) so content is visible without JS, and use a `Reveal` wrapper only where you can afford an extra div. For headings/links that should not be wrapped in a div, animate with a section-scoped timeline instead.

For many rows, prefer `ScrollTrigger.batch`:

```ts
ScrollTrigger.batch(".project-row", {
  start: "top 92%",
  once: true,
  onEnter: (batch) =>
    gsap.from(batch, {
      opacity: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.07,
      ease: "power3.out",
    }),
});
```

#### 7.2 Hero entrance

```tsx
"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function HeroMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const h1 = scope.current!.querySelector("h1")!;
        const split = new SplitText(h1, { type: "lines", mask: "lines" });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(split.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.08,
        })
          .from(
            ".hero-kicker, .hero-sub, .hero-actions, .hero-socials",
            { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 },
            "-=0.6"
          )
          .from(
            ".profile-card",
            { y: 30, opacity: 0, scale: 0.97, duration: 0.9 },
            "-=0.7"
          )
          .from(
            ".hero-foot",
            { opacity: 0, y: 12, duration: 0.6 },
            "-=0.4"
          );

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
```

Caveats:
- `SplitText` with `mask: "lines"` requires a current GSAP version; if unavailable, wrap lines manually or animate `y` + `opacity` without the mask.
- Splitting the H1 can break background-clip gradients on the `<em>`. Test both themes. If it does, animate the H1 wrapper instead of the lines, or split only the plain-text part.
- Do not hide the H1 in CSS; let GSAP own the entrance so no-JS users still see it.

#### 7.3 Counters

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { n: 0 };
        gsap.to(state, {
          n: value,
          duration: 1.3,
          ease: "power3.out",
          snap: { n: 1 },
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.n)}${suffix}`;
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
```

SSR renders the final number; GSAP animates from 0 on mount. That is better for no-JS and crawlers than rendering 0.

#### 7.4 3D tilt

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = ref.current!;
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });

          const rotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
          const rotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });

          const move = (e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            rotY(x * 9);
            rotX(-y * 9);
          };
          const leave = () => {
            rotY(0);
            rotX(0);
          };

          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);

          return () => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="profile-card">
      {children}
    </div>
  );
}
```

Put `perspective: 900px` on the parent, not the rotating element, to match the original.

#### 7.5 Hover project preview

```tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ProjectPreview({ project }: { project: Project | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { xPercent: 0, yPercent: 0 });
  }, []);

  // In the Work component:
  // const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.35, ease: "power3" });
  // const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.35, ease: "power3" });
  //
  // onPointerMove: clamp with gsap.utils.clamp(14, innerWidth - w - 14, e.clientX + 26)
  // onPointerEnter: gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.28 })
  // onPointerLeave: gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.2 })
  // on scroll: hide
  // Only enable for (pointer: fine) and no reduced motion.
}
```

Use `autoAlpha` (opacity + visibility) rather than toggling classes. Measure the preview’s `offsetWidth/offsetHeight` instead of hard-coding 330×250.

#### 7.6 Scroll progress and header

```tsx
useGSAP(() => {
  const bar = progressRef.current!;
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
      },
    }
  );
});
```

For the header:

```ts
ScrollTrigger.create({
  start: 8,
  end: "max",
  onUpdate: (self) => {
    header.classList.toggle("is-scrolled", self.scroll() > 8);
  },
});
```

Or simply use a passive scroll + `requestAnimationFrame` listener; it is cheap and easier to reason about.

#### 7.7 Dialog transitions

Native `<dialog>` is already focus-trapped and top-layer. Add GSAP around it:

```tsx
function openDialog() {
  dialogRef.current?.showModal();
  gsap.fromTo(
    ".dialog-card",
    { y: 18, scale: 0.985, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
  );
}

function closeDialog() {
  gsap.to(".dialog-card", {
    y: 18,
    scale: 0.985,
    opacity: 0,
    duration: 0.25,
    ease: "power2.in",
    onComplete: () => dialogRef.current?.close(),
  });
}
```

Handle `onCancel` (Escape) with `preventDefault()` and call your animated close. Handle backdrop click with `e.target === dialogRef.current`; keep the card padded inside so clicks on content do not close it. When opening a dialog, stop Lenis; when closing, restart it.

#### 7.8 Accordion

The CSS-only version is best:

```css
.timeline-panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.45s var(--ease), opacity 0.4s ease;
}
.timeline-panel.is-open {
  grid-template-rows: 1fr;
  opacity: 1;
}
.timeline-panel-inner { overflow: hidden; }
```

React controls `aria-expanded` and the `is-open` class. If you want GSAP, animate `height` from 0 to `scrollHeight`, then set `height: auto` on complete; recalculate on resize and content change.

#### 7.9 Lenis

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

If you use Lenis:
- Remove `scroll-behavior: smooth` from `html` (Lenis handles anchors).
- Stop Lenis when a dialog/palette opens.
- Call `ScrollTrigger.refresh()` after fonts load and after images/layout changes.
- Do not nest it with `ScrollSmoother` or Locomotive.

### Phase 8 — Global interactions (1 day)

**Theme toggle** — button with `aria-label`, sun/moon via CSS, persist key `ar-theme`, update `theme-color` meta.

**Command palette** — use `cmdk` inside a native dialog or its own `Command.Dialog`:
- Groups: Sections, Projects, Notes, Links, Actions.
- Items: navigate, open project/note, social links, toggle theme, copy email, back to top.
- Shortcuts: `Ctrl/⌘ K`, `/` when not editing, arrows, Enter, Escape.
- Filter across label + group + hint.
- Focus input on open; restore focus on close.
- Stop Lenis while open.
- Empty state: “No results for …”.

Example skeleton:

```tsx
"use client";

import { Command } from "cmdk";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command menu">
      <Command.Input placeholder="Jump to a section, project or link…" />
      <Command.List>
        <Command.Empty>No results.</Command.Empty>
        <Command.Group heading="Sections">
          <Command.Item onSelect={() => scrollTo("#work")}>Selected work</Command.Item>
          {/* ... */}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
```

**Filters** — `useState`, `aria-pressed`, count with `aria-live`. Optionally use `gsap.Flip` to animate reordering, but hiding/showing rows with a fade is enough.

**Mobile menu** — `useState`, `inert`, `aria-expanded`, `aria-controls`, Escape, close on link click, focus management, body scroll lock.

**Copy email + toast** — context with `toast(message)`; GSAP or CSS entrance; auto-dismiss 2.6s; `aria-live="polite"`.

**Clock** — client component, placeholder `--:--`, interval 15s, `Intl.DateTimeFormat` with timezone. Avoid hydration mismatch by updating state only after mount.

**Active section** — IntersectionObserver with `rootMargin: "-42% 0px -52% 0px"` or ScrollTrigger per section. Set `aria-current="true"` on the matching link.

**Back to top** — `window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })`, or `lenis.scrollTo(0)`.

### Phase 9 — Responsive QA and accessibility (1 day)

Test at: 1440×900, 1280×800, 1080×800, 940×800, 768×1024, 520×800, 390×844, 320×568. Both themes. Both pointer types.

Checklist:
- No horizontal scroll at 320px.
- Header height and anchor offsets.
- Hero card does not overflow on mobile.
- Project rows keep title/description readable; tags hidden below 940.
- Stats 2×2 below 760.
- Timeline location hidden below 760; period moves to its own row.
- Contact stacks; email wraps.
- Dialog max-height and internal scroll.
- Mobile menu scrolls if content is taller than viewport (`100svh`, not `100vh`).
- Toast fits at 320.
- Focus rings visible on all interactive elements.
- Keyboard: skip link → header → hero → sections → dialogs → palette.
- Escape closes menu, dialogs, palette.
- Focus returns to trigger.
- Reduced motion: no entrance/tilt/preview/marquee/scroll smoothness; all content visible.
- Screen reader: one H1, sensible heading order, list semantics, labels, live regions.
- Contrast in both themes, especially small mono text and lime-on-light.

### Phase 10 — Metadata, SEO, and sharing (2–3 h)

- `metadata` with title template, description, canonical, Open Graph, Twitter.
- `src/app/icon.svg` for favicon.
- Optional `opengraph-image.tsx` with `ImageResponse`:
  - background `#08090a`, lime accent, name + tagline, same fonts loaded from files.
- `robots.ts` and `sitemap.ts`.
- JSON-LD `Person` / `WebSite` schema:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  ```
- Semantic HTML: `<main>`, `<section aria-labelledby>`, `<h2 id>`, `<time dateTime>`.
- External links: `rel="noopener noreferrer"`.
- Replace fictional links/email before launch.

### Phase 11 — Performance (2–4 h)

- Use `next/font` (done) and only the weights you use. Drop 300 if unused.
- Avoid images; if you add project screenshots, use `next/image` with `sizes`, AVIF/WebP.
- Keep GSAP in client components; do not import it into server bundles.
- Code-split heavy extras only: Three.js scene, OG generation, palette if it grows. Do not lazy-load the hero animation.
- Reduce blob size/blur on mobile; consider static radial gradients below 640px.
- Keep `will-change` scoped and removed after animation; do not apply it globally.
- Measure with Lighthouse and Chrome Performance:
  - CLS < 0.1
  - LCP < 2.5s
  - INP < 200ms
  - no long tasks > 50ms during entrance
- Run `npm run build` and check the route output.
- If adding analytics, load after interaction/idle.

### Phase 12 — Testing and deployment (1 day)

- Playwright smoke tests:
  - page loads, H1 visible
  - filters change row count
  - project dialog opens/closes; prev/next works
  - note dialog opens
  - palette opens with Ctrl+K and `/`, filters, Enter runs item
  - theme persists after reload
  - copy email shows toast (mock clipboard)
  - mobile menu opens/closes
- `@axe-core/playwright` or Lighthouse accessibility audit.
- Visual regression screenshots at 1440 + 390, both themes.
- Deploy to Vercel:
  - build `next build`
  - no env vars required
  - add domain, OG image, favicon
- Post-deploy: check `?theme=light`, reduced motion, slow 3G, iOS Safari, Android Chrome.

---

## 6. GSAP cookbook (quick reference)

### Register once

```ts
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
```

### Cleanup

Always use `useGSAP` with `{ scope }`; return cleanup from `matchMedia` and `SplitText`. Never create ScrollTriggers in render.

### Refresh after fonts

```ts
document.fonts.ready.then(() => ScrollTrigger.refresh());
```

### Responsive + reduced motion

```ts
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference) and (min-width: 941px)", () => {
  // desktop-only motion
});
return () => mm.revert();
```

### Avoid fighting CSS

- Let GSAP own `transform` and `opacity` for animated elements.
- Do not put a CSS `transition: transform` on the same element.
- For hover micro-interactions, CSS is fine; remove them from GSAP.
- If you must combine, use CSS for `background-color`/`border-color` and GSAP for transforms.

### ScrollTrigger + React

- `once: true` for reveals.
- `invalidateOnRefresh: true` for responsive values.
- `ScrollTrigger.refresh()` after layout changes.
- Use `ScrollTrigger.batch` for lists.
- With Lenis, connect `lenis.on("scroll", ScrollTrigger.update)`.

### Dialog timing

Call `showModal()` first, then animate the child card, not the `<dialog>` itself. Animating the dialog element can break the top-layer/backdrop behavior.

---

## 7. Alternative animation libraries

| Library | Best for | Notes |
|---|---|---|
| **GSAP + ScrollTrigger + SplitText** | scroll storytelling, timelines, text, pinning, counters | Best fit for this reference. All plugins free on 3.13+. |
| **Lenis** | smooth scrolling | Pair with ScrollTrigger; respect reduced motion. |
| **Motion** (`motion/react`) | layout animations, `AnimatePresence`, gestures, springs | Excellent React DX. Don’t let it own the same transforms as GSAP. |
| **cmdk** | command palette | Accessible, filtering, keyboard navigation; replaces ~200 lines of custom code. |
| **next-themes** | dark/light/system | No-flash script, persistence, SSR-safe. |
| **AutoAnimate** | list/grid insert/remove | One line; good for filters if you don’t want Flip. |
| **anime.js v4** | lightweight timelines | Nice alternative to GSAP for small sites; smaller ecosystem for scroll. |
| **Three.js / R3F / drei** | real 3D | The reference has no 3D; only add if you build a WebGL hero. |
| **OGL** | raw WebGL shaders | Tiny; good for a grain/hero shader. |
| **Theatre.js** | choreographed 3D | Overkill unless you have a 3D sequence. |
| **View Transitions API / next-view-transitions** | page transitions | Native, progressive; good for project routes. |
| **react-spring** | physics-based UI | Great for tactile toggles; less suited to scroll timelines. |
| **tailwindcss-motion / tw-animate-css** | simple CSS animation utilities | Fine for fades/slides; not a GSAP replacement. |
| **Radix UI / Base UI** | accessible dialogs, popovers | Use if native `<dialog>` is too limited. |
| **Splitting.js / SplitType** | text splitting | GSAP SplitText is easier to integrate and now free. |

Recommended combination for this clone:

```text
GSAP + ScrollTrigger + SplitText + Lenis + cmdk + next-themes
```

Add `Motion` only if you add page-level shared-layout transitions. Add `Three.js` only if you replace the CSS art with an actual 3D scene.

---

## 8. Fidelity checklist

Use this as the definition of done:

- [ ] Dark and light palettes match the tokens exactly.
- [ ] Instrument Serif italic emphasis, Inter Tight UI, JetBrains Mono metadata.
- [ ] Fixed grain, scroll progress, hero blobs/grid/spotlight.
- [ ] Header blur after 8px; active nav highlights.
- [ ] Mobile menu opens/closes with animation, `inert`, scroll lock.
- [ ] Theme persists; system preference on first visit; no flash.
- [ ] Hero entrance timeline; H1 gradient intact.
- [ ] Profile card tilts; orbit spins; local time updates.
- [ ] Marquee loops seamlessly and pauses on hover.
- [ ] Stats count up once.
- [ ] Work filters, count, hover preview, case-study dialog, prev/next.
- [ ] About sticky Now card, chips, experience accordion.
- [ ] Notes grid + article dialog.
- [ ] Playground art variants + hover overlays.
- [ ] Contact copy + toast; socials; local time.
- [ ] Command palette: Ctrl/⌘K, `/`, arrows, Enter, Escape, groups, empty state.
- [ ] Scroll reveals, counters, progress; no layout shift.
- [ ] Reduced motion: everything visible, no tilt/preview/marquee/smooth scroll.
- [ ] Keyboard-only pass; focus visible; focus restored after dialogs.
- [ ] No horizontal scroll at 320px.
- [ ] Lighthouse ≥ 95 in all four categories.
- [ ] Metadata, favicon, OG image, sitemap, robots.
- [ ] `npm run build` passes with no type errors.

---

## 9. Common pitfalls specific to this clone

1. **Hydration mismatch from theme and clock.** Use `next-themes` or a blocking script; render clock placeholders until mounted.
2. **GSAP double mounts in dev.** `useGSAP` cleans up; don’t create animations at module scope or in render.
3. **SplitText breaks the gradient H1.** Test; split lines, not chars; revert on cleanup.
4. **ScrollTrigger positions are wrong after fonts load.** Call `ScrollTrigger.refresh()` on `document.fonts.ready` and after layout changes.
5. **Lenis fights anchor links.** Remove CSS `scroll-behavior: smooth`; use `anchors: true` or `lenis.scrollTo`.
6. **Lenis keeps scrolling behind dialogs.** Stop it when a dialog/palette opens; restart on close.
7. **`overflow-x: hidden` breaks sticky.** Use `overflow-x: clip` on `body`.
8. **Animating `<dialog>` itself.** Animate the inner card; keep `<dialog>` for top layer and focus trap.
9. **Accordion height measurement.** Prefer the CSS grid-rows technique; if using GSAP, recalc on resize.
10. **CSS transition + GSAP on the same transform.** Pick one owner per property.
11. **Hover preview on touch devices.** Gate with `(pointer: fine)` and reduced motion; hide on scroll.
12. **Hard-coded preview clamp.** Measure the element and clamp with `gsap.utils.clamp`.
13. **`aria-hidden` on focusable content.** Use `inert` for closed panels/menus.
14. **Palette shortcut while typing.** Ignore `/` in inputs/textareas/contentEditable.
15. **Z-index chaos.** Keep the map: header 60, grain 70, progress 90, preview 55, toast 120, dialogs top layer, skip link 200.
16. **Animated blur/filter jank.** Prefer opacity/transform; reduce blob blur on mobile.
17. **Imported GSAP into a server component.** Keep all GSAP imports inside `"use client"` modules.
18. **Next App Router `params` are async.** If you add `/work/[slug]`, `const { slug } = await params`.
19. **`next/image` for CSS art.** Not needed; the reference has no raster images.
20. **Copying the fictional identity.** Replace name, email, socials, and metadata before publishing.

---

## 10. Suggested build order and time estimate

| Day | Work |
|---|---|
| 1 | tokens, fonts, shell, header, hero static, marquee, stats static |
| 2 | work, about, notes, playground, contact, footer static; responsive pass |
| 3 | theme, menu, filters, accordion, dialogs, palette, toast, clock, copy |
| 4 | GSAP foundation, reveals, hero timeline, counters, progress, tilt, preview |
| 5 | responsive polish, accessibility, reduced motion, no-JS, Lighthouse |
| 6 | metadata/OG, tests, deployment, cross-browser QA |
| 7 | buffer / content replacement / optional case-study routes |

A fast “port CSS + React-ify markup” pass can produce a clickable static clone in **1–2 days**; the animation and accessibility polish is the other half.

---

## 11. Optional upgrades after parity

- Make projects and notes real routes: `/work/[slug]`, `/notes/[slug]`, with intercepting routes for the modal experience.
- Add a CMS (Sanity, Contentlayer/MDX, or a local `content/` folder) if content will change often.
- Add page transitions with the View Transitions API or `next-view-transitions`.
- Add a real WebGL hero (R3F/OGL) only if it serves the story; the CSS art is already distinctive.
- Add analytics and privacy-friendly event tracking.
- Add visual regression tests for the hero card, work rows, and dialogs.

---

## 12. First commands

```bash
cd C:\web_dev\portfolio
npm i gsap @gsap/react lenis cmdk next-themes
npm run dev
```

Then start with Phase 2: port `styles.css` tokens/base and build the static Hero. Do not add animation until the static page matches at 1440 and 390.
