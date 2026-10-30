import type { Project } from "@/types/works";

interface WorkFactsProps {
  project: Project;
}

export default function WorkFacts({ project }: WorkFactsProps) {
  const facts = project.facts;

  if (!facts) return null;

  const items = [
    { label: "Role", value: project.role },
    { label: "Engagement", value: facts.engagement },
    { label: "Status", value: facts.status },
    { label: "Source", value: facts.source },
    { label: "Duration", value: facts.duration },
    { label: "Team", value: facts.team },
  ].filter(
    (item): item is { label: string; value: string } =>
      Boolean(item.value && item.value.trim().length > 0)
  );

  const demo = facts.demo?.filter((item) => item.url) ?? [];

  if (items.length === 0 && demo.length === 0) return null;

  return (
    <div data-reveal className="mt-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Project facts
      </p>

      {items.length > 0 && (
        <dl className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="min-w-0 rounded-2xl border border-line bg-surface p-4"
            >
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                {item.label}
              </dt>
              <dd className="mt-1 text-[13px] font-medium leading-snug text-foreground [overflow-wrap:anywhere]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {demo.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            Demo
          </span>
          {demo.map((item) => (
            <a
              key={`${item.type}-${item.url}`}
              href={item.url}
              target={item.type === "apk" ? undefined : "_blank"}
              rel={item.type === "apk" ? undefined : "noopener noreferrer"}
              download={item.type === "apk" ? true : undefined}
              className="btn-pill border border-line px-3 py-1.5 text-[11px]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
