"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icons";

export function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="timeline" id="timeline">
      {site.experience.map((job, index) => {
        const open = openIndex === index;
        const panelId = `exp-panel-${index}`;

        return (
          <div
            className="timeline-item reveal"
            key={`${job.company}-${job.period}`}
            style={{ "--d": index } as CSSProperties}
          >
            <button
              className="timeline-trigger"
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="timeline-period">{job.period}</span>
              <span className="timeline-role">
                <strong>{job.role}</strong>
                <span>{job.company}</span>
              </span>
              <span className="timeline-loc">{job.location}</span>
              <span className="timeline-toggle" aria-hidden="true">
                <Icon name="plus" />
              </span>
            </button>

            <div
              className={`timeline-panel${open ? " is-open" : ""}`}
              id={panelId}
              role="region"
              aria-label={`${job.role} at ${job.company}`}
              aria-hidden={!open}
              inert={!open}
            >
              <div className="timeline-panel-inner">
                <div className="timeline-body">
                  <p>{job.summary}</p>
                  <ul className="timeline-points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="timeline-tags">
                    {job.stack.map((technology) => (
                      <span className="tag" key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
