import { NavLink } from "react-router-dom";
import { navOrder, sections } from "../lib/accentTheme";
import { images } from "../assets/images";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ borderColor: "var(--color-border-soft)", background: "rgba(251,249,244,0.9)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img src={images.logo.full} alt="" className="h-8 w-8 rounded-md object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span className="text-lg font-extrabold tracking-tight" style={{ color: "var(--color-ink)" }}>
            たこ打99
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navOrder.map((key) => {
            const s = sections[key];
            return (
              <NavLink
                key={key}
                to={s.path}
                className="relative rounded-lg px-3.5 py-2 text-sm font-bold transition-colors"
                style={({ isActive }) => ({
                  color: isActive ? s.accent : "var(--color-ink-dim)",
                  background: isActive ? s.accentBg : "transparent",
                })}
              >
                {s.label}
              </NavLink>
            );
          })}
        </nav>

        <a
          href="https://unityroom.com/games/takoda99"
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-transform hover:scale-105"
          style={{ background: "var(--color-top)", color: "#1a0e05" }}
        >
          ▶ 遊んでみる
        </a>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t px-4 py-2 lg:hidden" style={{ borderColor: "var(--color-border-soft)" }}>
        {navOrder.map((key) => {
          const s = sections[key];
          return (
            <NavLink
              key={key}
              to={s.path}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold"
              style={({ isActive }) => ({
                color: isActive ? s.accent : "var(--color-ink-dim)",
                background: isActive ? s.accentBg : "transparent",
              })}
            >
              {s.label}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
