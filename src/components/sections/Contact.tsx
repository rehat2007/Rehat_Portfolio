"use client";

import { site } from "@/content/site";
import { copyText } from "@/lib/clipboard";
import { useToast } from "@/components/providers/ToastProvider";
import { Clock } from "@/components/ui/Clock";
import { Icon } from "@/components/ui/Icons";
import { SocialRows } from "@/components/ui/SocialLinks";

export function Contact() {
  const { toast } = useToast();

  const copyEmail = async () => {
    const ok = await copyText(site.profile.email);
    toast(ok ? "Email copied to clipboard" : `Could not copy — email is ${site.profile.email}`);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <p className="section-label reveal">
          <span>05</span> Contact
        </p>
        <div className="contact-grid">
          <div className="contact-copy">
            <h2 className="reveal">
              Have an idea?
              <br />
              Let&rsquo;s make it <em>real</em>.
            </h2>
            <p className="contact-sub reveal">
              I&rsquo;m open to freelance projects, product collaborations, and the occasional coffee chat.
              The fastest way to reach me is email &mdash; I reply to everything.
            </p>
            <div className="contact-email reveal">
              <a className="email-link" href={`mailto:${site.profile.email}`}>
                {site.profile.email}
              </a>
              <button
                className="copy-btn"
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                <Icon name="copy" />
                <span>Copy</span>
              </button>
            </div>
            <p className="contact-note reveal">
              <span className="status-dot" aria-hidden="true" />
              Currently booking projects for Q1 2027
            </p>
          </div>

          <div className="contact-side">
            <div className="contact-card reveal">
              <span className="mono-label">Elsewhere</span>
              <SocialRows />
            </div>
            <div className="contact-card contact-card--quiet reveal">
              <span className="mono-label">Local time</span>
              <p className="local-time-big">
                <Clock showZone />
              </p>
              <p className="contact-card-note">
                Based in Lisbon, working with teams across time zones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
