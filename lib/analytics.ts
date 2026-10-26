export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const isAnalyticsEnabled =
  typeof GA_MEASUREMENT_ID === "string" &&
  /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (!isAnalyticsEnabled || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", name, params);
}
