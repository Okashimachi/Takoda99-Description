export function ArchDiagram() {
  return (
    <svg viewBox="0 0 900 320" className="w-full" role="img" aria-label="アーキテクチャ全体図">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-ink-faint)" />
        </marker>
      </defs>

      {/* Browser */}
      <rect x="20" y="110" width="190" height="100" rx="12" fill="var(--color-client-bg)" stroke="var(--color-client)" strokeWidth="1.5" />
      <text x="115" y="145" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="700">ブラウザ</text>
      <text x="115" y="165" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="11">Unity WebGL</text>
      <text x="115" y="182" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">MVU クライアント</text>

      {/* arrow wss */}
      <line x1="210" y1="160" x2="330" y2="160" stroke="var(--color-ink-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="330" y1="180" x2="210" y2="180" stroke="var(--color-ink-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="270" y="150" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">wss (Envelope/Proto)</text>

      {/* GCP box */}
      <rect x="330" y="70" width="240" height="180" rx="12" fill="var(--color-server-bg)" stroke="var(--color-server)" strokeWidth="1.5" />
      <text x="450" y="95" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="700">GCP Compute Engine (e2-micro)</text>

      <rect x="350" y="112" width="200" height="42" rx="8" fill="var(--color-base)" stroke="var(--color-border)" />
      <text x="450" y="138" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="12">Caddy (Let's Encrypt)</text>

      <line x1="450" y1="154" x2="450" y2="166" stroke="var(--color-ink-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />

      <rect x="350" y="168" width="200" height="66" rx="8" fill="var(--color-base)" stroke="var(--color-border)" />
      <text x="450" y="190" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="700">takoda99-server</text>
      <text x="450" y="207" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">Go / goroutine / systemd</text>
      <text x="450" y="222" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">room / matchmaking / game</text>

      {/* arrow to supabase */}
      <line x1="570" y1="160" x2="690" y2="160" stroke="var(--color-ink-faint)" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="630" y="150" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">SQL</text>

      <rect x="690" y="110" width="190" height="100" rx="12" fill="var(--color-planning-bg)" stroke="var(--color-planning)" strokeWidth="1.5" />
      <text x="785" y="145" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="700">Supabase</text>
      <text x="785" y="165" textAnchor="middle" fill="var(--color-ink-dim)" fontSize="11">Postgres</text>
      <text x="785" y="182" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">GameParameters / 結果</text>

      {/* Proto at center bottom, connecting to both client and server */}
      <rect x="360" y="270" width="180" height="42" rx="21" fill="var(--color-art-bg)" stroke="var(--color-art)" strokeWidth="1.5" />
      <text x="450" y="296" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="700">Takoda99-Proto</text>

      <line x1="360" y1="291" x2="115" y2="211" stroke="var(--color-art)" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="540" y1="291" x2="500" y2="251" stroke="var(--color-art)" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="230" y="260" textAnchor="middle" fill="var(--color-ink-faint)" fontSize="10">両者が依存する唯一の結合点</text>
    </svg>
  );
}
