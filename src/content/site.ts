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
    { label: "GitHub", handle: "@rehat2007", url: "https://github.com/rehat2007", icon: "github" },
    {
      label: "LinkedIn",
      handle: "in/rehat-webdev",
      url: "https://www.linkedin.com/in/rehat-webdev/",
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
      stack: ["React", "Node.js", "MongoDB", "tRPC"],
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
      slug: "designing-apis-that-survive-the-frontend",
      title: "Designing APIs that survive the frontend",
      category: "Backend",
      date: "Nov 2026",
      read: "7 min",
      excerpt:
        "The frontend is the first real client of every API. A practical look at resource shapes, pagination, validation, and error contracts that keep product teams moving.",
      body: [
        "Most API problems show up in the UI before they show up in production. A list endpoint returns a different shape for the empty state, a form has to guess which field failed validation, and a small product decision turns into three client-side workarounds. The contract is the product.",
        "I start with the resources the interface actually needs, not the database tables. That means stable ids, explicit timestamps, predictable envelopes for lists, and errors that identify the field and the reason. Pagination is cursor-based for feeds and offset-based only for admin tables where jumping to page twelve matters.",
        "The goal is not a clever API. It is an API that a frontend can call without a meeting. If the client has to reverse-engineer business rules, the boundary is in the wrong place. A little more shape on the server usually removes a lot of state from the browser.",
      ],
    },
    {
      slug: "mongodb-checklist-before-launch",
      title: "A MongoDB checklist before launch",
      category: "Database",
      date: "Sep 2026",
      read: "9 min",
      excerpt:
        "Indexes, schema validation, migrations, backups, and connection limits. The boring database checks that prevent very exciting incidents.",
      body: [
        "A database that works on a laptop and a database that works in production are different products. Before launch I check the queries the app actually runs, not just the collections. Every hot query gets a supporting index, every list view has an explain plan, and every backfill has been run against realistic data.",
        "MongoDB is flexible, but that does not mean schemaless in production. I add JSON schema validation for the fields the product depends on, unique indexes for identity, and explicit defaults in the application layer. Application code can have a bug; a validator is a second set of eyes. Soft deletes need to be part of the index design, not patched later.",
        "Then come the operational basics: connection pool sizing that matches the cluster and serverless concurrency, a restore test instead of a backup checkbox, slow-query profiling through the database profiler, and index builds that do not block traffic. None of this is glamorous. All of it is cheaper than an incident.",
      ],
    },
    {
      slug: "full-stack-features-without-ui-surprises",
      title: "Full-stack features without UI surprises",
      category: "Full-stack",
      date: "Jul 2026",
      read: "6 min",
      excerpt:
        "A feature is not done when the happy path works. Notes on typed contracts, loading states, optimistic updates, and making failure part of the design.",
      body: [
        "The gap between a demo and a product is usually a set of states nobody designed: loading, empty, partial, unauthorized, offline, and failed halfway through. I treat those as part of the feature, not cleanup after the feature.",
        "Typed contracts help, but only if they are honest. A shared type is useless if the server can return a 409 that the client has never considered. I define the failure modes next to the success shape, then design the UI around what the user can do next.",
        "Optimistic updates are great when rollback is obvious and terrible when it is not. For a like button, go ahead. For a payment or a destructive action, show the pending state and wait. The rule is simple: the more expensive the mistake, the less optimistic the interface.",
      ],
    },
    {
      slug: "auth-sessions-and-the-parts-nobody-warns-you-about",
      title: "Auth, sessions, and the parts nobody warns you about",
      category: "Security",
      date: "Apr 2026",
      read: "5 min",
      excerpt:
        "HttpOnly cookies, CSRF, rate limits, password resets, and session revocation. The unglamorous details that decide whether auth is actually finished.",
      body: [
        "Authentication is easy to demo and hard to finish. The first version usually stops at login, which leaves out session expiry, password resets, email verification, logout everywhere, and what happens when an account is disabled.",
        "I default to server-managed sessions stored in HttpOnly, Secure, SameSite cookies. That keeps tokens out of client JavaScript and makes revocation a server-side operation. If the app uses cookies for state-changing requests, CSRF protection is part of the design, not an optional header.",
        "Then I add the limits: rate-limit login and reset endpoints, never reveal whether an email exists, hash passwords with a current algorithm, and log security events without logging secrets. Auth is one of the few places where boring, conservative choices are almost always the right product decision.",
      ],
    },
  ],
} satisfies Site;