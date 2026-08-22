import type { ReactNode } from "react";

export type Era = "qual" | "final";

const ERA_LABEL: Record<Era, { tag: string; sub: string }> = {
  qual: { tag: "予選版", sub: "QUALIFIER" },
  final: { tag: "本戦版", sub: "FINAL" },
};

/** 見出しの横に置く小さなバージョン印。 */
export function EraStamp({ era, accent }: { era: Era; accent: string }) {
  const label = ERA_LABEL[era];
  if (era === "qual") {
    return (
      <span
        className="mr-2 inline-block translate-y-[-2px] rounded border border-dashed px-2 py-0.5 align-middle text-[0.62em] font-bold tracking-widest"
        style={{ borderColor: "var(--color-ink-faint)", color: "var(--color-ink-faint)" }}
      >
        {label.tag}
      </span>
    );
  }
  return (
    <span
      className="mr-2 inline-block translate-y-[-2px] rounded px-2 py-0.5 align-middle text-[0.62em] font-extrabold tracking-widest"
      style={{ background: accent, color: "#fff" }}
    >
      {label.tag}
    </span>
  );
}

/**
 * 予選版と本戦版の境界。ページを上下2つのゾーンに割るための帯。
 * 地続きに読ませないことが目的なので、意図的に大きく取っている。
 */
