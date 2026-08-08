// 画像パスの一元管理。public/ 配下に実在するファイルのみを列挙する。
// 画像を追加したら、ここにエントリを足してから各ページで参照する。
export const images = {
  logo: {
    full: "/logo/takoda99-logo.png",
  },
  screens: {
    matchMain: "/screens/match-main.png",
    matchIngame: "/screens/match-ingame.png",
  },
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
  },
  team: {
    okashimachi: "/team/Okashimachi.png",
    cashew: "/team/Cashew.jpg",
    rise: "/team/ri-se.jpg",
    tamatya: "/team/tamatya.jpg",
  },
  favicon: "/favicon.png",
};
