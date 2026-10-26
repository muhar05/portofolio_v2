"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  isAnalyticsEnabled,
  trackEvent,
} from "@/lib/analytics";

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isInitialPage = useRef(true);

  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    if (isInitialPage.current) {
      isInitialPage.current = false;
      return;
    }

    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!isAnalyticsEnabled || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
