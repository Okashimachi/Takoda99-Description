import { NavLink } from "react-router-dom";
import { images } from "../assets/images";
import { navOrder, sections } from "../lib/accentTheme";
import { ArchDiagram } from "../components/ArchDiagram";
import { StatGrid } from "../components/Bits";
import { Disclosure } from "../components/Disclosure";
import { EraDivider } from "../components/Era";

const rules = [
  { n: "①", title: "客が注文", desc: "注文の個数 ＝ お題の単語数。1人あたり 2 / 4 / 8 個" },
  { n: "②", title: "速く正確にタイプ", desc: "打鍵の速さがそのまま作れた個数になる" },
  { n: "③", title: "スコアが積み上がる", desc: "スコア ＝ 作ったたこ焼きの数 − ミスの数。それだけ" },
  { n: "④", title: "20秒ごとに足切り", desc: "スコア下位から脱落。120秒で決着し、1位がチャンピオン" },
];

const qualRules = [
  { n: "①", title: "客が注文", desc: "注文の個数 ＝ お題の単語数" },
  { n: "②", title: "速く正確にタイプ", desc: "打鍵の速度とミス数が評価に直結する" },
  { n: "③", title: "提供 → 評価↑", desc: "提供が遅れると客が離脱して信用が減る" },
  { n: "④", title: "下位は強制脱落", desc: "評価下位は定期的に淘汰。最後の1店が優勝" },
];

const rebuildLinks = [
  {
    to: "/planning#honsen",
    accent: "var(--color-planning)",
    label: "企画",
    title: "なぜ根幹から変えたか",
    desc: "視線誘導で見せる案を却下し、見られていない情報を捨てる案を採った理由。20秒等間隔×6段階の足切りと、最後の1人を残さない決着。",
  },
  {
    to: "/client#honsen",
    accent: "var(--color-client)",
    label: "クライアント",
    title: "契約の破壊的変更を吸収する",
    desc: "MatchEnd が空クラスになってもアーキテクチャは作り直さずに済んだ話。撤去・ランキングUIの新設・予選のバグを設計で潰した話。",
  },
  {
    to: "/server",
    accent: "var(--color-server)",
    label: "サーバー",
    title: "スコアの重みを実測で決める",
    desc: "「速さ型と正確型の平均順位が拮抗する点」を基準に、シミュレーションを回して重みを詰めた話。",
  },
];

const stack = [
  "Go", "Unity (WebGL)", "C#", "WebSocket", "Protocol Buffers",
  "Supabase (Postgres)", "GCP Compute Engine", "Caddy",
];

const teamGithub = "https://github.com/Okashimachi";

const team = [
  {
    name: "カシュー",
    role: "企画/仕様・開発手法・クライアント (Unity / pureC#) ・本サイト",
    icon: images.team.cashew,
    accent: "var(--color-planning)",
    github: "https://github.com/kdix-23-240",
    x: "https://x.com/game_game_nuts",
  },
  {
    name: "りーせ",
    role: "サーバー (Go)",
    icon: images.team.rise,
    accent: "var(--color-server)",
    github: "https://github.com/ru-se",
    x: "https://x.com/ri_se_yu",
  },
  {
    name: "たまちゃ",
    role: "アート",
    icon: images.team.tamatya,
    accent: "var(--color-art)",
    github: "https://github.com/tamtya",
    x: "https://x.com/tamtya_joho",
  },
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  );
}

