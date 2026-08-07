import type { ReactNode } from "react";

interface PanelProps {
  title?: ReactNode;
  eyebrow?: ReactNode;
  accent?: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, eyebrow, accent, children, className = "" }: PanelProps) {
  return (
    <section
      className={`rounded-2xl border p-6 md:p-7 ${className}`}
      style={{
        borderColor: "var(--color-border-soft)",
        background: "var(--color-base-raised)",
      }}
    >
      {eyebrow && (
        <div
          className="mb-2 text-xs font-bold tracking-wider"
          style={{ color: accent ?? "var(--color-ink-faint)" }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div className="mb-4 text-lg font-bold md:text-xl" style={{ color: "var(--color-ink)" }}>
          {title}
        </div>
      )}
      <div className="prose-body">{children}</div>
    </section>
  );
}
