import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, EffortNote } from "../components/Bits";
import { CompareTile, EraCompare } from "../components/Era";
import { Callout, PullQuote } from "../components/Display";
import { sections } from "../lib/accentTheme";
import { images } from "../assets/images";

const accent = sections.art.accent;

const toc = [
  { id: "verdict", label: "何がどう変わったか" },
  { id: "role", label: "絵の役割が入れ替わった" },
  { id: "life", label: "消えた13枚" },
  { id: "tone", label: "トーンの決定" },
  { id: "kept", label: "変わらなかったもの" },
  { id: "cooking", label: "増えた手触り" },
  { id: "sound", label: "サウンド" },
  { id: "flow", label: "制作フロー" },
];

// 属性との対応は CustomerSpriteLibrary.asset の割り当てに準拠。
const chars = [
  ["Normal", "通常客", images.characters.normal],
  ["Bonus", "お笑い芸人", images.characters.comedian],
  ["Claimer", "ヒョウ柄おばちゃん", images.characters.claimer],
  ["Buzz", "JK", images.characters.buzz],
];

// 予選で「ライフの段階」を描いていた絵。すべて本戦の画面には出ない。
const lifeArt = [
  [images.art.boothLife3, "屋台 ライフ3"],
  [images.art.boothLife2, "屋台 ライフ2"],
  [images.art.boothLife1, "屋台 ライフ1"],
  [images.art.boothLife0, "屋台 ライフ0"],
  [images.art.noren, "暖簾 ライフ3"],
  [images.art.norenLife2, "暖簾 ライフ2"],
  [images.art.norenLife1, "暖簾 ライフ1"],
  [images.art.lantern, "提灯 点灯"],
  [images.art.lanternOff, "提灯 消灯"],
  [images.art.minitileLife3, "ミニタイル 3"],
  [images.art.minitileLife2, "ミニタイル 2"],
  [images.art.minitileLife1, "ミニタイル 1"],
  [images.art.minitileLife0, "ミニタイル 0"],
];

