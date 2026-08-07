import { NavLink } from "react-router-dom";
import { images } from "../assets/images";
import { navOrder, sections } from "../lib/accentTheme";
import { ArchDiagram } from "../components/ArchDiagram";
import { StatGrid } from "../components/Bits";

const rules = [
  { n: "①", title: "客が注文", desc: "注文の個数 ＝ お題の単語数" },
  { n: "②", title: "速く正確にタイプ", desc: "打鍵の速度とミス数が評価に直結する" },
  { n: "③", title: "提供 → 評価↑", desc: "提供が遅れると客が離脱して信用が減る" },
  { n: "④", title: "下位は強制脱落", desc: "評価下位は定期的に淘汰。最後の1店が優勝" },
];

const stack = [
  "Go", "Unity (WebGL)", "C#", "WebSocket", "Protocol Buffers",
  "Supabase (Postgres)", "GCP Compute Engine", "Caddy",
];

const team = [
  { name: "カシュー", role: "企画/仕様・開発手法・クライアント (Unity / pureC#) ・本サイト", icon: images.team.cashew, accent: "var(--color-planning)" },
  { name: "りーせ", role: "サーバー (Go)", icon: images.team.rise, accent: "var(--color-server)" },
  { name: "たまちゃ", role: "アート", icon: images.team.tamatya, accent: "var(--color-art)" },
];

export default function TopPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--color-border-soft)" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(251,249,244,0.75), rgba(251,249,244,0.97)), url(${images.screens.matchMain})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 text-center md:py-36">
          <img
            src={images.logo.title}
            alt="たこ打99"
            className="mx-auto mb-6 h-16 object-contain md:h-24"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl" style={{ color: "var(--color-ink)" }}>
            たこ打99
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-xl" style={{ color: "var(--color-ink-dim)" }}>
            寿司打のタイピングを、大阪のたこ焼き激戦区での
            <br className="hidden md:block" />
            サバイバルに乗せる。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://unityroom.com/games/takoda99"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-105"
              style={{ background: "var(--color-top)", color: "#1a0e05" }}
            >
              ▶ 遊んでみる
            </a>
            <NavLink
              to="/process"
              className="rounded-full border px-6 py-3 text-sm font-bold transition-colors"
              style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
            >
              作り方を見る
            </NavLink>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] space-y-20 px-6 py-16 md:py-20">
        {/* 30秒でわかるルール */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            30秒でわかるルール
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {rules.map((r) => (
              <div
                key={r.n}
                className="rounded-2xl border p-5"
                style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-raised)" }}
              >
                <div className="text-2xl font-extrabold" style={{ color: "var(--color-top)" }}>{r.n}</div>
                <div className="mt-2 font-bold" style={{ color: "var(--color-ink)" }}>{r.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 数字で見る */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            数字で見る、たこ打99
          </h2>
          <div className="mt-8">
            <StatGrid
              items={[
                { label: "同時対戦店舗数", value: "99店" },
                { label: "客の総数", value: "300人固定" },
                { label: "1試合の目安", value: "約2分" },
                { label: "リポジトリ数", value: "5本" },
                { label: "ゲームロジックの所在", value: "サーバー権威" },
                { label: "技術構成", value: "Go + Unity WebGL" },
                { label: "開発メンバー", value: "3人" },
                { label: "公開範囲", value: "全リポジトリ Public" },
              ]}
            />
          </div>
        </section>

        {/* 技術スタック */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            技術スタック
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border px-4 py-2 text-sm font-mono"
                style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* アーキテクチャ全体図 */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            アーキテクチャ全体図
          </h2>
          <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--color-ink-dim)" }}>
            Proto を唯一の結合点として、クライアントとサーバーが独立に開発できる形にしている。詳細は
            <NavLink to="/process" className="mx-1 underline" style={{ color: "var(--color-process)" }}>開発手法</NavLink>
            と
            <NavLink to="/server" className="mx-1 underline" style={{ color: "var(--color-server)" }}>サーバー</NavLink>
            のページへ。
          </p>
          <div
            className="mt-8 rounded-2xl border p-6"
            style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-raised)" }}
          >
            <ArchDiagram />
          </div>
        </section>

        {/* 5領域カード */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            5つの領域を掘る
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-ink-dim)" }}>
            3分で概要、掘れば30分。気になるところから読んでください。
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {navOrder.map((key, i) => {
              const s = sections[key];
              const highlight: Record<string, string> = {
                planning: "なぜこのゲームなのか、意思決定の見せ場",
                process: "このチームの一番の武器",
                client: "サーバー権威下の薄いクライアント設計",
                server: "技術的な密度が最も高いページ",
                art: "大阪をどう画面に落とすか",
              };
              const badge: Partial<Record<string, string>> = {
                process: "★ 一番のオススメ",
                server: "★ 技術密度No.1",
              };
              return (
                <NavLink
                  key={key}
                  to={s.path}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border-2 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ borderColor: s.accent, background: s.accentBg }}
                >
                  <div
                    className="absolute -right-6 -top-6 text-8xl font-black opacity-10 transition-opacity group-hover:opacity-20"
                    style={{ color: s.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {badge[key] && (
                    <span
                      className="relative mb-3 inline-block w-fit rounded-full px-3 py-1 text-[11px] font-extrabold text-white"
                      style={{ background: s.accent }}
                    >
                      {badge[key]}
                    </span>
                  )}
                  <div className="relative text-xs font-bold" style={{ color: s.accent }}>{s.tagline}</div>
                  <div className="relative mt-2 text-2xl font-extrabold" style={{ color: "var(--color-ink)" }}>{s.label}</div>
                  <div className="relative mt-2 text-sm" style={{ color: "var(--color-ink-dim)" }}>{highlight[key]}</div>
                  <div
                    className="relative mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold text-white transition-transform group-hover:translate-x-1"
                    style={{ background: s.accent }}
                  >
                    読む <span aria-hidden>→</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </section>

        {/* チーム紹介 */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            チーム「おかしまち」
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--color-ink-dim)" }}>3人でこれを作りました。</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border p-6 text-center"
                style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-raised)" }}
              >
                <img
                  src={m.icon}
                  alt={m.name}
                  className="mx-auto h-20 w-20 rounded-full border-2 object-cover"
                  style={{ borderColor: m.accent, background: "var(--color-base-panel)" }}
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <div className="mt-4 text-lg font-extrabold" style={{ color: "var(--color-ink)" }}>{m.name}</div>
                <div className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>{m.role}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
