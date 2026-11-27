import { site } from "@/content/site";
import { Counter } from "@/components/ui/Counter";

export function Stats() {
  return (
    <section className="stats-strip" aria-label="Portfolio at a glance">
      <div className="container stats-grid">
        {site.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <Counter value={stat.value} suffix={stat.suffix} className="stat-num" />
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