export default function ArtPage() {
  return (
    <PageLayout
      section="art"
      title="アート"
      lead="予選の絵を、本戦でどう作り替えたか。変更前後を並べて見せます。"
      ownerLine="担当: たまちゃ"
      heroImage={images.screens.matchmaking}
      toc={toc}
    >
      <Panel tone="flat" accent={accent}>
        <p className="text-lg leading-relaxed md:text-xl">
          アートは<strong>4役割の中で唯一、純粋にタスクが増えた役割</strong>。
          企画側で情報量を減らす決定をしたが、それは「絵が小さくて済む」ではなく
          <strong>「1枚あたりの面積が大きくなる」</strong>ことを意味していた。
        </p>
        <p className="mt-3 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          このページは差分を並べる形で書いている。
          <strong>左が予選版、右が本戦版</strong>。ゲームのルールの変更そのものは
          <a href="/planning#honsen" className="mx-1 underline" style={{ color: "var(--color-planning)" }}>
            企画ページ
          </a>
          を参照。
        </p>
      </Panel>

      <Panel tone="tint" title={<SectionHeading id="verdict">何がどう変わったか</SectionHeading>} accent={accent}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-[22%] px-3 py-2 text-left text-xs font-bold" style={{ color: "var(--color-ink-faint)" }}>
                  観点
                </th>
                <th className="px-3 py-2 text-left text-xs font-bold" style={{ color: "var(--color-ink-faint)" }}>
                  予選版
                </th>
                <th className="px-3 py-2 text-left text-xs font-bold" style={{ color: accent }}>
                  本戦版
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["絵の役割", "体力を可視化する（数値の表現）", "情報を大きく見せる器（枠とパネル）"],
                ["トーン", "和・大人しめ", "ネオン・色数多め"],
                ["情報密度", "高い。99店ぶんを画面に収める", "低い。大きなパネルで見せる"],
                ["段階表現", "ライフ4段階を絵で描き分ける", "段階そのものが消えた"],
                ["お題の枠", "文字が収まる必要があった", "収まらないことを演出にした"],
                ["脱落の絵", "1店ずつ静かに閉店", "数十店が一斉に閉店。6回で強度を上げる"],
                ["リザルト", "その場しのぎの1パターン", "一新＋順位別4パターン"],
                ["画面の向き", "縦画面", "縦画面のまま（据え置き）"],
                ["客キャラ", "見た目＋評価に効く", "見た目だけ。絵はそのまま"],
              ].map((r) => (
                <tr key={r[0]} className="border-t align-top" style={{ borderColor: "var(--color-border-soft)" }}>
                  <td className="px-3 py-2.5 font-bold" style={{ color: "var(--color-ink)" }}>{r[0]}</td>
                  <td className="px-3 py-2.5" style={{ color: "var(--color-ink-faint)" }}>{r[1]}</td>
                  <td className="px-3 py-2.5 font-semibold" style={{ color: "var(--color-ink)" }}>{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title={<SectionHeading id="role">絵の役割が入れ替わった</SectionHeading>} accent={accent}>
        <p className="mb-5">
          予選のアートは<strong>「数値を絵で表現する」</strong>ために作られていた。
          体力がいくつ残っているかを、屋台の傷み具合・暖簾の破れ・提灯の点灯で見せる。
          本戦で体力そのものが廃止されたため、<strong>この役割ごと無くなった</strong>。
        </p>
        <PullQuote accent={accent} caption="予選のフィードバック「お題しか見られない」より">
          丁寧に描き分けた4段階が、そもそも見られていなかった。
        </PullQuote>
        <EraCompare
          accent={accent}
          before={
            <>
              <div className="mb-3 grid grid-cols-4 gap-2">
                <CompareTile src={images.art.boothLife3} label="ライフ3" muted />
                <CompareTile src={images.art.boothLife2} label="ライフ2" muted />
                <CompareTile src={images.art.boothLife1} label="ライフ1" muted />
                <CompareTile src={images.art.boothLife0} label="ライフ0" muted />
              </div>
              <p>
                <strong>屋台そのものが体力ゲージだった。</strong>
                客を逃すたびに傷み、暖簾が破れ、提灯が消える。
                提灯の比喩はそのまま <code>CreditLifeLanternState</code> という型名になっていた。
              </p>
            </>
          }
          after={
            <>
              <div className="mb-3 grid grid-cols-2 gap-2">
                <CompareTile src={images.art.takoyakiNeonPanel} label="ネオンのたこ焼き" />
                <CompareTile src={images.art.panel5} label="ランキングのパネル枠" />
              </div>
              <p>
                <strong>絵は数値を語らなくなった。</strong>
                代わりに、順位・名前・スコアという文字情報を<strong>大きく載せるための器</strong>になる。
                ネオン枠・パネル・大型の順位表示が新しい主役。
              </p>
            </>
          }
          note={
            <>
              絵の質の問題ではなく、<strong>そこに視線が行かない画面設計だった</strong>という話。
              描き直すのではなく<strong>役割ごと畳む</strong>判断になったのはこのため。
            </>
          }
        />
      </Panel>

      <Panel tone="dark" title={<SectionHeading id="life">消えた13枚と、増えた19枚</SectionHeading>} accent={accent}>
        <p>
          リポジトリの追加履歴で数えると、変化がそのまま枚数に出ている。
        </p>

        {/* 絵を見せるのが目的の節なので、左右に割らず全幅で1枚ずつ大きく並べる */}
        <div className="mt-8 space-y-10">
          <div
            className="rounded-2xl border border-dashed p-5 md:p-6"
            style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black leading-none md:text-7xl" style={{ color: "rgba(251,249,244,0.55)" }}>
                  13
                </span>
                <span className="text-lg font-bold" style={{ color: "rgba(251,249,244,0.55)" }}>枚</span>
                <span className="ml-1 text-base font-bold" style={{ color: "rgba(251,249,244,0.85)" }}>
                  画面から消えた
                </span>
              </div>
              <p className="text-xs" style={{ color: "rgba(251,249,244,0.5)" }}>
                すべて「ライフの段階」を描いた絵
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {lifeArt.map(([src, label]) => (
                <CompareTile key={label} src={src as string} label={label as string} muted onDark />
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border p-5 md:p-6"
            style={{ borderColor: "transparent", borderLeft: `5px solid ${accent}`, background: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black leading-none md:text-7xl" style={{ color: accent }}>
                  19
                </span>
                <span className="text-lg font-bold" style={{ color: accent }}>枚</span>
                <span className="ml-1 text-base font-bold" style={{ color: "#fff" }}>
                  新しく描いた
                </span>
              </div>
              <p className="text-xs" style={{ color: "rgba(251,249,244,0.5)" }}>
                情報の器（パネル8種・ネオン枠）と、手触り（手・舟皿6種）
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              <CompareTile src={images.art.panel1} label="パネル枠" onDark />
              <CompareTile src={images.art.neonFrame} label="ネオン枠" onDark />
              <CompareTile src={images.art.hand} label="調理の手" onDark />
              <CompareTile src={images.art.tray2} label="舟皿 2個" onDark />
              <CompareTile src={images.art.tray4} label="舟皿 4個" onDark />
              <CompareTile src={images.art.tray8} label="舟皿 8個" onDark />
              <CompareTile src={images.art.takoyakiBurnt} label="失敗した玉" onDark />
              <CompareTile src={images.art.trayFail2} label="失敗の皿" onDark />
              <CompareTile src={images.art.panel5} label="パネル（別型）" onDark />
            </div>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed">
          <strong>捨てた枚数より描いた枚数のほうが多い。</strong>
          「情報を減らす」という決定が、アートにとっては純粋な作業増だったことがそのまま出ている。
          ただし<strong>消えた13枚は素材として失われたわけではない</strong>
          （画面に出なくなっただけで、リポジトリには残っている）。
        </p>
      </Panel>

      <Panel tone="tint" title={<SectionHeading id="tone">トーンの決定：和・大人しめ → ネオン</SectionHeading>} accent={accent}>
        <p className="mb-4">
          情報量が減ったことで、トーンを選び直せる状態になった。企画側は選択肢だけを出し、
          <strong>方向はアート担当の判断に委ねている</strong>。
        </p>
        <DecisionLog
          accent={accent}
          items={[
            {
              adopted: "ギラギラ・色数多め（ネオン）— 大型パネルと相性が良く、遠目に映える",
              rejected: "和・大人しめのまま維持 — 作業量は最小だが、情報を削った意味が薄れる",
            },
          ]}
        />
        <div className="mt-5">
          <EraCompare
            accent={accent}
            before={
              <>
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <CompareTile src={images.art.lantern} label="提灯" muted />
                  <CompareTile src={images.art.noren} label="暖簾" muted />
                  <CompareTile src={images.art.stand} label="屋台" muted />
                </div>
                <p>木と紙、暖色の提灯。落ち着いた和の方向。</p>
              </>
            }
            after={
              <>
                <div className="mb-3 grid grid-cols-3 gap-2">
                  <CompareTile src={images.art.takoyakiNeonPanel} label="ネオン" />
                  <CompareTile src={images.art.neonFrame} label="ネオン枠" />
                  <CompareTile src={images.art.panel5} label="パネル" />
                </div>
                <p>発光する輪郭と黒地。タイトル・マッチング・リザルトを通してネオンで揃えた。</p>
              </>
            }
            note={
              <>
                判断材料は審査基準。<strong>アイデア・コンセプト・技術力は取れる見込みで、決勝はオーディエンス票が効く</strong>。
                会場の後ろから見て何が起きているか分かることを優先し、遠目に映える方向を採った。
                <strong>ダイナミックなUIは情報量を減らすことが前提</strong>であり、その前提は本戦で満たされていた。
              </>
            }
          />
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border" style={{ borderColor: "var(--color-border-soft)" }}>
          <img
            src={images.screens.matchmaking}
            alt="マッチング画面"
            loading="lazy"
            className="w-full object-cover"
          />
        </div>
        <p className="mt-2 text-xs" style={{ color: "var(--color-ink-faint)" }}>
          通天閣・道頓堀モチーフの背景。ネオンの発光をそのまま画面のトーンに使っている。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="kept">変わらなかったもの ★重要</SectionHeading>} accent={accent}>
        <EraCompare
          accent={accent}
          before={
            <p>
              客の属性が<strong>評価に効いていた</strong>。
              ヒョウ柄おばちゃんは加点、クレーマーはミスに厳しく、JKは大きく変動する。
              <strong>「評価にどう効くかを絵で伝える」</strong>という制約があった。
            </p>
          }
          after={
            <p>
              属性の効果は<strong>廃止され、見た目だけになった</strong>。
              内部でゲームに効かなくなっただけで、<strong>画面からは何も消えていない</strong>。
              制約が外れたぶん、<strong>キャラクターは純粋に可愛さ・面白さだけで描ける</strong>。
            </p>
          }
          note="客キャラクター・属性の見た目・客の行列・背景は、本戦でもそのまま画面に出る。アート素材が無駄になったものは1枚もない。"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {chars.map(([key, label, src]) => (
            <div key={key} className="text-center">
              <div
                className="aspect-square overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
              >
                <img src={src} alt={label} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="mt-2 text-sm font-bold" style={{ color: "var(--color-ink)" }}>{label}</div>
              <div className="text-[0.65rem] font-mono" style={{ color: "var(--color-ink-faint)" }}>{key}</div>
            </div>
          ))}
        </div>
        <Callout accent={accent} label="見つけた食い違い" variant="warn">
          <p>
            属性と見た目の割り当ては <code>CustomerSpriteLibrary.asset</code> が正で、
            <strong>Bonus＝お笑い芸人 / Claimer＝ヒョウ柄おばちゃん</strong>。
            Proto のコメントだけが <code>Bonus // ヒョウ柄おばちゃん等</code> のまま残っている。
          </p>
        </Callout>
        <Disclosure summary="この食い違いを直すべきか" accent={accent}>
          <p>
            本戦では属性が評価に効かなくなったため<strong>実害は無い</strong>。
            ただし用語集を正典として運用している以上、<strong>直すならコメント側</strong>になる。
            実装・素材の命名・このサイトはすべて SO の割り当てで揃っている。
          </p>
        </Disclosure>
      </Panel>

      <Panel title={<SectionHeading id="cooking">増えた手触り：調理アニメと舟皿の出し分け</SectionHeading>} accent={accent}>
        <p className="mb-5">
          削って空いたぶんを、<strong>1回の提供が気持ちよくなる方向</strong>に使った。
          スコアが「作ったたこ焼きの数」になったことで、
          <strong>1個作る動作そのものが報酬になる</strong>ためでもある。
        </p>
        <EraCompare
          accent={accent}
          before={
            <>
              <div className="mb-3 grid grid-cols-3 gap-2">
                <CompareTile src={images.art.takoyakiRaw} label="生" muted />
                <CompareTile src={images.art.takoyakiHalf} label="半焼き" muted />
                <CompareTile src={images.art.takoyaki} label="完成" muted />
              </div>
              <p>鉄板の穴の絵が差し替わるだけ。提供しても皿は1種類。</p>
            </>
          }
          after={
            <>
              <div className="mb-3 grid grid-cols-3 gap-2">
                <CompareTile src={images.art.hand} label="手" />
                <CompareTile src={images.art.tray8} label="舟皿 8個" />
              <CompareTile src={images.art.takoyakiBurnt} label="失敗した玉" />
              <CompareTile src={images.art.trayFail2} label="失敗の皿" />
              <CompareTile src={images.art.panel5} label="パネル（別型）" />
                <CompareTile src={images.art.takoyakiBurnt} label="失敗した玉" />
              </div>
              <p>
                手が穴を巡回して焼き、玉が飛んで舟皿に載る。
                <strong>提供数（2 / 4 / 8個）で皿の絵が変わり</strong>、成否でも出し分ける。
              </p>
            </>
          }
          note={
            <>
              調整値は ScriptableObject に外出ししてあり、
              <strong>実機で見ながら詰められる</strong>形にしてある（実装は
              <a href="/client#polish" className="mx-1 underline" style={{ color: "var(--color-client)" }}>
                クライアントページ
              </a>
              ）。
            </>
          }
        />
      </Panel>

      <Panel tone="flat" title={<SectionHeading id="sound">サウンド</SectionHeading>} accent={accent}>
        <EraCompare
          accent={accent}
          before={
            <ul>
              <li>打鍵音・ミス音・提供音（通常/高評価）</li>
              <li>客来店音・<strong>客離脱音</strong></li>
              <li><strong>他店脱落音を1店ずつ再生</strong></li>
              <li>評価の上昇/下降音</li>
              <li>リザルトのジングル 1種</li>
            </ul>
          }
          after={
            <ul>
              <li>打鍵音・ミス音・提供音 — <strong>変更なし。引き続き最優先</strong></li>
              <li>客離脱音は<strong>不要</strong>（客が逃げなくなった）</li>
              <li>
                <strong>一斉脱落は1回の大きな音に集約</strong>
              </li>
              <li><strong>足切りの秒読み音（新規）</strong></li>
              <li><strong>リザルトのジングル 4種</strong>（順位別）</li>
            </ul>
          }
          note={
            <>
              <strong>予選の他店脱落音をそのまま使うと、足切りのたびに最大49回同時に鳴って破綻する。</strong>
              1件ずつ鳴らす前提が崩れたので、集約版に置き換えた。
              足切りが20秒等間隔になったことは音楽の設計にも効いていて、
              <strong>BGMを20秒単位で構成すれば、脱落のタイミングと曲の切り替わりを揃えられる</strong>。
            </>
          }
        />
        <p className="mt-4 text-xs" style={{ color: "var(--color-ink-faint)" }}>
          素材は <a href="https://otologic.jp/" target="_blank" rel="noreferrer noopener" className="underline">OtoLogic</a> から取得。
          音源ファイル本体はリポジトリにコミットせず <code>.meta</code> のみ管理している。
        </p>
      </Panel>

      <Panel tone="flat" title={<SectionHeading id="flow">制作フロー</SectionHeading>} accent={accent}>
        <p>
          仮素材（色付き矩形＋テキスト）で先に動かし、後から差し替える運用。
          <code>ViewSampleDriver</code> でサンプルデータ駆動の画面を作れるようにしてある。
        </p>
        <p className="mt-3 font-bold" style={{ color: accent }}>
          「アートを待たずに開発が止まらない体制」＝開発手法の話でもある。
        </p>
        <p className="mt-3 text-sm">
          本戦ではこれが効いた。<strong>アートは proto・サーバーに依存せず即着手できる</strong>一方、
          クライアント側は先にランキングUIを仮素材で組み、
          <strong>ネオン素材が上がってから差し替える</strong>という並行の進め方ができている。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          いちばん割り切りが要ったのは、<strong>丁寧に描き分けたライフ4段階を「見られていなかった」と認めて捨てたこと</strong>。
          絵の質の問題ではなく、<strong>そこに視線が行かない画面設計だった</strong>という話なので、
          描き直すのではなく役割ごと畳む判断になった。
        </p>
        <p className="mt-3">
          代わりに得たのは、1枚あたりの面積とトーンの自由。
          和で大人しくまとめていたところをネオンに振り切れたのは、
          <strong>情報を削るという企画側の決定が先にあったから</strong>で、
          アート単独では選べない選択肢だった。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
