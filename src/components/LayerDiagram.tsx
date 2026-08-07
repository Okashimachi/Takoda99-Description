export function LayerDiagram() {
  return (
    <svg viewBox="0 0 900 300" className="w-full" role="img" aria-label="サーバー層アーキテクチャ図">
      <rect x="20" y="20" width="860" height="60" rx="10" fill="var(--color-server-bg)" stroke="var(--color-server)" strokeWidth="1.5" />
      <text x="450" y="45" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="700">層3 差し替え部品</text>
      <text x="450" y="64" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="11">odai / config / bot / store / db — 拡張はここ</text>

      <line x1="450" y1="80" x2="450" y2="100" stroke="var(--color-ink-faint)" strokeWidth="1.5" />

      <rect x="20" y="100" width="860" height="60" rx="10" fill="var(--color-top-bg)" stroke="var(--color-top)" strokeWidth="1.5" />
      <text x="450" y="125" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="700">層2 継ぎ目 = interface（game/ports.go, DIP）</text>
      <text x="450" y="144" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="11">定義して凍結</text>

      <line x1="450" y1="160" x2="450" y2="180" stroke="var(--color-ink-faint)" strokeWidth="1.5" />

      <rect x="20" y="180" width="860" height="60" rx="10" fill="var(--color-planning-bg)" stroke="var(--color-planning)" strokeWidth="1.5" />
      <text x="450" y="205" textAnchor="middle" fill="var(--color-ink)" fontSize="13" fontWeight="700">層1 コア game（試合の権威）</text>
      <text x="450" y="224" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="11">不可侵</text>

      <rect x="20" y="255" width="860" height="40" rx="10" fill="var(--color-base-panel)" stroke="var(--color-border)" strokeWidth="1.5" />
      <text x="450" y="279" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">スパイン（room / matchmaking / transport / configapi）＝ 統合部</text>
    </svg>
  );
}
