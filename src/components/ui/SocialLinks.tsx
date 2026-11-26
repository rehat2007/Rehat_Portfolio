import { site } from "@/content/site";
import { externalLinkProps } from "@/lib/utils";
import { Icon } from "@/components/ui/Icons";

export function SocialIconLinks({ className }: { className?: string }) {
  return (
    <div className={className} aria-label="Social links">
      {site.socials.map((social) => (
        <a
          key={social.label}
          href={social.url}
          aria-label={social.label}
          title={social.label}
          {...externalLinkProps(social.url)}
        >
          <Icon name={social.icon} />
        </a>
      ))}
    </div>
  );
}

export function SocialRows({ className }: { className?: string }) {
  return (
    <div className={className ?? "social-rows"}>
      {site.socials.map((social) => (
        <a key={social.label} href={social.url} {...externalLinkProps(social.url)}>
          <span className="social-icon-sm">
            <Icon name={social.icon} />
          </span>
          <span>{social.label}</span>
          <span className="social-handle">{social.handle}</span>
        </a>
      ))}
    </div>
  );
}
