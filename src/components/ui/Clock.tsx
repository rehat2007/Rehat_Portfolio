"use client";

import { site } from "@/content/site";
import { useLocalTime } from "@/hooks/useLocalTime";

type ClockProps = {
  id?: string;
  className?: string;
  showZone?: boolean;
};

export function Clock({ id, className, showZone = false }: ClockProps) {
  const { time, zone, iso } = useLocalTime(site.profile.timezone);

  return (
    <>
      <time id={id} className={className ?? "js-clock"} dateTime={iso || undefined}>
        {time}
      </time>
      {showZone && zone ? (
        <>
          {" "}
          <span className="js-tz">{zone}</span>
        </>
      ) : null}
    </>
  );
}
