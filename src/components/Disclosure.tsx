import { useState, type ReactNode } from "react";

/**
 * 折りたたみ。
 *
 * 地の色は --disclosure-* を見る。暗い面（.panel-dark）の中に置かれたときに
 * 「明るい地 × 白文字」で読めなくなるのを防ぐため、面の側から上書きできるようにしてある。
 */
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
      style={{
        borderColor: "var(--disclosure-border, var(--color-border-soft))",
        background: "var(--disclosure-bg, var(--color-base-panel))",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold md:text-base" style={{ color: "var(--disclosure-ink, var(--color-ink))" }}>
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
        <div className="prose-body border-t px-4 py-4" style={{ borderColor: "var(--disclosure-border, var(--color-border-soft))" }}>
          {children}
        </div>
      )}
    </div>
  );
}
