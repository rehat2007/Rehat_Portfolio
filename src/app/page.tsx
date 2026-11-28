import { site, siteUrl } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.profile.name,
  url: siteUrl,
  jobTitle: site.profile.role,
  email: site.profile.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Narshingdi",
    addressCountry: "BD",
  },
  sameAs: site.socials.filter((social) => social.url.startsWith("http")).map((social) => social.url),
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "REST APIs",
    "Full-stack development",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <About />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
