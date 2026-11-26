import { site } from "@/content/site";
import { externalLinkProps } from "@/lib/utils";
import { Icon } from "@/components/ui/Icons";

function PlayArt({ kind }: { kind: (typeof site.experiments)[number]["art"] }) {
  switch (kind) {
    case "dots":
      return (
        <div className="play-art art--dots">
          <span className="art-orb" />
        </div>
      );
    case "type":
      return (
        <div className="play-art art--type">
          <span className="art-line" />
          <span className="art-line" />
          <span className="art-word">Typewave</span>
        </div>
      );
    case "grain":
      return (
        <div className="play-art art--grain">
          <span className="art-label">Grain / 004</span>
        </div>
      );
    case "squish":
      return (
        <div className="play-art art--squish">
          <div className="squish-row">
            <span className="squish-pill" />
            <span className="squish-pill" />
            <span className="squish-pill" />
            <span className="squish-pill" />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function Playground() {
  return (
    <section className="section play" id="play">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="section-label reveal">
              <span>04</span> Playground
            </p>
            <h2 className="reveal">
              Small experiments,
              <br />
              <em>big curiosities</em>.
            </h2>
          </div>
          <p className="section-lead reveal">
            Tiny things I build to learn something new &mdash; usually at 1am, usually with too many
            gradients.
          </p>
        </header>

        <div className="play-grid">
          {site.experiments.map((experiment) => (
            <a
              className="play-card reveal"
              key={experiment.title}
              href={experiment.url}
              {...externalLinkProps(experiment.url)}
              aria-label={`${experiment.title} — open experiment`}
            >
              <PlayArt kind={experiment.art} />
              <div className="play-body">
                <div className="play-head">
                  <span className="play-title">{experiment.title}</span>
                  <span className="play-arrow">
                    <Icon name="arrowUpRight" />
                  </span>
                </div>
                <p className="play-blurb">{experiment.blurb}</p>
                <div className="play-tags">
                  {experiment.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
