import { NavLink } from "react-router-dom";
import { nextPage, sections, type SectionKey } from "../lib/accentTheme";

export function NextPageNav({ current }: { current: SectionKey }) {
  const next = sections[nextPage[current]];
  return (
    <NavLink
      to={next.path}
      className="group mt-12 flex items-center justify-between rounded-2xl border p-6 transition-colors md:p-8"
      style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-raised)" }}
    >
      <div>
        <div className="text-xs font-bold" style={{ color: "var(--color-ink-faint)" }}>
          次はこれ
        </div>
        <div className="mt-1 text-xl font-extrabold md:text-2xl" style={{ color: next.accent }}>
          {next.label}
        </div>
        <div className="mt-1 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          {next.tagline}
        </div>
      </div>
      <div
        className="text-2xl transition-transform group-hover:translate-x-1"
        style={{ color: next.accent }}
      >
        →
      </div>
    </NavLink>
  );
}

export function Footer() {
  return (
    <footer
      className="mt-auto border-t px-6 py-10 text-center text-xs"
      style={{ borderColor: "var(--color-border-soft)", color: "var(--color-ink-faint)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-2">たこ打99 — チーム「おかしまち」</p>
        <p>
          <a
            href="https://github.com/Okashimachi/Takoda99-Description"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-dotted hover:text-inherit"
          >
            GitHub リポジトリ
          </a>
          {" ・ "}
          <a
            href="https://unityroom.com/games/takoda99"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-dotted hover:text-inherit"
          >
            unityroom で遊ぶ
          </a>
        </p>
      </div>
    </footer>
  );
}
