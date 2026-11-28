export type ProjectCategory = "Web app" | "3D & motion" | "Open source";

export type SocialIcon = "github" | "x" | "linkedin" | "mail";

export interface Social {
  label: string;
  handle: string;
  url: string;
  icon: SocialIcon;
}

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

export interface Note {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
  excerpt: string;
  body: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Site {
  profile: {
    name: string;
    initials: string;
    role: string;
    email: string;
    location: string;
    timezone: string;
    handle: string;
  };
  socials: Social[];
  stats: Stat[];
  projects: Project[];
  writing: Note[];
}

export const siteUrl = "https://additisla.dev";

export const site = {
  profile: {
    name: "Rehat Islam Addit",
    initials: "A",
    role: "Full-stack Developer",
    email: "additisla@gmail.com",
    location: "Narshingdi, Bangladesh",
    timezone: "Asia/Dhaka",
    handle: "@additisla",
  },

  socials: [
    { label: "GitHub", handle: "@additisla", url: "https://github.com/additisla", icon: "github" },
    { label: "X / Twitter", handle: "@additisla", url: "https://x.com/additisla", icon: "x" },
    {
      label: "LinkedIn",
      handle: "in/additisla",
      url: "https://www.linkedin.com/in/additisla",
      icon: "linkedin",
    },
    { label: "Email", handle: "additisla@gmail.com", url: "mailto:additisla@gmail.com", icon: "mail" },
  ],

  stats: [
    { value: 6, suffix: "", label: "Projects" },
    { value: 4, suffix: "", label: "Notes" },
    { value: 4, suffix: "", label: "Experiments" },
    { value: 2, suffix: "", label: "Palettes" },
  ],

  // Sample project and note content - replace with your own before publishing.
  projects: [
    {
      slug: "orbital",
      index: "01",
      title: "Orbital",
      category: "3D & motion",
      year: "2026",
      description: "A real-time 3D analytics canvas for satellite fleets.",
      longDescription:
        "Orbital gives mission operators a live, spatial view of their constellations. I designed and built the entire frontend — from the instanced-mesh renderer to the timeline scrubber that lets you rewind eight hours of telemetry without dropping a frame.",
      role: "Design & engineering",
      stack: ["Three.js", "WebGL", "TypeScript", "Web Workers"],
      highlights: [
        "Rendered 12,000 orbital objects at 60fps using instanced meshes and a custom LOD system.",
        "Built a timeline scrubber that streams and interpolates historical telemetry in under 40ms.",
        "Shipped the design system, docs site and onboarding flow alongside the core product.",
      ],
      colors: ["#d9ff7a", "#7ef0d0"],
    },
    {
      slug: "ledgerline",
      index: "02",
      title: "Ledgerline",
      category: "Web app",
      year: "2025",
      description: "Invoicing software that feels like a spreadsheet, minus the dread.",
      longDescription:
        "A finance workspace for independent studios. The brief was simple: make invoicing feel as quick as typing a sentence. I rebuilt the editing surface from scratch around keyboard-first flows and an optimistic sync engine.",
      role: "Lead frontend",
      stack: ["React", "Node.js", "Postgres", "tRPC"],
      highlights: [
        "Cut time-to-first-invoice from 4 minutes to 38 seconds in usability tests.",
        "Designed an offline-first sync layer with conflict resolution and undo across sessions.",
        "Reduced the main bundle by 61% after replacing a charting dependency with hand-rolled SVG.",
      ],
      colors: ["#ffc09b", "#ff8fa8"],
    },
    {
      slug: "motif",
      index: "03",
      title: "Motif",
      category: "Web app",
      year: "2025",
      description: "An AI moodboard that reads the room, not just the prompt.",
      longDescription:
        "Motif turns a messy folder of references into coherent art direction. I worked with the founding team to shape the product and built the interaction model: spatial boards, inline generation, and a review flow that keeps humans in charge.",
      role: "Founding engineer",
      stack: ["Next.js", "AI SDK", "Framer Motion", "Tailwind"],
      highlights: [
        "Designed and shipped the spatial board canvas with drag, snap and multi-select.",
        "Built a streaming generation UI with skeleton previews and graceful failure states.",
        "Took the product from prototype to 9k weekly active designers in seven months.",
      ],
      colors: ["#cdb9ff", "#93a8ff"],
    },
    {
      slug: "signal",
      index: "04",
      title: "Signal",
      category: "Open source",
      year: "2024",
      description: "Lightweight observability for teams that hate dashboards.",
      longDescription:
        "Signal is an open-source toolkit that turns logs, traces and metrics into one queryable event stream. I maintain the browser client and the embeddable charting library used by roughly 400 teams.",
      role: "Creator & maintainer",
      stack: ["Rust", "ClickHouse", "TypeScript"],
      highlights: [
        "Designed an SDK that adds under 3kb to a bundle and batches events on idle.",
        "Wrote the charting layer: canvas-based, accessible, keyboard-navigable.",
        "Grew the project to 4.8k GitHub stars with zero marketing budget.",
      ],
      colors: ["#a9e9ff", "#82a9ff"],
    },
    {
      slug: "aperture",
      index: "05",
      title: "Aperture",
      category: "3D & motion",
      year: "2024",
      description: "A camera app for the browser, built on WebGPU.",
      longDescription:
        "A weekend experiment that got out of hand. Aperture applies real-time film emulation in the browser using WebGPU compute shaders, with a tactile control surface inspired by analog cameras.",
      role: "Everything",
      stack: ["WebGPU", "WGSL", "WASM"],
      highlights: [
        "Implemented a 12-pass film pipeline at 4K and 60fps on integrated graphics.",
        "Built a graceful WebGL2 fallback so the app works on older devices.",
        "Featured on Chrome Experiments and Hacker News front page.",
      ],
      colors: ["#ffe29a", "#ffb47a"],
    },
    {
      slug: "field-notes",
      index: "06",
      title: "Field Notes",
      category: "Web app",
      year: "2023",
      description: "A writing app with a physical soul and local-first bones.",
      longDescription:
        "A distraction-free writing tool for people who miss paper. Everything is stored locally, synced peer-to-peer, and exported as clean Markdown. I built the editor, the typography engine and the sync protocol.",
      role: "Design & engineering",
      stack: ["Tauri", "SQLite", "CRDT", "Rust"],
      highlights: [
        "Wrote a custom CRDT layer that syncs offline edits across devices in under a second.",
        "Designed a typography system with true optical margins and hanging punctuation.",
        "Shipped a 6MB desktop app with a cold start under 400ms.",
      ],
      colors: ["#d8ffae", "#96efc6"],
    },
  ],

  writing: [
    {
      slug: "physics-of-good-motion",
      title: "The physics of good motion",
      category: "Motion",
      date: "Oct 2026",
      read: "8 min",
      excerpt:
        "Most interface motion is decoration. The good stuff behaves like it has mass — it anticipates, overshoots, and settles. Here's how I choose easing curves that make software feel physical without slowing it down.",
      body: [
        "Most interface motion is decoration. We add a fade because a modal felt abrupt, a slide because the page felt flat. That instinct is right, but the execution usually stops at a 200ms ease-in-out and a prayer.",
        "The good stuff behaves like it has mass. It anticipates, overshoots, and settles. A panel pulled from the edge of the screen should accelerate out of your thumb and decelerate into place. A button that opens a menu should nudge toward the menu, not away from it.",
        "My rule: keep motion under 240ms for anything in the primary flow, and reserve springs for surfaces you can throw. If a transition exists only to look nice, delete it. If it exists to explain where something came from, make it obvious and then get out of the way.",
      ],
    },
    {
      slug: "shipping-a-design-system",
      title: "Shipping a design system nobody hates",
      category: "Tooling",
      date: "Aug 2026",
      read: "11 min",
      excerpt:
        "Design systems fail for social reasons, not technical ones. A few notes on building a component library that teams actually adopt — and the governance habits that keep it alive after the launch blog post.",
      body: [
        "Design systems fail for social reasons, not technical ones. You can ship a beautiful library with perfect documentation and still watch teams fork it within a quarter, because the system was designed for the designers rather than the people shipping on Friday.",
        "The pattern that works for me: start with the three components every team is already rebuilding badly, make them excellent, and put a real person on support for a month. Adoption follows pain relief, not mandates.",
        "Governance matters more than the grid. A weekly 30-minute review, a public changelog, and a clear rule for exceptions will do more for consistency than a 400-page Figma file nobody opens.",
      ],
    },
    {
      slug: "webgl-without-the-framework-tax",
      title: "WebGL without the framework tax",
      category: "WebGL",
      date: "May 2026",
      read: "6 min",
      excerpt:
        "You don't need a 600kb engine to put something interesting on the screen. A practical guide to raw WebGL2, instancing, and knowing exactly when to reach for three.js instead.",
      body: [
        "You don't need a 600kb engine to put something interesting on screen. Raw WebGL2 is verbose, but the verbs are finite: compile a shader, bind a buffer, draw. For a lot of product work — a shader background, a data visualisation, a small 3D hero — that is the entire job.",
        "Instancing is the trick worth learning first. One geometry, thousands of transforms, one draw call. It turns a scene that stutters into one that feels effortless, and it forces you to think in terms of data rather than objects.",
        "Reach for three.js when you need a scene graph, GLTF loading, or a team that shouldn't have to debug matrix math. Reach for raw WebGL when the effect is small and the bundle budget is not. Both answers are fine; the mistake is not asking the question.",
      ],
    },
    {
      slug: "notes-on-building-in-public",
      title: "Notes on building in public",
      category: "Career",
      date: "Feb 2026",
      read: "4 min",
      excerpt:
        "Two years of writing about unfinished work, sharing rough prototypes, and publishing before I was ready. What it cost, what it taught me, and why I'd do it again.",
      body: [
        "Two years ago I started posting unfinished work: rough prototypes, half-broken demos, notes with the confidence of a person who hadn't tested anything. I expected indifference. What I got was a surprising number of useful conversations.",
        "Building in public is not a growth strategy, or at least it shouldn't be. It's a forcing function for clarity. Writing down what you're making exposes the parts you've been avoiding, and publishing it gives other people permission to help.",
        "The cost is real: you get judged on work you know is incomplete, and the internet is not always kind. The trick is to publish the learning, not the performance. Nobody needs another polished launch post. They'd rather see the thing that didn't work.",
      ],
    },
  ],
} satisfies Site;
