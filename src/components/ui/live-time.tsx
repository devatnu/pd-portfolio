"use client";
import { useSyncExternalStore } from "react";
import { person } from "@/content/site";

// One shared 1s ticker for every clock on the page.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

function format(sec: number, seconds: boolean) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: seconds ? "2-digit" : undefined,
    hour12: false,
    timeZone: person.timeZone,
  }).format(sec * 1000);
}

/** Live local time. Fixed-width placeholder on the server so nothing shifts on hydrate. */
export function LiveTime({ seconds = false, suffix = true }: { seconds?: boolean; suffix?: boolean }) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const text = now ? format(now, seconds) : seconds ? "--:--:--" : "--:--";
  return (
    <time className="tabular-nums">
      {text}
      {suffix && ` ${person.timeZoneLabel}`}
    </time>
  );
}
