import { useState, type ReactNode } from "react";

interface DisclosureProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  accent?: string;
}

export function Disclosure({ summary, children, defaultOpen = false, accent }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-xl border"
      style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold md:text-base" style={{ color: "var(--color-ink)" }}>
          {summary}
        </span>
        <span
          className="shrink-0 text-lg transition-transform duration-200"
          style={{
            color: accent ?? "var(--color-ink-faint)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="prose-body border-t px-4 py-4" style={{ borderColor: "var(--color-border-soft)" }}>
          {children}
        </div>
      )}
    </div>
  );
}
