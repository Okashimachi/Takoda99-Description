/**
 * サーバーページ専用の図。
 *
 * 文字だけのページになると読み飛ばされるので、
 * 「言葉で説明すると長いが、絵にすると一目で分かる」ものだけを図にしている。
 */

/**
 * 配信の配り分け。
 *
 * 「全部を短い間隔で配る」から「値の性質ごとに間隔を分ける」へ変えた話は、
 * 文章だと『順位は1秒、スコアは秒4回…』という数字の羅列になって頭に入らない。
 * 帯の長さで見せると、間引き方の違いがそのまま目に入る。
 */
export function BandwidthDiagram() {
  const rows = [
    { label: "自分のスコア", note: "手応えに直結する", ticks: 8, accent: "var(--color-server)" },
    { label: "次の足切りまでの秒読み", note: "受信時刻から補間できる", ticks: 4, accent: "var(--color-planning)" },
    { label: "全店の順位表", note: "ゆっくりで足りる", ticks: 2, accent: "var(--color-top)" },
  ];
  return (
    <svg viewBox="0 0 900 260" className="w-full" role="img" aria-label="値の性質ごとに配信間隔を分ける図">
      <text x="20" y="26" fill="var(--color-ink-faint)" fontSize="11" fontWeight="700">
        予選版 — 全部を同じ短い間隔で全員へ
      </text>
      <rect x="20" y="38" width="860" height="34" rx="8" fill="var(--color-base-panel)" stroke="var(--color-border)" strokeDasharray="4 3" />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={30 + i * 53} width="44" y="46" height="18" rx="3" fill="var(--color-ink-faint)" opacity="0.5" />
      ))}
      <text x="450" y="92" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="11">
        全店の詳細をまとめて配る。会場の回線には重すぎた
      </text>

      <line x1="450" y1="104" x2="450" y2="126" stroke="var(--color-server)" strokeWidth="2" />
      <path d="M444,120 L450,130 L456,120 Z" fill="var(--color-server)" />

      <text x="20" y="152" fill="var(--color-server)" fontSize="11" fontWeight="800">
        本戦版 — 値の性質ごとに間隔を分ける
      </text>
      {rows.map((r, ri) => {
        const y = 164 + ri * 32;
        const w = 860 / r.ticks;
        return (
          <g key={r.label}>
            <text x="20" y={y + 14} fill="var(--color-ink)" fontSize="11" fontWeight="700">
              {r.label}
            </text>
            <text x="20" y={y + 27} fill="var(--color-ink-faint)" fontSize="9.5">
              {r.note}
            </text>
            {Array.from({ length: r.ticks }).map((_, i) => (
              <rect
                key={i}
                x={250 + i * ((630 + 6) / r.ticks)}
                y={y + 4}
                width={(630 + 6) / r.ticks - 6}
                height="18"
                rx="3"
                fill={r.accent}
                opacity={0.75}
              />
            ))}
            <line x1="250" y1={y + 28} x2="880" y2={y + 28} stroke="var(--color-border-soft)" strokeWidth="0.75" />
            <text x={String(w)} y={y} fill="transparent" fontSize="1">.</text>
          </g>
        );
      })}
      <text x="880" y="258" textAnchor="end" fill="var(--color-ink-faint)" fontSize="10">
        → 1試合あたりの通信量は 675MB から 71MB へ
      </text>
    </svg>
  );
}

/**
 * 脱落したあとも情報が届き続けること。
 *
 * 「98人は観戦者として過ごす」という事実は、言われないと気づかれない。
 * 時間軸に人数を重ねると、観戦している時間の長さが視覚的に分かる。
 */
export function SpectatorDiagram() {
  const stages = [
    { t: "0s", alive: 99 },
    { t: "20s", alive: 75 },
    { t: "40s", alive: 55 },
    { t: "60s", alive: 35 },
    { t: "80s", alive: 20 },
    { t: "100s", alive: 10 },
    { t: "120s", alive: 0 },
  ];
  const x = (i: number) => 70 + i * 128;
  const y = (a: number) => 150 - (a / 99) * 100;
  const pts = stages.map((s, i) => `${x(i)},${y(s.alive)}`).join(" ");
  const area = `70,150 ${pts} ${x(stages.length - 1)},150`;

  return (
    <svg viewBox="0 0 900 240" className="w-full" role="img" aria-label="試合が進むほど観戦者が増えることを示す図">
      {/* 観戦者の面 */}
      <rect x="70" y="50" width={x(6) - 70} height="100" fill="var(--color-server)" opacity="0.1" />
      <polygon points={area} fill="var(--color-base-raised)" stroke="none" />
      <polyline points={pts} fill="none" stroke="var(--color-server)" strokeWidth="2.5" />

      {stages.map((s, i) => (
        <g key={s.t}>
          <line x1={x(i)} y1="50" x2={x(i)} y2="150" stroke="var(--color-border-soft)" strokeWidth="0.75" />
          <circle cx={x(i)} cy={y(s.alive)} r="4" fill="var(--color-server)" />
          <text x={x(i)} y="168" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">
            {s.t}
          </text>
          <text x={x(i)} y={y(s.alive) - 10} textAnchor="middle" fill="var(--color-ink)" fontSize="10" fontWeight="700">
            {s.alive}
          </text>
        </g>
      ))}

      <text x="70" y="40" fill="var(--color-ink-dim)" fontSize="11" fontWeight="700">
        まだ打っている人
      </text>
      <text x="450" y="112" textAnchor="middle" fill="var(--color-server)" fontSize="13" fontWeight="800">
        ここが全部「観戦している人」
      </text>
      <text x="450" y="132" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="10.5">
        早く落ちた人ほど、この時間が長い
      </text>

      <text x="70" y="205" fill="var(--color-ink-faint)" fontSize="10.5">
        脱落しても、順位表・次の区切りまでの秒読み・次に落ちそうな店は届き続ける
      </text>
      <text x="70" y="222" fill="var(--color-ink-faint)" fontSize="10.5">
        （当初は脱落した時点で秒読みが止まり、順位だけが動く画面になっていた）
      </text>
    </svg>
  );
}
