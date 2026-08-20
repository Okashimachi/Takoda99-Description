# public/ の画像について

パスは [`src/assets/images.ts`](../src/assets/images.ts) に一元管理している。
**素材が無いものは `null`**（描画側は `null` なら要素ごと出さない）。

## 取り込み元

すべて `Takoda99-Unity/Unity/Assets/Images/` からの取り込み。

| public | 取り込み元 |
| --- | --- |
| `screens/title` | `BG/Title.png` |
| `screens/match-main`, `art/background` | `BG/MainGameBG.png` |
| `screens/matchmaking` | `BG/MatchingBG.png` |
| `screens/result` | `Result/BG.png` |
| `art/stand` | `stall/stall_booth_life3.png` |
| `art/noren` | `stall/stall_noren_life3.png` |
| `art/griddle`, `art/griddle-hot` | `stall/stall_griddle_normal.png`, `stall_griddle_hot.png` |
| `art/lantern` | `stall/stall_lantern_on.png` |
| `art/order-panel` | `stall/order_panel.png` |
| `art/takoyaki-raw` / `-half` / `takoyaki` | `takoyaki/takoyaki_ball_raw.png` / `_half` / `_done` |
| `art/takoyaki-burnt` | `takoyaki/takoyaki_fail.png` |
| `art/hand` | `takoyaki/Hand.png` |
| `art/tray-2` / `-4` / `-8` | `takoyaki/takoyaki_tray_success_two.png` / `_four` / `（無印）` |
| `art/takoyaki-neon-panel` | `takoyaki/takoyaki_neon_panel.png` |
| `art/neon-frame` | `UI/NeonFrame.png` |
| `characters/customer-normal` | `customer/mob/customer_mob_order.png` |
| `characters/customer-comedian` | `customer/comedian/customer_comedian_order.png` |
| `characters/customer-obachan` | `customer/obachan/customer_obachan_order.png` |
| `characters/customer-jk` | `customer/jk/customer_jk_order.png` |

### 客キャラと属性の対応

`Unity/Assets/Resources/CustomerSpriteLibrary.asset` の割り当てに準拠している。

| 属性 | キャラ |
| --- | --- |
| `Normal` | 通常客（mob） |
| `Bonus` | お笑い芸人（comedian） |
| `Claimer` | ヒョウ柄おばちゃん（obachan） |
| `Buzz` | JK（jk） |

> Proto の `CustomerAttribute` のコメントは `Bonus // ヒョウ柄おばちゃん等` となっており、
> 実際の割り当て（Bonus=お笑い芸人 / Claimer=おばちゃん）と食い違っている。
> **サイトは実際に画面に出るほう（SOの割り当て）に合わせている。**

## 加工

Unity のテクスチャは 2000px 超・1枚あたり数MBあるため、Web向けに縮小・WebP化している
（最大辺：`screens` 1600px / `art` 800px / `characters` 700px、quality 85）。合計 18MB → 約1.1MB。

**差し替えるときも同じ加工をかけること。** 元のPNGをそのまま置くとページが数MB単位で重くなる。

## まだ無い素材

`images.ts` で `null` にしているもの。用意できたら public/ に置いてパスを書き戻す。

- `logo/*` — ロゴ単体の書き出しが無い（タイトル画面の絵に含まれている）
- `screens/match-ingame`, `screens/eliminated`, `screens/debug-panel` — **実機プレイのスクリーンショット**
- `team/*` — メンバーのアイコン（今は頭文字のプレースホルダを出している）
- `dev/*` — `.sdd` 索引・リポジトリツリー・config画面などのキャプチャ
- `art/rough`, `art/ui-mock` — ラフ・UIモック
- `favicon`, `ogp`
