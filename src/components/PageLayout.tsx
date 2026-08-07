import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SectionKey } from "../lib/accentTheme";
import { sections } from "../lib/accentTheme";
import { NextPageNav } from "./Footer";

export interface TocItem {
  id: string;
  label: string;
}

interface PageLayoutProps {
  section: SectionKey;
  title: string;
  lead: string;
  toc: TocItem[];
  children: ReactNode;
  ownerLine?: string;
}

export function PageLayout({ section, title, lead, toc, children, ownerLine }: PageLayoutProps) {
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

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:py-14">
      <div
        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold"
        style={{ background: theme.accentBg, color: theme.accent }}
      >
        {theme.tagline}
      </div>
      <h1
        className="text-3xl font-extrabold tracking-tight md:text-5xl"
        style={{ color: "var(--color-ink)" }}
      >
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--color-ink-dim)" }}>
        {lead}
      </p>
      {ownerLine && (
        <p className="mt-2 text-sm font-semibold" style={{ color: theme.accent }}>
          {ownerLine}
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 border-l pl-4" style={{ borderColor: "var(--color-border-soft)" }}>
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block py-1 text-sm transition-colors"
                style={{
                  color: activeId === item.id ? theme.accent : "var(--color-ink-faint)",
                  fontWeight: activeId === item.id ? 700 : 400,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 space-y-8">{children}</main>
      </div>

      <NextPageNav current={section} />
    </div>
  );
}

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-xl font-extrabold md:text-2xl"
      style={{ color: "var(--color-ink)" }}
    >
      {children}
    </h2>
  );
}
