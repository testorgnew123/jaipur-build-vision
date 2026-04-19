import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

const GA_ID = import.meta.env.VITE_GA_ID || "G-XXXXXXXXXX";
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "XXXXXXXXXXXXXXX";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // GA4
    if (!document.getElementById("ga4-script") && GA_ID && !GA_ID.includes("XXXX")) {
      const s = document.createElement("script");
      s.id = "ga4-script";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { send_page_view: false });
    }

    // Meta Pixel
    if (!document.getElementById("fb-pixel-script") && META_PIXEL_ID && !META_PIXEL_ID.includes("XXXX")) {
      const s = document.createElement("script");
      s.id = "fb-pixel-script";
      s.async = true;
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }

    const unsub = router.subscribe("onResolved", () => {
      const url = window.location.pathname + window.location.search;
      if (window.gtag) window.gtag("event", "page_view", { page_path: url });
      if (window.fbq) window.fbq("track", "PageView");
    });
    return () => unsub();
  }, [router]);

  return null;
}