function SocialLinks({ github, x, accent, label }: { github: string; x?: string; accent: string; label: string }) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-colors hover:text-white";
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <a
        href={github}
        target="_blank"
        rel="noreferrer noopener"
        className={base}
        style={{ borderColor: accent, color: accent }}
        onMouseEnter={(e) => (e.currentTarget.style.background = accent)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        aria-label={`${label} の GitHub`}
      >
        <GithubIcon /> GitHub
      </a>
      {x && (
        <a
          href={x}
          target="_blank"
          rel="noreferrer noopener"
          className={base}
          style={{ borderColor: accent, color: accent }}
          onMouseEnter={(e) => (e.currentTarget.style.background = accent)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          aria-label={`${label} の X`}
        >
          <XIcon /> X
        </a>
      )}
    </div>
  );
}

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
            src={images.logo.full}
            alt="たこ打99"
            className="mx-auto mb-6 h-24 rounded-2xl object-contain shadow-lg md:h-32"
          />
          {/* ロゴ画像にタイトルが入っているため、見出しは読み上げ/SEO用に隠している */}
          <h1 className="sr-only">たこ打99</h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
            <span
              className="rounded-full px-3 py-1 tracking-widest text-white"
              style={{ background: "var(--color-top)" }}
            >
              本戦版 / FINAL
            </span>
            <span style={{ color: "var(--color-ink-faint)" }}>
              予選のフィードバックを受けて、ゲーム性の根幹から作り替えました
            </span>
          </div>
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
            <a
              href="#rebuild"
              className="rounded-full border px-6 py-3 text-sm font-bold transition-colors"
              style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}
            >
              予選 → 本戦の差分
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] space-y-20 px-6 py-16 md:py-20">
        {/* 30秒でわかるルール */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            30秒でわかるルール
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--color-ink-dim)" }}>
            <strong style={{ color: "var(--color-ink)" }}>速く正確に打った順に生き残る。</strong>
            体力もなく、客の当たり外れもなく、運で決まる要素はひとつもない。
          </p>
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

          <div className="mt-6">
            <Disclosure summary="予選版のルールはこうだった（本戦で廃止した2つの数値）" accent="var(--color-top)">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {qualRules.map((r) => (
                  <div
                    key={r.n}
                    className="rounded-xl border border-dashed p-4"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-base-panel)" }}
                  >
                    <div className="text-lg font-extrabold" style={{ color: "var(--color-ink-faint)" }}>{r.n}</div>
                    <div className="mt-1 text-sm font-bold" style={{ color: "var(--color-ink-dim)" }}>{r.title}</div>
                    <div className="mt-1 text-xs leading-relaxed" style={{ color: "var(--color-ink-faint)" }}>{r.desc}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                予選版は<strong>評価</strong>（相対ランキング）と<strong>信用</strong>（体力）の2つの数値で勝敗が決まり、
                客の属性や離脱といった<strong>運の要素が評価を動かしていた</strong>。
                本戦ではその2つとも廃止して、スコア1本に畳んでいる。
              </p>
            </Disclosure>
          </div>
        </section>

        {/* 予選 → 本戦 */}
        <section id="rebuild" className="scroll-mt-24">
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            予選 → 本戦：根幹から作り替えました
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>
            予選で最も多かったフィードバックは
            <strong style={{ color: "var(--color-ink)" }}>「お題しか見られない」</strong>。
            大阪会場の実戦では、
            <strong style={{ color: "var(--color-ink)" }}>より正確でクリア数も多くミスも少なかった側が負けた</strong>。
            運として説明はつくが、納得感のある敗北になっていない。
            本戦ではここを起点に、<strong style={{ color: "var(--color-ink)" }}>勝敗の決まりかたごと作り替えた</strong>。
          </p>

          <div className="mt-8">
            <EraDivider
              accent="var(--color-top)"
              headline="「体力を見せて耐えるゲーム」から「順位を見て走るゲーム」へ"
              before="体力で死ぬ／評価で死ぬ の2経路。評価は実力＋運（客の属性・離脱）で動く"
              after="スコア（作ったたこ焼き数 − ミス数）の一本。20秒ごとに下位が切られる"
              note={
                <>
                  機能を足して分かりやすくするのではなく、<strong>削って分かりやすくする</strong>方向に振り切った。
                  結果として、サーバー・クライアント双方の実装まで一緒に軽くなっている。
                </>
              }
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {rebuildLinks.map((c) => (
              <NavLink
                key={c.to}
                to={c.to}
                className="group flex flex-col rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  borderColor: "var(--color-border-soft)",
                  borderLeft: `5px solid ${c.accent}`,
                  background: "var(--color-base-raised)",
                }}
              >
                <div className="text-[0.65rem] font-extrabold tracking-widest" style={{ color: c.accent }}>
                  {c.label}の本戦差分へ
                </div>
                <div className="mt-2 font-extrabold" style={{ color: "var(--color-ink)" }}>{c.title}</div>
                <div className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>{c.desc}</div>
                <div className="mt-4 text-sm font-bold transition-transform group-hover:translate-x-1" style={{ color: c.accent }}>
                  読む →
                </div>
              </NavLink>
            ))}
          </div>
        </section>

        {/* ゲーム画面 */}
        <section>
          <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
            ゲーム画面
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { src: images.screens.matchMain, caption: "マッチ画面（自店の屋台と注文）" },
              { src: images.screens.matchIngame, caption: "対戦中の盤面（99店のスキャン）" },
            ].map((s) => (
              <figure key={s.src}>
                <div
                  className="overflow-hidden rounded-2xl border"
                  style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
                >
                  <img src={s.src} alt={s.caption} className="w-full object-contain" />
                </div>
                <figcaption className="mt-2 text-xs" style={{ color: "var(--color-ink-faint)" }}>{s.caption}</figcaption>
              </figure>
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
                { label: "試合時間（固定）", value: "120秒" },
                { label: "足切りの段階", value: "20秒ごと×6" },
                { label: "決勝に残る店", value: "10店" },
                { label: "スコアの重み", value: "100 : 28" },
                { label: "ゲームロジックの所在", value: "サーバー権威" },
                { label: "技術構成", value: "Go + Unity WebGL" },
                { label: "リポジトリ / メンバー", value: "5本 / 3人" },
              ]}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>
            <strong style={{ color: "var(--color-ink)" }}>スコアの重み 100 : 28</strong>
            は「たこ焼き1個あたりの加点 : ミス1打鍵あたりの減点」。
            <strong style={{ color: "var(--color-ink)" }}>速さ型と正確型の平均順位が拮抗する点</strong>
            をシミュレーションで探して決めた値で、当日は設定から変更できる（ビルド不要）。
            人間が99人に満たない場合はBotで補完し、
            <strong style={{ color: "var(--color-ink)" }}>常に99店</strong>で試合を行う。
          </p>
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
          <div className="flex items-center gap-3">
            <img
              src={images.team.okashimachi}
              alt="おかしまち"
              className="h-12 w-12 rounded-xl object-contain"
              style={{ background: "var(--color-base-panel)" }}
            />
            <h2 className="text-2xl font-extrabold md:text-3xl" style={{ color: "var(--color-ink)" }}>
              チーム「おかしまち」
            </h2>
          </div>
          <p className="mt-3 text-sm" style={{ color: "var(--color-ink-dim)" }}>3人でこれを作りました。</p>
          <div className="mt-4">
            <SocialLinks github={teamGithub} accent="var(--color-top)" label="チームおかしまち" />
          </div>
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
                />
                <div className="mt-4 text-lg font-extrabold" style={{ color: "var(--color-ink)" }}>{m.name}</div>
                <div className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>{m.role}</div>
                <div className="mt-4">
                  <SocialLinks github={m.github} x={m.x} accent={m.accent} label={m.name} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
