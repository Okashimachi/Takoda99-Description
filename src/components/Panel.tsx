import type { ReactNode } from "react";
import type { Era } from "./Era";

interface PanelProps {
  title?: ReactNode;
  eyebrow?: ReactNode;
  accent?: string;
  children: ReactNode;
  className?: string;
  /**
   * どのバージョンの話かで見た目を変える。
   * qual = 資料然とした沈んだ見た目 / final = せり出した見た目。
   * 未指定なら従来のニュートラルなカード。
   */
  era?: Era;
}

export function Panel({ title, eyebrow, accent, children, className = "", era }: PanelProps) {
  const eraStyle =
    era === "qual"
      ? {
          borderColor: "var(--color-border)",
          borderStyle: "dashed" as const,
          background: "var(--color-base-panel)",
        }
      : era === "final"
        ? {
            borderColor: "var(--color-border-soft)",
            background: "var(--color-base-raised)",
            borderLeft: `5px solid ${accent ?? "var(--color-ink)"}`,
            boxShadow: "0 2px 18px rgba(33, 26, 18, 0.07)",
          }
        : {
            borderColor: "var(--color-border-soft)",
            background: "var(--color-base-raised)",
          };

  return (
    <section className={`rounded-2xl border p-6 md:p-7 ${className}`} style={eraStyle}>
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
