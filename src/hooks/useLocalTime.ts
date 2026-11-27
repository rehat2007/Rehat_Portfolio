"use client";

import { useEffect, useState } from "react";

export function useLocalTime(timeZone: string) {
  const [state, setState] = useState({ time: "--:--", zone: "", iso: "" });

  useEffect(() => {
    let timeFmt: Intl.DateTimeFormat;
    let zoneFmt: Intl.DateTimeFormat | null = null;

    try {
      timeFmt = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      zoneFmt = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "short" });
    } catch {
      timeFmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
    }

    const update = () => {
      const now = new Date();
      const zonePart = zoneFmt
        ?.formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value;

      setState({
        time: timeFmt.format(now),
        zone: zonePart ?? "",
        iso: now.toISOString(),
      });
    };

    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return state;
}
