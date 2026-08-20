import type { ReactNode } from "react";

export function GitHubLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-mono transition-colors hover:border-current"
      style={{ borderColor: "var(--color-border)", color: "var(--color-ink-dim)" }}
    >
      <span aria-hidden>⌥</span>
      {children}
    </a>
  );
}

export function CodeBlock({ children }: { children: string }) {
  return <pre className="codeblock">{children}</pre>;
}

export function EffortNote({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <div
      className="rounded-xl border-l-4 p-5"
      style={{ borderColor: accent, background: "var(--color-base-panel)" }}
    >
      <div className="mb-2 text-xs font-bold" style={{ color: accent }}>
        がんばったところ / 苦労したところ
      </div>
      <div className="prose-body text-sm">{children}</div>
    </div>
  );
}

export function DecisionLog({
  accent,
  items,
}: {
  accent: string;
  items: { adopted: string; rejected: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-lg border p-4 text-sm"
          style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 font-bold" style={{ color: accent }}>
              採用
            </span>
            <span style={{ color: "var(--color-ink)" }}>{it.adopted}</span>
          </div>
          <div className="mt-1.5 flex items-start gap-2">
            <span className="mt-0.5 shrink-0 font-bold" style={{ color: "var(--color-ink-faint)" }}>
              却下
            </span>
            <span style={{ color: "var(--color-ink-faint)" }}>{it.rejected}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TermTag({ children }: { children: ReactNode }) {
  return (
    <span
      className="mx-0.5 inline-block rounded border-b border-dotted px-0.5 text-[0.95em]"
      style={{ borderColor: "var(--color-ink-faint)", color: "var(--color-ink)" }}
      title="専門用語"
    >
      {children}
    </span>
  );
}

export function DiffTable({
  accent,
  items,
  headings = ["予選版", "本戦版"],
}: {
  accent: string;
  items: { label: string; before: ReactNode; after: ReactNode }[];
  headings?: [string, string];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-[26%] px-3 py-2 text-left text-xs font-bold" style={{ color: "var(--color-ink-faint)" }}>
              項目
            </th>
            <th className="px-3 py-2 text-left text-xs font-bold" style={{ color: "var(--color-ink-faint)" }}>
              {headings[0]}
            </th>
            <th className="px-3 py-2 text-left text-xs font-bold" style={{ color: accent }}>
              {headings[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.label} className="border-t align-top" style={{ borderColor: "var(--color-border-soft)" }}>
              <td className="px-3 py-2.5 font-bold" style={{ color: "var(--color-ink)" }}>
                {it.label}
              </td>
              <td className="px-3 py-2.5 line-through decoration-1" style={{ color: "var(--color-ink-faint)" }}>
                {it.before}
              </td>
              <td className="px-3 py-2.5 font-semibold" style={{ color: "var(--color-ink)" }}>
                {it.after}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-xl border p-4 text-center"
          style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
        >
          <div className="text-lg font-extrabold md:text-xl" style={{ color: "var(--color-ink)" }}>
            {it.value}
          </div>
          <div className="mt-1 text-xs" style={{ color: "var(--color-ink-faint)" }}>
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
