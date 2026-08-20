// 画像パスの一元管理。public/ 配下に実在するファイルのみを列挙する。
// 画像を追加したら、ここにエントリを足してから各ページで参照する。
//
// 取り込み元と加工方針は public/README.md を参照。
// null は「まだ素材が無い」を表す。描画側（Img コンポーネント）は null なら要素ごと出さない。
export const images = {
  logo: {
    full: "/logo/takoda99-logo.png",
  },
  screens: {
    title: "/screens/title.webp",
    matchMain: "/screens/match-main.png",
    matchIngame: "/screens/match-ingame.png",
    matchmaking: "/screens/matchmaking.webp",
    result: "/screens/result.webp",
    eliminated: null,
    debugPanel: null,
  },
  // 属性との対応は CustomerSpriteLibrary.asset の割り当てに準拠。
  // Normal=通常客 / Bonus=お笑い芸人 / Claimer=ヒョウ柄おばちゃん / Buzz=JK。
  characters: {
    normal: "/characters/customer-normal.png",
    claimer: "/characters/customer-claimer.png",
    buzz: "/characters/customer-buzz.png",
    comedian: "/characters/customer-comedian.png",
  },
  art: {
    stand: "/art/stand.png",
    takoyaki: "/art/takoyaki.png",
    takoyakiBurnt: "/art/takoyaki-burnt.png",
    lantern: "/art/lantern.png",
    // 以下は Takoda99-Unity の Assets/Images から追加で取り込んだもの
    background: "/art/background.webp",
    noren: "/art/noren.webp",
    griddle: "/art/griddle.webp",
    griddleHot: "/art/griddle-hot.webp",
    orderPanel: "/art/order-panel.webp",
    hand: "/art/hand.webp",
    neonFrame: "/art/neon-frame.webp",
    takoyakiNeonPanel: "/art/takoyaki-neon-panel.webp",
    // 焼き加減の段階
    takoyakiRaw: "/art/takoyaki-raw.webp",
    takoyakiHalf: "/art/takoyaki-half.webp",
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
    okashimachi: "/team/Okashimachi.png",
    cashew: "/team/Cashew.jpg",
    rise: "/team/ri-se.jpg",
    tamatya: "/team/tamatya.jpg",
  },
  favicon: "/favicon.png",
  ogp: null,
};
