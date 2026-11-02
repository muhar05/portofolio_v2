"use client";

import { useSyncExternalStore } from "react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

function subscribe(callback: () => void) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;

    root.dataset.theme = next;
    root.style.colorScheme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable in private mode; the session still updates.
    }

    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      aria-pressed={isDark}
      title="Toggle light and dark theme"
      className={`flex min-h-11 items-center justify-center gap-2 rounded-full border border-line text-foreground transition-colors hover:bg-surface ${
        showLabel ? "px-4" : "w-11"
      } ${className}`}
    >
      <span aria-hidden="true" className="theme-toggle__sun">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </span>
      <span aria-hidden="true" className="theme-toggle__moon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
        </svg>
      </span>
      {showLabel && <span className="text-[13px] font-medium">Theme</span>}
    </button>
  );
}
