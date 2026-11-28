export type ProjectCategory = "Full-stack" | "Marketplace" | "Data" | "E-commerce";

export type SocialIcon = "github" | "x" | "linkedin" | "mail";

export interface Social {
  label: string;
  handle: string;
  url: string;
  icon: SocialIcon;
}

export interface ProjectLink {
  label: string;
  url: string;
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
  image: string;
  liveUrl: string;
  repos: ProjectLink[];
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
    { value: 4, suffix: "", label: "Projects" },
    { value: 4, suffix: "", label: "Notes" },
    { value: 4, suffix: "", label: "Experiments" },
    { value: 2, suffix: "", label: "Palettes" },
  ],

  // Sample project and note content - replace with your own before publishing.
  projects: [
    {
      slug: "fixmate",
      index: "01",
      title: "FixMate",
      category: "Full-stack",
      year: "2026",
      description: "A role-based repair marketplace for booking verified technicians and paying after the job is done.",
      longDescription:
        "FixMate connects customers with verified repair technicians for phones, laptops, ACs, fridges, TVs, and electrical work. Customers browse services, request a repair, track every status change, and pay only after completion. Technicians manage listings and requests, while admins moderate users, bookings, and payments.",
      role: "Full-stack development",
      stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Stripe", "Better Auth"],
      highlights: [
        "Built separate customer, technician, and admin flows with Better Auth sessions and role-based access.",
        "Implemented service browsing, booking status tracking, and Stripe Checkout that holds payment until the repair is complete.",
        "Hardened the Express API with Zod validation, rate limiting, Helmet, and S3-backed uploads.",
      ],
      colors: ["#b6f2d8", "#5eead4"],
      image: "/projects/fixmate.png",
      liveUrl: "https://assignment-09-frontend-two.vercel.app/",
      repos: [
        { label: "Frontend repo", url: "https://github.com/rehat2007/Assignment-09-frontend" },
        { label: "Backend repo", url: "https://github.com/rehat2007/Assignment-09-backend" },
      ],
    },
    {
      slug: "studiospace",
      index: "02",
      title: "StudioSpace",
      category: "Marketplace",
      year: "2026",
      description: "An hourly studio-rental marketplace for photo, podcast, and creator spaces.",
      longDescription:
        "StudioSpace connects creative professionals with hourly studio space. Hosts publish photo studios, film stages, podcast lounges, music rooms, and workshop spaces; customers search by category, compare hourly rates, and request bookings against live availability.",
      role: "Full-stack development",
      stack: ["Next.js", "React", "Express", "MongoDB", "Better Auth", "Tailwind CSS"],
      highlights: [
        "Built category search, hourly pricing, and live availability across photo, podcast, music, and workshop studios.",
        "Implemented email/password and Google OAuth with Better Auth sharing sessions across the Next.js frontend and Express API.",
        "Added bookings, reviews, wishlists, host dashboards, and newsletter flows on a shared MongoDB data model.",
      ],
      colors: ["#ffb199", "#ff8a65"],
      image: "/projects/studiospace.png",
      liveUrl: "https://studiospace-theta.vercel.app/",
      repos: [
        { label: "Frontend repo", url: "https://github.com/rehat2007/Assignment-08-frontend" },
        { label: "Backend repo", url: "https://github.com/rehat2007/Assignment-08-backend" },
      ],
    },
    {
      slug: "bazar-dor",
      index: "03",
      title: "Bazar Dor",
      category: "Data",
      year: "2026",
      description: "A Bangla-first market price tracker for everyday essentials, with daily changes and comparisons.",
      longDescription:
        "Bazar Dor helps people follow the latest prices of rice, lentils, oil, vegetables, fish, meat, eggs, and spices. Signed-in users compare prices across markets and track fluctuations, while a live-style ticker and sorting controls make daily price checks fast on any screen.",
      role: "Full-stack development",
      stack: ["Next.js", "MongoDB", "Better Auth", "Tailwind CSS", "DaisyUI"],
      highlights: [
        "Built a Bangla-first responsive storefront with a live-style price ticker and daily price-change indicators.",
        "Added category filters, sorting, and per-product market comparisons across 33+ everyday essentials.",
        "Implemented social authentication and MongoDB-backed product data with a DaisyUI component system.",
      ],
      colors: ["#b9f6ca", "#ffe082"],
      image: "/projects/bazar-dor.png",
      liveUrl: "https://assignment-07-beta.vercel.app/",
      repos: [{ label: "Repository", url: "https://github.com/rehat2007/Assignment-07" }],
    },
    {
      slug: "nova",
      index: "04",
      title: "Nova",
      category: "E-commerce",
      year: "2026",
      description: "A polished front-end fashion store with search, persistent cart, wishlist, and checkout.",
      longDescription:
        "Nova is a front-end-only e-commerce demo for a modern fashion brand. It includes a shop with live filtering, search, and six sort options, product pages with size and color selection, a LocalStorage cart and wishlist, and a validated checkout flow.",
      role: "Front-end development",
      stack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      highlights: [
        "Built a 16-product catalogue with live search, category filtering, and six sort modes.",
        "Implemented a LocalStorage cart and wishlist with quantity controls, a free-shipping threshold, and empty states.",
        "Created a validated checkout flow with order confirmation, toasts, and accessible keyboard-friendly controls.",
      ],
      colors: ["#e8e6dc", "#a8a29e"],
      image: "/projects/nova.png",
      liveUrl: "https://novastore-pink.vercel.app/",
      repos: [{ label: "Repository", url: "https://github.com/rehat2007/nova_store" }],
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