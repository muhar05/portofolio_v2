interface ProjectPlaceholderProps {
  title: string;
  category?: string;
  compact?: boolean;
  className?: string;
  decorative?: boolean;
}

export default function ProjectPlaceholder({
  title,
  category,
  compact = false,
  className = "",
  decorative = false,
}: ProjectPlaceholderProps) {
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={
        decorative
          ? undefined
          : `${title} preview pending. A dummy preview will replace this placeholder.`
      }
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-surface px-4 text-center ${className}`}
    >
      <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Preview pending
      </span>
      {!compact && (
        <span className="mt-2 font-display text-[clamp(1.1rem,2.4vw,1.6rem)] font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {title}
        </span>
      )}
      {category && !compact && (
        <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted">
          {category}
        </span>
      )}
      {!compact && (
        <span className="mt-3 max-w-[18rem] text-[11px] leading-relaxed text-ink-muted">
          Preview with dummy data pending.
        </span>
      )}
    </div>
  );
}
