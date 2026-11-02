"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { buildMailto, buildWhatsApp } from "@/lib/contact";

interface ContactActionProps {
  children: ReactNode;
  className?: string;
  subject?: string;
  location: string;
  ariaLabel: string;
  onBeforeNavigate?: () => void;
}

export function EmailAction({
  children,
  className = "",
  subject = "Portfolio inquiry",
  location,
  ariaLabel,
  onBeforeNavigate,
}: ContactActionProps) {
  const handleClick = () => {
    trackEvent("contact_click", { channel: "email", location });
    onBeforeNavigate?.();
    window.location.href = buildMailto(subject);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}

interface WhatsAppActionProps extends ContactActionProps {
  message?: string;
}

export function WhatsAppAction({
  children,
  className = "",
  message,
  location,
  ariaLabel,
  onBeforeNavigate,
}: WhatsAppActionProps) {
  const handleClick = () => {
    trackEvent("contact_click", { channel: "whatsapp", location });
    onBeforeNavigate?.();
    window.open(buildWhatsApp(message), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