export function EraDivider({
  accent,
  headline,
  before,
  after,
  note,
}: {
  accent: string;
  headline: string;
  before: string;
  after: string;
  note?: ReactNode;
}) {
  return (
    <div className="relative py-2">
      {/* 断絶を示すギザギザの境界線 */}
      <div
        className="h-3 w-full"
        style={{
          background: `repeating-linear-gradient(135deg, ${"var(--color-border)"} 0 10px, transparent 10px 20px)`,
          maskImage: "linear-gradient(to bottom, black, black)",
        }}
        aria-hidden
      />

      <div
        className="mt-4 overflow-hidden rounded-2xl border-2"
        style={{ borderColor: accent, background: "var(--color-base-raised)" }}
      >
        <div className="px-6 py-3 text-center text-xs font-extrabold tracking-[0.3em]" style={{ background: accent, color: "#fff" }}>
          ここから作り直し
        </div>

        <div className="p-6 md:p-8">
          <p className="text-center text-lg font-extrabold leading-snug md:text-2xl" style={{ color: "var(--color-ink)" }}>
            {headline}
          </p>

          <div className="mt-6 grid grid-cols-1 items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
            <div
              className="rounded-xl border border-dashed p-4 text-center"
              style={{ borderColor: "var(--color-border)", background: "var(--color-base-panel)" }}
            >
              <div className="text-[0.65rem] font-bold tracking-widest" style={{ color: "var(--color-ink-faint)" }}>
                予選版 / QUALIFIER
              </div>
              <div className="mt-2 text-sm font-bold leading-relaxed md:text-base" style={{ color: "var(--color-ink-faint)" }}>
                {before}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-2xl font-black md:rotate-0" style={{ color: accent }} aria-hidden>
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            </div>

            <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: accent, background: "var(--color-base-raised)" }}>
              <div className="text-[0.65rem] font-extrabold tracking-widest" style={{ color: accent }}>
                本戦版 / FINAL
              </div>
              <div className="mt-2 text-sm font-extrabold leading-relaxed md:text-base" style={{ color: "var(--color-ink)" }}>
                {after}
              </div>
            </div>
          </div>

          {note && (
            <p className="mt-6 text-center text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 予選版と本戦版を左右に並べて比べる箱。
 *
 * EraDivider が「ページの境目」なのに対し、こちらは1つの論点を並べて見せるためのもの。
 * 差分を縦に積むのではなく、変更前後を同じ高さで突き合わせたいときに使う。
 */
export function EraCompare({
  accent,
  title,
  before,
  after,
  beforeLabel = "予選版",
  afterLabel = "本戦版",
  note,
}: {
  accent: string;
  title?: ReactNode;
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  note?: ReactNode;
}) {
  return (
    <div>
      {title && (
        <div className="mb-3 text-sm font-bold" style={{ color: "var(--color-ink)" }}>
          {title}
        </div>
      )}
      <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div
          className="flex flex-col rounded-xl border border-dashed p-4"
          style={{ borderColor: "var(--color-border)", background: "var(--color-base-panel)" }}
        >
          <div className="mb-3 text-[0.65rem] font-bold tracking-widest" style={{ color: "var(--color-ink-faint)" }}>
            {beforeLabel}
          </div>
          <div className="prose-body flex-1 text-sm">{before}</div>
        </div>

        <div className="flex items-center justify-center" aria-hidden>
          <span className="text-2xl font-black" style={{ color: accent }}>
            <span className="md:hidden">↓</span>
            <span className="hidden md:inline">→</span>
          </span>
        </div>

        <div
          className="flex flex-col rounded-xl border p-4"
          style={{
            borderColor: "var(--color-border-soft)",
            borderLeft: `5px solid ${accent}`,
            background: "var(--color-base-raised)",
          }}
        >
          <div className="mb-3 text-[0.65rem] font-extrabold tracking-widest" style={{ color: accent }}>
            {afterLabel}
          </div>
          <div className="prose-body flex-1 text-sm">{after}</div>
        </div>
      </div>
      {note && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>
          {note}
        </p>
      )}
    </div>
  );
}

/** 比較の中に画像を並べるための小さなタイル。 */
export function CompareTile({
  src,
  label,
  muted = false,
  hideLabel = false,
  onDark = false,
}: {
  src: string;
  label: string;
  muted?: boolean;
  /** 密に並べるときはキャプションを出さない（alt は残す）。 */
  hideLabel?: boolean;
  /** 濃い面の上に置くとき。素材が白背景でも沈まないように地を明るくする。 */
  onDark?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className="aspect-square overflow-hidden rounded-lg border"
        style={{
          borderColor: onDark ? "rgba(255,255,255,0.14)" : "var(--color-border-soft)",
          background: onDark
            ? "rgba(251,249,244,0.92)"
            : muted
              ? "var(--color-base)"
              : "var(--color-base-panel)",
        }}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-contain p-2"
          style={muted ? { filter: "grayscale(0.45)", opacity: 0.85 } : undefined}
        />
      </div>
      {!hideLabel && (
        <div
          className="mt-2 text-[0.68rem] leading-tight"
          style={{ color: onDark ? "rgba(251,249,244,0.6)" : "var(--color-ink-faint)" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

/**
 * 実機キャプチャ用のタイル。
 *
 * CompareTile が正方形なのは素材1枚を並べるためで、16:9のスクリーンショットには使えない。
 * こちらは画面の横幅をそのまま活かし、注目してほしい点をキャプションで添える。
 */
export function Shot({
  src,
  alt,
  caption,
  muted = false,
  onDark = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  /** 予選版など「過去の記録」として沈めて見せるとき。 */
  muted?: boolean;
  onDark?: boolean;
}) {
  return (
    <figure className="m-0">
      <div
        className={muted ? "overflow-hidden rounded-xl border border-dashed" : "overflow-hidden rounded-xl border"}
        style={{
          borderColor: onDark ? "rgba(255,255,255,0.18)" : muted ? "var(--color-border)" : "var(--color-border-soft)",
          background: onDark ? "rgba(0,0,0,0.35)" : "var(--color-base-panel)",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="block w-full"
          style={muted ? { filter: "grayscale(0.4)", opacity: 0.8 } : undefined}
        />
      </div>
      {caption && (
        <figcaption
          className="mt-2 text-xs leading-relaxed"
          style={{ color: onDark ? "rgba(251,249,244,0.6)" : "var(--color-ink-faint)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * ゾーンの見出し。ここから下がどのバージョンの話かを宣言する。
 * 予選ゾーンは資料然と、本戦ゾーンは主張の強い見た目にして、
 * スクロールしただけで「別物の話に入った」と分かるようにしている。
 */
export function EraZoneHeader({
  era,
  accent,
  title,
  lead,
}: {
  era: Era;
  accent: string;
  title: string;
  lead: ReactNode;
}) {
  const label = ERA_LABEL[era];
  const isFinal = era === "final";
  return (
    <div
      className={isFinal ? "rounded-2xl p-6 md:p-7" : "rounded-2xl border border-dashed p-5"}
      style={
        isFinal
          ? { background: accent, color: "#fff" }
          : { borderColor: "var(--color-border)", background: "var(--color-base-panel)" }
      }
    >
      <div
        className="text-[0.65rem] font-extrabold tracking-[0.28em]"
        style={{ color: isFinal ? "rgba(255,255,255,0.75)" : "var(--color-ink-faint)" }}
      >
        {label.tag} / {label.sub}
      </div>
      <div
        className={isFinal ? "mt-2 text-xl font-extrabold md:text-2xl" : "mt-1.5 text-base font-bold md:text-lg"}
        style={{ color: isFinal ? "#fff" : "var(--color-ink-dim)" }}
      >
        {title}
      </div>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: isFinal ? "rgba(255,255,255,0.9)" : "var(--color-ink-faint)" }}
      >
        {lead}
      </p>
    </div>
  );
}
