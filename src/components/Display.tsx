import type { ReactNode } from "react";

/**
 * 視線の「止まりどころ」を作るための表示部品。
 *
 * 本文と同じ大きさの文章が続くと、どこが結論か分からないまま読み流される。
 * ページの要点だけをこれらに昇格させて、拾い読みでも筋が通るようにする。
 */

/** 節の結論を大きく1行で言い切る。1セクションに1つまで。 */
export function PullQuote({
  accent,
  children,
  caption,
}: {
  accent: string;
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure className="my-7 border-l-4 pl-5 md:pl-6" style={{ borderColor: accent }}>
      <blockquote
        className="text-lg font-extrabold leading-relaxed tracking-tight md:text-2xl"
        style={{ color: "var(--color-ink)" }}
      >
        {children}
      </blockquote>
      {caption && (
        <figcaption className="mt-2 text-xs" style={{ color: "var(--color-ink-faint)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** 数字そのものを見せる。桁を大きく取って、視線の錨にする。 */
export function BigStat({
  value,
  unit,
  label,
  note,
  accent,
  muted = false,
}: {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  accent: string;
  muted?: boolean;
}) {
  const color = muted ? "var(--color-ink-faint)" : accent;
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span
          className="text-4xl font-black leading-none tracking-tight md:text-5xl"
          style={{ color }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-base font-bold" style={{ color }}>
            {unit}
          </span>
        )}
      </div>
      <div className="mt-2 text-sm font-bold" style={{ color: "var(--color-ink)" }}>
        {label}
      </div>
      {note && (
        <div className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>
          {note}
        </div>
      )}
    </div>
  );
}

/** 数字を横に並べる。区切り線で「同じ種類の話」だと分かるようにする。 */
export function StatRow({
  accent,
  items,
}: {
  accent: string;
  items: { value: string; unit?: string; label: string; note?: string; muted?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={i > 0 ? "md:border-l md:pl-6" : ""}
          style={i > 0 ? { borderColor: "var(--color-border-soft)" } : undefined}
        >
          <BigStat {...it} accent={accent} />
        </div>
      ))}
    </div>
  );
}

/** 本文の流れから外して置く注意書き・補足。 */
export function Callout({
  accent,
  label,
  children,
  variant = "note",
}: {
  accent: string;
  label?: string;
  children: ReactNode;
  variant?: "note" | "warn";
}) {
  const c = variant === "warn" ? "#c2410c" : accent;
  return (
    <div
      className="my-6 rounded-xl border-l-4 px-5 py-4"
      style={{
        borderColor: c,
        background: `color-mix(in srgb, ${c} 6%, var(--color-base-panel))`,
        ["--marker" as string]: `color-mix(in srgb, ${c} 26%, transparent)`,
      }}
    >
      {label && (
        <div className="mb-1.5 text-[0.7rem] font-extrabold tracking-wider" style={{ color: c }}>
          {label}
        </div>
      )}
      <div className="prose-body text-sm">{children}</div>
    </div>
  );
}

/** 手順・段階を横に流す。縦の箇条書きより「順番がある」ことが伝わる。 */
export function StepFlow({
  accent,
  steps,
}: {
  accent: string;
  steps: { title: string; desc: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
      {steps.map((s, i) => (
        <div key={s.title} className="relative flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.7rem] font-black text-white"
              style={{ background: accent }}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <span
                className="hidden h-[2px] flex-1 md:block"
                style={{ background: `color-mix(in srgb, ${accent} 35%, transparent)` }}
                aria-hidden
              />
            )}
          </div>
          <div className="text-sm font-bold" style={{ color: "var(--color-ink)" }}>
            {s.title}
          </div>
          <div className="mt-1 text-xs leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>
            {s.desc}
          </div>
        </div>
      ))}
    </div>
  );
}
