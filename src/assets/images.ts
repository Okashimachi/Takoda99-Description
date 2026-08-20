// 画像パスの一元管理。差し替えは public/ 配下のファイルを置き換えるだけでよい。
//
// public/ の中身は Takoda99-Unity の Unity/Assets/Images から取り込んでいる。
// 取り込み対象と対応表は public/README.md を参照。
//
// null は「まだ素材が無い」を表す。描画側は null なら要素ごと出さない。
export const images = {
  logo: {
    // ロゴ単体の書き出しが無い（タイトル画面の絵に含まれている）。
    full: null,
    mark: null,
    title: null,
  },
  screens: {
    title: "/screens/title.webp",
    matchMain: "/screens/match-main.webp",
    matchmaking: "/screens/matchmaking.webp",
    result: "/screens/result.webp",
    // 実機のスクリーンショットは未取り込み。
    matchIngame: null,
    eliminated: null,
    debugPanel: null,
  },
  // CustomerSpriteLibrary.asset の割り当てに合わせている。
  // 属性との対応は Normal=mob / Bonus=comedian / Claimer=obachan / Buzz=jk。
  characters: {
    normal: "/characters/customer-normal.webp",
    comedian: "/characters/customer-comedian.webp",
    obachan: "/characters/customer-obachan.webp",
    jk: "/characters/customer-jk.webp",
  },
  art: {
    background: "/art/background.webp",
    stand: "/art/stand.webp",
    noren: "/art/noren.webp",
    griddle: "/art/griddle.webp",
    griddleHot: "/art/griddle-hot.webp",
    lantern: "/art/lantern.webp",
    orderPanel: "/art/order-panel.webp",
    hand: "/art/hand.webp",
    neonFrame: "/art/neon-frame.webp",
    takoyakiNeonPanel: "/art/takoyaki-neon-panel.webp",
    // 焼き加減の3段階
    takoyakiRaw: "/art/takoyaki-raw.webp",
    takoyakiHalf: "/art/takoyaki-half.webp",
    takoyaki: "/art/takoyaki.webp",
    takoyakiBurnt: "/art/takoyaki-burnt.webp",
    // 提供数（2 / 4 / 8個）で出し分ける舟皿
    tray2: "/art/tray-2.webp",
    tray4: "/art/tray-4.webp",
    tray8: "/art/tray-8.webp",
    rough: null,
    uiMock: null,
  },
  dev: {
    sddIndex: null,
    archDiagram: null,
    claudeMd: null,
    issues: null,
    repoTree: null,
    configFront: null,
    matchsimLog: null,
    gcpConsole: null,
  },
  team: {
    cashew: null,
    rise: null,
    tamatya: null,
    devPhoto: null,
  },
  favicon: null,
  ogp: null,
} as const;
