export type SectionKey = "top" | "planning" | "process" | "client" | "server" | "art";

export interface SectionTheme {
  key: SectionKey;
  label: string;
  path: string;
  accent: string;
  accentBg: string;
  tagline: string;
}

export const sections: Record<SectionKey, SectionTheme> = {
  top: {
    key: "top",
    label: "トップ",
    path: "/",
    accent: "var(--color-top)",
    accentBg: "var(--color-top-bg)",
    tagline: "全体像",
  },
  planning: {
    key: "planning",
    label: "企画/仕様",
    path: "/planning",
    accent: "var(--color-planning)",
    accentBg: "var(--color-planning-bg)",
    tagline: "提灯の赤 — なぜこのゲームか",
  },
  process: {
    key: "process",
    label: "開発手法",
    path: "/process",
    accent: "var(--color-process)",
    accentBg: "var(--color-process-bg)",
    tagline: "青のりの緑 — 3人で作る工夫",
  },
  client: {
    key: "client",
    label: "クライアント",
    path: "/client",
    accent: "var(--color-client)",
    accentBg: "var(--color-client-bg)",
    tagline: "卵の黄 — 薄いクライアント",
  },
  server: {
    key: "server",
    label: "サーバー",
    path: "/server",
    accent: "var(--color-server)",
    accentBg: "var(--color-server-bg)",
    tagline: "ソースの茶 — 99人同時対戦を回す",
  },
  art: {
    key: "art",
    label: "アート",
    path: "/art",
    accent: "var(--color-art)",
    accentBg: "var(--color-art-bg)",
    tagline: "紅ショウガのピンク — 大阪を描く",
  },
};

export const navOrder: SectionKey[] = ["planning", "process", "client", "server", "art"];

export const nextPage: Record<SectionKey, SectionKey> = {
  top: "planning",
  planning: "process",
  process: "client",
  client: "server",
  server: "art",
  art: "top",
};
