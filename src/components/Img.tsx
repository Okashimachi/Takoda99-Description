/**
 * 素材が無いところに壊れた画像を出さないための薄いラッパ。
 *
 * images.ts の値は「まだ素材が無い」を null で表しているので、
 * null なら要素ごと描かず、代わりに placeholder（あれば）を出す。
 */
export function Img({
  src,
  alt,
  className,
  placeholder,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** src が無いときに代わりに出すもの。省略すると何も描かない。 */
  placeholder?: React.ReactNode;
}) {
  if (!src) return <>{placeholder ?? null}</>;
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

/** 素材待ちの枠。中に「準備中」とだけ出す。 */
export function ImgPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed text-center text-[0.65rem] leading-relaxed ${className}`}
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-base-panel)",
        color: "var(--color-ink-faint)",
      }}
    >
      {label}
    </div>
  );
}
