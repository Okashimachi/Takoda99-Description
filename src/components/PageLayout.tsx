import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import type { SectionKey } from "../lib/accentTheme";
import { sections } from "../lib/accentTheme";
import { NextPageNav } from "./Footer";

export interface TocItem {
  id: string;
  label: string;
  /** ここから新しいグループが始まることを示す見出し。 */
  group?: string;
  /** グループ見出しの色。省略時はセクションのアクセント。 */
  groupColor?: string;
}

interface PageLayoutProps {
  section: SectionKey;
  title: string;
  lead: string;
  toc: TocItem[];
  children: ReactNode;
  ownerLine?: string;
  /** タイトル帯の右に敷く絵。無ければ文字だけの帯になる。 */
  heroImage?: string | null;
}

/** スクロール量を上端の細いバーで返す。現在地が分かるだけで読む負荷が下がる。 */
function ReadingProgress({ accent }: { accent: string }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-16 z-30 h-[3px]" style={{ background: "transparent" }} aria-hidden>
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%`, background: accent }}
      />
    </div>
  );
}

/** 画面に入ったらふわっと出す。動きは1回だけで、繰り返さない。 */
function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver が動かない環境で本文が消えたままにならないようにする
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const failsafe = window.setTimeout(() => el.classList.add("is-in"), 2000);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

export function PageLayout({
  section,
  title,
  lead,
  toc,
  children,
  ownerLine,
  heroImage,
}: PageLayoutProps) {
  const theme = sections[section];
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.current?.observe(el));
    return () => observer.current?.disconnect();
  }, [toc]);

  const activeIndex = Math.max(0, toc.findIndex((t) => t.id === activeId));

  return (
    <div style={{ ["--accent" as string]: theme.accent }}>
      <ReadingProgress accent={theme.accent} />

      {/* ── タイトル帯：ページの入口をはっきり作る ───────────── */}
      <header
        className="relative overflow-hidden border-b"
        style={{ borderColor: "var(--color-border-soft)", background: theme.accentBg }}
      >
        {heroImage && (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block"
            style={{
              backgroundImage: `linear-gradient(90deg, var(--color-base) 4%, rgba(251,249,244,0.4) 55%, rgba(251,249,244,0.15)), url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.55,
            }}
            aria-hidden
          />
        )}
        {/* 大きく薄い通し番号。帯に奥行きを出すためだけの飾り */}
        <div
          className="pointer-events-none absolute -bottom-10 right-6 select-none text-[9rem] font-black leading-none md:text-[13rem]"
          style={{ color: theme.accent, opacity: 0.07 }}
          aria-hidden
        >
          {String(Math.max(1, ["planning", "process", "client", "server", "art"].indexOf(section) + 1)).padStart(2, "0")}
        </div>

        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-14 md:py-20">
          <div
            className="inline-block rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: "var(--color-base-raised)", color: theme.accent }}
          >
            {theme.tagline}
          </div>
          <h1
            className="mt-4 text-4xl font-black tracking-tight md:text-6xl"
            style={{ color: "var(--color-ink)" }}
          >
            {title}
          </h1>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-ink-dim)" }}
          >
            {lead}
          </p>
          {ownerLine && (
            <p className="mt-4 flex items-center gap-2 text-sm font-bold" style={{ color: theme.accent }}>
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: theme.accent }} aria-hidden />
              {ownerLine}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1200px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[210px_1fr]">
          {/* ── 目次：番号と現在地バーで「どこを読んでいるか」を返す ── */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <div
                className="mb-3 text-[0.65rem] font-extrabold tracking-[0.2em]"
                style={{ color: "var(--color-ink-faint)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")} / {String(toc.length).padStart(2, "0")}
              </div>
              <div className="space-y-0.5 border-l" style={{ borderColor: "var(--color-border-soft)" }}>
                {toc.map((item, i) => {
                  const on = activeId === item.id;
                  return (
                    <div key={item.id}>
                      {item.group && (
                        <div
                          className="mb-1.5 mt-4 pl-4 text-[0.6rem] font-extrabold tracking-[0.2em] first:mt-0"
                          style={{ color: item.groupColor ?? theme.accent }}
                        >
                          {item.group}
                        </div>
                      )}
                      <a
                        href={`#${item.id}`}
                        className="group relative flex items-baseline gap-2 py-1.5 pl-4 text-sm transition-all"
                        style={{
                          color: on ? theme.accent : "var(--color-ink-faint)",
                          fontWeight: on ? 700 : 400,
                        }}
                      >
                        <span
                          className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 transition-all duration-200"
                          style={{ background: theme.accent, height: on ? "70%" : 0 }}
                          aria-hidden
                        />
                        <span className="font-mono text-[0.65rem] opacity-60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{item.label}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </nav>
          </aside>

          <main className="min-w-0 space-y-10 md:space-y-14">
            {Children.toArray(children).map((child, i) => (
              <Reveal key={i}>{child}</Reveal>
            ))}
          </main>
        </div>

        <NextPageNav current={section} />
      </div>
    </div>
  );
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="section-heading scroll-mt-28 text-2xl font-black leading-tight tracking-tight md:text-[1.75rem]"
    >
      <span>{children}</span>
    </h2>
  );
}
