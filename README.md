# Takoda99-Description

「たこ打99」の開発解説サイト。React + Vite + TypeScript + Tailwind CSS 製の SPA です。

- ゲーム: https://unityroom.com/games/takoda99
- チーム: おかしまち（カシュー / りーせ / たまちゃ）

## ページ構成

| パス | 内容 |
| --- | --- |
| `/` | トップ（全体像） |
| `/planning` | 企画/仕様 |
| `/process` | 開発手法 |
| `/client` | クライアントサイド |
| `/server` | サーバーサイド |
| `/art` | アート |

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## 画像の差し替え

すべての画像パスは [`src/assets/images.ts`](src/assets/images.ts) に集約されています。
`public/` 配下の対応するファイルを差し替えるだけで反映されます。
