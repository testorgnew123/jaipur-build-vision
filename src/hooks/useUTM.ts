import { useEffect, useState } from "react";

export type UTMData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  page_url?: string;
  referrer?: string;
};

const KEY = "ss_utm";
const KEYS: (keyof UTMData)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

export function useUTM(): UTMData {
  const [data, setData] = useState<UTMData>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    let stored: UTMData = {};
    try {
      stored = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
    } catch {
      stored = {};
    }
    const params = new URLSearchParams(window.location.search);
    const fresh: UTMData = { ...stored };
    KEYS.forEach((k) => {
      const v = params.get(k);
      if (v && !stored[k]) fresh[k] = v;
    });
    fresh.page_url = window.location.href;
    fresh.referrer = document.referrer || stored.referrer || "";
    sessionStorage.setItem(KEY, JSON.stringify(fresh));
    setData(fresh);
  }, []);

  return data;
}
