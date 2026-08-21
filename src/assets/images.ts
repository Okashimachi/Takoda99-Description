// 画像パスの一元管理。public/ 配下に実在するファイルのみを列挙する。
// 画像を追加したら、ここにエントリを足してから各ページで参照する。
//
// 取り込み元と加工方針は public/README.md を参照。
// null は「まだ素材が無い」を表す。描画側（Img コンポーネント）は null なら要素ごと出さない。
export const images = {
  logo: {
    full: "/logo/takoda99-logo.webp",
  },
  screens: {
    title: "/screens/title.webp",
    matchMain: "/screens/match-main.webp",
    matchIngame: "/screens/match-ingame.webp",
    matchmaking: "/screens/matchmaking.webp",
    result: "/screens/result.webp",
    eliminated: null,
    debugPanel: null,
  },
  // 属性との対応は CustomerSpriteLibrary.asset の割り当てに準拠。
  // Normal=通常客 / Bonus=お笑い芸人 / Claimer=ヒョウ柄おばちゃん / Buzz=JK。
  characters: {
    normal: "/characters/customer-normal.webp",
    claimer: "/characters/customer-claimer.webp",
    buzz: "/characters/customer-buzz.webp",
    comedian: "/characters/customer-comedian.webp",
  },
  art: {
    stand: "/art/stand.webp",
    takoyaki: "/art/takoyaki.webp",
    takoyakiBurnt: "/art/takoyaki-burnt.webp",
    lantern: "/art/lantern.webp",
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
    // 予選：ライフの段階を描いていた絵（本戦で画面から消えた）
    boothLife0: "/art/booth-life0.webp",
    boothLife1: "/art/booth-life1.webp",
    boothLife2: "/art/booth-life2.webp",
    boothLife3: "/art/booth-life3.webp",
    norenLife1: "/art/noren-life1.webp",
    norenLife2: "/art/noren-life2.webp",
    lanternOff: "/art/lantern-off.webp",
    minitileLife0: "/art/minitile-life0.webp",
    minitileLife1: "/art/minitile-life1.webp",
    minitileLife2: "/art/minitile-life2.webp",
    minitileLife3: "/art/minitile-life3.webp",
    // 本戦：情報を大きく見せるための器
    panel1: "/art/panel-1.webp",
    panel5: "/art/panel-5.webp",
    trayFail2: "/art/tray-fail-2.webp",
    resultYouki: "/art/result-youki.webp",
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
    okashimachi: "/team/Okashimachi.webp",
    cashew: "/team/Cashew.webp",
    rise: "/team/ri-se.webp",
    tamatya: "/team/tamatya.webp",
  },
  favicon: "/favicon.png",
  ogp: "/ogp.jpg",
};
