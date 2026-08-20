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

## 加工（差し替えるときも必ず同じ手順で）

元画像は Unity のテクスチャや2048px級の写真で、1枚あたり数MBある。
**そのまま置くと1ページで20MB近くになる**ため、用途ごとに最大辺を決めて縮小し WebP 化している。

| 置き場所 | 最大辺 | 形式 |
| --- | --- | --- |
| `screens/` | 1600px | WebP q85 |
| `art/` | 800px | WebP q85 |
| `characters/` | 700px | WebP q85 |
| `team/` | 320px | WebP q85（80x80表示のため） |
| `logo/` | 512px | WebP q88 |

透過が実質使われていないものは RGB に落としてから変換する。

**PNG / JPEG のまま残しているのは2つだけ。**

| ファイル | 理由 |
| --- | --- |
| `favicon.png`（180px） | `index.html` が `type="image/png"` で参照している |
| `ogp.jpg`（1200x630） | OGP画像。クローラのWebP対応が読めないためJPEGで用意する |

合計 約20MB → 約1.9MB。

## まだ無い素材

`images.ts` で `null` にしているもの。用意できたら public/ に置いてパスを書き戻す。

- `screens/eliminated`, `screens/debug-panel` — 脱落モーダル・デバッグパネルのキャプチャ
- `dev/*` — `.sdd` 索引・リポジトリツリー・config画面などのキャプチャ
- `art/rough`, `art/ui-mock` — ラフ・UIモック
- `ogp`
