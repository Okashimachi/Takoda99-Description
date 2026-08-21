import { useState, type ReactNode } from "react";

/**
 * 折りたたみ。
 *
 * 地・枠・見出しの色は --disclosure-* を見る。既定は明るい面向けなので、
 * 暗い面（.panel-dark）の中に置かれたときは面の側から上書きする。
 * 上書きが無ければ従来どおりの見た目になる（既存ページに影響しない）。
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
