import type { ReactNode } from "react";
import type { Era } from "./Era";

/**
 * セクションの面。
 *
 * tone で「面の重さ」を変える。同じカードが延々と続くと視線の止まりどころが
 * 無くなるため、1ページの中で card / flat / tint / dark を混ぜて緩急をつける。
 */
export type PanelTone = "card" | "flat" | "tint" | "dark";

interface PanelProps {
  title?: ReactNode;
  eyebrow?: ReactNode;
  accent?: string;
  children: ReactNode;
  className?: string;
  tone?: PanelTone;
  /**
   * どのバージョンの話かで見た目を変える。
   * qual = 資料然とした沈んだ見た目 / final = せり出した見た目。
   * tone より優先される。
   */
  era?: Era;
}

export function Panel({
  title,
  eyebrow,
  accent,
  children,
  className = "",
  tone = "card",
  era,
}: PanelProps) {
  const a = accent ?? "var(--color-ink)";

  let style: React.CSSProperties;
  let cls = "";

  // era と tone は組み合わせる。
  // era だけだと同じ見た目のカードがゾーン内で延々と続いてしまうため、
  // tone="flat" で「枠を持たない節」を混ぜて息継ぎを作る。
  if (era === "qual" && tone === "flat") {
    style = {
      border: "none",
      borderLeft: "2px dashed var(--color-border)",
      borderRadius: 0,
      background: "transparent",
    };
  } else if (era === "final" && tone === "flat") {
    style = {
      border: "none",
      borderLeft: `3px solid ${a}`,
      borderRadius: 0,
      background: "transparent",
    };
  } else if (era === "qual") {
    style = {
      borderColor: "var(--color-border)",
      borderStyle: "dashed",
      background: "var(--color-base-panel)",
    };
  } else if (era === "final") {
    style = {
      borderColor: "var(--color-border-soft)",
      background: "var(--color-base-raised)",
      borderLeft: `5px solid ${a}`,
      boxShadow: "var(--shadow-card)",
    };
  } else if (tone === "flat") {
    // 枠を持たない面。地の上に直接置いて、カードの連続を断ち切る
    style = { border: "none", background: "transparent", padding: 0 };
  } else if (tone === "tint") {
    style = {
      borderColor: "transparent",
      background: `color-mix(in srgb, ${a} 7%, var(--color-base-panel))`,
    };
  } else if (tone === "dark") {
    cls = "panel-dark";
    style = { borderColor: "transparent", boxShadow: "var(--shadow-lift)" };
  } else {
    style = {
      borderColor: "var(--color-border-soft)",
      background: "var(--color-base-raised)",
      boxShadow: "var(--shadow-card)",
    };
  }

  const pad = tone === "flat" ? (era ? "py-1 pl-6" : "") : "p-6 md:p-8";

  return (
    <section
      className={`rounded-2xl border ${pad} ${cls} ${className}`}
      style={{
        ...style,
        ["--accent" as string]: a,
        // 太字のマーカーもセクションの色に揃える
        ["--marker" as string]:
          tone === "dark" ? "rgba(255,255,255,0.22)" : `color-mix(in srgb, ${a} 20%, transparent)`,
      }}
    >
      {eyebrow && (
        <div className="mb-2 text-xs font-bold tracking-wider" style={{ color: a }}>
          {eyebrow}
        </div>
      )}
      {title && <div className="mb-5">{title}</div>}
      <div className="prose-body">{children}</div>
    </section>
  );
}
