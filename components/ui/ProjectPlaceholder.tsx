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
          : `${title} preview pending. A dummy screenshot will replace this placeholder.`
      }
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-surface px-4 text-center ${className}`}
    >
      <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Preview pending
      </span>
      <span
        className={`mt-2 font-display font-semibold leading-tight tracking-[-0.02em] text-foreground ${
          compact ? "text-[13px]" : "text-[clamp(1.1rem,2.4vw,1.6rem)]"
        }`}
      >
        {title}
      </span>
      {category && !compact && (
        <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted">
          {category}
        </span>
      )}
      {!compact && (
        <span className="mt-3 max-w-[18rem] text-[11px] leading-relaxed text-ink-muted">
          Screenshot with dummy data pending.
        </span>
      )}
    </div>
  );
}
