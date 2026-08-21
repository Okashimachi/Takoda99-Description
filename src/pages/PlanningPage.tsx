import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, DiffTable, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { EraDivider, EraStamp, EraZoneHeader } from "../components/Era";
import { PullQuote, StatRow } from "../components/Display";
import { images } from "../assets/images";
import { sections } from "../lib/accentTheme";

const accent = sections.planning.accent;

const toc = [
  { id: "concept", label: "コンセプト", group: "予選版 / QUALIFIER", groupColor: "var(--color-ink-faint)" },
  { id: "coreplay", label: "コアプレイ" },
  { id: "twoaxis", label: "評価と信用" },
  { id: "elimination", label: "脱落経路" },
  { id: "risk", label: "リスクとリターン" },
  { id: "customers", label: "客属性とメカニクス" },
  { id: "decisions", label: "意思決定ログ" },
  { id: "pivot", label: "ピボットの話" },
  { id: "glossary", label: "用語集の統治" },
  { id: "honsen", label: "何をどう作り直したか", group: "本戦版 / FINAL" },
  { id: "honsen-why", label: "予選で観測された事実" },
  { id: "honsen-choice", label: "複雑案と単純案" },
  { id: "honsen-score", label: "スコアへの一本化" },
  { id: "honsen-cull", label: "20秒ごとの足切り" },
  { id: "honsen-finish", label: "最後の1人を残さない" },
];

export default function PlanningPage() {
  return (
    <PageLayout
      section="planning"
      title="企画/仕様"
      lead="なぜこのゲームなのか。何を採用し、何を却下したか。意思決定の見せ場です。"
      ownerLine="担当: カシュー"
      heroImage={images.screens.title}
      toc={toc}
    >
      <Panel tone="flat" eyebrow="このページの読み方" accent={accent}>
        <p>
          たこ打99には<strong>予選版</strong>と<strong>本戦版</strong>という
          <strong>ルールの異なる2つのゲーム</strong>がある。
          本戦に向けて勝敗の決まりかたごと作り替えたため、
          このページは<strong>2つのゾーンに分かれている</strong>。
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div
            className="rounded-xl border border-dashed p-4"
            style={{ borderColor: "var(--color-border)", background: "var(--color-base-panel)" }}
          >
            <div className="text-[0.65rem] font-bold tracking-widest" style={{ color: "var(--color-ink-faint)" }}>
              予選版 / QUALIFIER
            </div>
            <div className="mt-1.5 text-sm font-bold" style={{ color: "var(--color-ink-dim)" }}>
              評価と信用の2軸／2つの脱落経路
            </div>
            <div className="mt-1 text-xs" style={{ color: "var(--color-ink-faint)" }}>
              破線の沈んだパネル ＝ 予選版の話
            </div>
          </div>
          <div
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--color-border-soft)", borderLeft: `5px solid ${accent}`, background: "var(--color-base-raised)" }}
          >
            <div className="text-[0.65rem] font-extrabold tracking-widest" style={{ color: accent }}>
              本戦版 / FINAL
            </div>
            <div className="mt-1.5 text-sm font-extrabold" style={{ color: "var(--color-ink)" }}>
              スコア1軸／足切り1経路
            </div>
            <div className="mt-1 text-xs" style={{ color: "var(--color-ink-faint)" }}>
              色の帯がついたパネル ＝ 本戦版の話
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          予選版を上書きせず残しているのは、
          <strong>何をどう判断して変えたかが、差分そのものとして読めるようにするため</strong>
          （ドキュメント側も <code>00_本選差分/</code> として同じ方式を採っている）。
          いま遊べるのは<strong>本戦版</strong>。
        </p>
      </Panel>

      <EraZoneHeader
        era="qual"
        accent={accent}
        title="ここから下は、予選で提出したバージョンの設計"
        lead="本戦ではルールごと作り替えているため、以下は現在のゲームの説明ではない。当時どう考えていたかの記録として読んでほしい。"
      />

      <Panel era="qual" title={<SectionHeading id="concept">コンセプトと参照元</SectionHeading>} accent={accent}>
        <p>
          コアプレイは<strong>寿司打</strong>のタイピング、対戦構造は<strong>テトリス99</strong>の
          「99人・下位淘汰」を参照した。寿司打の「速く正確に打つ気持ちよさ」を、
          1人ではなく99店が同時にやり合うバトルロワイヤルに乗せ替えることで、
          単なるタイピング練習ではなく「サバイバル」の緊張感を持たせている。
        </p>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="coreplay">コアプレイの図解</SectionHeading>} accent={accent}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ["注文", "＝ 単語数", "客が並ぶと注文が入る。注文の個数はお題の単語数に対応する"],
            ["提供", "＝ 評価↑", "正確・高速にタイプして提供すると、その店の評価が上がる"],
            ["離脱", "＝ 信用↓", "提供が遅れて客が我慢しきれず離脱すると、信用が減る"],
          ].map(([a, b, c]) => (
            <div key={a} className="rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
              <div className="font-bold" style={{ color: accent }}>{a} <span style={{ color: "var(--color-ink-faint)" }}>{b}</span></div>
              <div className="mt-2 text-sm" style={{ color: "var(--color-ink-dim)" }}>{c}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="twoaxis">勝敗2軸を「混ぜない」設計</SectionHeading>} accent={accent}>
        <p>
          <strong>評価</strong> と <strong>信用</strong> という2つの数値を、意図的に混ぜずに独立させている。
        </p>
        <ul>
          <li>
            <strong>評価</strong> ＝ ミス/速度の相対ランキング。客の流れやすさに反映され、
            <TermTag>下位淘汰</TermTag>の安置（対象になりやすさ）を決める
          </li>
          <li>
            <strong>信用</strong> ＝ 客の離脱でのみ減少し、回復しない。0になった時点の
            <strong>自滅条件</strong>
          </li>
          <li>
            最終順位は <strong>脱落順のみ</strong> で決まる。評価は順位計算そのものには使わない
          </li>
        </ul>
        <Disclosure summary="なぜ分けたか" accent={accent}>
          <p>
            評価は「実力」を、信用は「事故の蓄積」を表す指標として独立させたかった。
            もし両者を1本の数値に混ぜると、「打つのは上手いが行列を溜めがちな店」と
            「打つのは並だが丁寧に捌く店」の違いが数値上で潰れてしまう。
            分けることで、評価は下位淘汰という「実力による選別」に、
            信用は自滅という「事故の蓄積による退場」に、それぞれ役割を持たせられる。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="elimination">2つの脱落経路と緊張カーブ</SectionHeading>} accent={accent}>
        <ul>
          <li><strong>自滅</strong>：信用が0になる（自分の提供遅延の蓄積）</li>
          <li><strong>強制</strong>：下位淘汰(storm)による評価下位のカット</li>
        </ul>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ["序盤 99〜50", "客が多く緩やか。操作に慣れる時間"],
            ["中盤 50〜10", "下位淘汰が効き始め、評価の差が生死を分ける"],
            ["終盤 10〜", "火力(heat)が上がりお題も難化。一瞬のミスが致命傷"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
              <div className="font-bold" style={{ color: accent }}>{t}</div>
              <div className="mt-2 text-sm" style={{ color: "var(--color-ink-dim)" }}>{d}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel era="qual" tone="flat" title={<SectionHeading id="risk">リスクとリターンのマップ</SectionHeading>} accent={accent}>
        <p>
          「速く打つ」か「正確に打つ」か、「行列を溜めて捌く」か「JK(<TermTag>Buzz</TermTag>)を優先して取る」か。
          プレイヤーの判断1つ1つが評価と信用のどちらに効くかを分けて設計している。
          速度偏重は信用リスクを溜めやすく、正確性偏重は評価の伸びが遅くなる、という
          トレードオフをコアプレイの時点で仕込んだ。
        </p>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="customers">客属性とメカニクス</SectionHeading>} accent={accent}>
        <ul>
          <li><strong>Normal</strong>：標準的な注文と我慢ゲージ</li>
          <li><strong>Bonus（ヒョウ柄おばちゃん）</strong>：捌くと評価に加点</li>
          <li><strong>Claimer（クレーマー）</strong>：ミスに対して非対称に厳しい</li>
          <li><strong>Buzz（JK）</strong>：捌くとバズ加点（減衰・上限あり）</li>
        </ul>
        <Disclosure summary="クレーマーの非対称設計（減点＞加点）について" accent={accent}>
          <p>
            クレーマーは他の客と同じ「速く正確に」を求めるが、ミスした際の減点幅を
            成功時の加点幅より大きく設定している。これは「事故を避ける」という
            信用の設計思想を評価軸にも波及させるための意図的な非対称であり、
            「クレーマーを優先的に捌く」だけが最適解にならないようリスクを持たせている。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="decisions">意思決定ログ</SectionHeading>} accent={accent}>
        <p className="mb-4">採用したものと、その裏で却下した案。<GitHubLink href="https://github.com/Okashimachi/Takoda99-Docs">Takoda99-Docs / 01_企画書 §12</GitHubLink> がそのまま素材になっている。</p>
        <DecisionLog
          accent={accent}
          items={[
            { adopted: "直接攻撃を廃した", rejected: "他店を直接妨害する攻撃要素（旧テキストロ99の攻撃機構）" },
            { adopted: "焦げを廃して離脱に一本化", rejected: "「焦げ」という別のペナルティ系統を並走させる案" },
            { adopted: "信用は離脱のみで減る", rejected: "ミスなど複数要因で信用が変動する複雑な案" },
            { adopted: "最終順位＝脱落順のみ", rejected: "評価スコアを最終順位計算に混ぜる案" },
            { adopted: "下位淘汰(storm)を導入", rejected: "自滅のみで終盤を収束させる案（試合が間延びする）" },
            { adopted: "客300人固定・サーバー一元管理", rejected: "店ごとに独立した客プールを持たせる案（商圏制）" },
          ]}
        />
      </Panel>

      <Panel era="qual" title={<SectionHeading id="pivot">ピボットの話：テキストロ99からの全面刷新</SectionHeading>} accent={accent}>
        <p>
          正直に書く。もともとの構想は「<strong>テキストロ99</strong>」という寿司ベース・直接攻撃型のゲームだった。
          しかし開催地が大阪であることを踏まえ、「たこ焼き経営バトロワ」へと全面的に作り直した。
        </p>
        <Disclosure summary="廃止した機構の一覧" accent={accent}>
          <ul>
            <li>直接攻撃</li>
            <li>相殺</li>
            <li>コンボ</li>
            <li>ダケンスタック</li>
            <li>KO・バッジ</li>
          </ul>
          <p className="mt-3">
            いずれも「攻撃し合うゲーム」を前提にした機構であり、
            「サーバー権威で客の流れを管理する経営バトロワ」への転換とともに不要になった。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="qual" tone="flat" title={<SectionHeading id="glossary">用語集をユビキタス言語の正典にする統治</SectionHeading>} accent={accent}>
        <p>
          「テーマが変わってもコード名は変えない、表示名だけ差し替える」という統治ルールを敷いた。
          実際、テキストロ99からたこ打99へのピボットでも、内部のコード名・型名はそのまま残し、
          UIの表示名だけを差し替えることで実装を壊さずに乗り切ることができた。
          この用語集の運用は
          <TermTag>ユビキタス言語</TermTag>
          として <a href="/process" style={{ color: "var(--color-process)" }} className="underline">開発手法</a> のSDD運用にもそのまま接続している。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          「勝敗2軸を混ぜない」判断は、実装が進んでからも何度も誘惑された。
          評価と信用を1本化した方が調整パラメータは減るが、意味が潰れると判断し最後まで分離を貫いた。
          テキストロ99からのピボットも、資産をゼロから作り直す痛みはあったが、
          用語集の統治ルールのおかげで実装レイヤーの被害を最小限に抑えられた。
        </p>
      </EffortNote>

      <EraDivider
        accent={accent}
        headline="「体力を見せて耐えるゲーム」から「順位を見て走るゲーム」へ"
        before="体力で死ぬ／評価で死ぬ の2経路。評価は実力＋運（客の属性・離脱）で動く"
        after="スコア（作ったたこ焼き数 − ミス数）の一本。20秒ごとに下位が切られる"
        note={
          <>
            予選の結果を受けて、<strong>ゲーム性の根幹から作り替えた</strong>。
            機能を足して分かりやすくするのではなく、
            <strong>削って分かりやすくする</strong>方向に振り切っている。
            <br className="hidden md:block" />
            情報量を削り、初見のプレイヤーが最初の10秒で
            「自分が今どこにいて、何をすべきか」を理解できる状態にすることが目的。
          </>
        }
      />

      <EraZoneHeader
        era="final"
        accent={accent}
        title="ここから下が、いま遊べるバージョンの設計"
        lead="上のゾーンで書いた「勝敗2軸を混ぜない設計」は、本戦では軸そのものを1本に減らすという逆の判断で置き換えられている。"
      />

      <Panel
        era="final"
        title={
          <SectionHeading id="honsen">
            <EraStamp era="final" accent={accent} />
            何をどう作り直したか
          </SectionHeading>
        }
        accent={accent}
      >
        <p>
          予選版が持っていた<strong>勝敗2軸（評価と信用）</strong>と<strong>2つの脱落経路</strong>を、
          本戦版では<strong>スコア1本・足切り1経路</strong>に畳み直した。変わったのは次の7点。
        </p>
        <div className="mt-5">
          <DiffTable
            accent={accent}
            items={[
              { label: "順位を決める値", before: "評価（EMAの相対パーセンタイル）", after: "スコア（累積の絶対値）" },
              { label: "勝敗の軸", before: "評価 と 信用 の2軸", after: "スコアの1軸" },
              { label: "脱落経路", before: "信用0の自滅 / 評価下位の淘汰", after: "20秒ごとの段階的足切りのみ" },
              { label: "客の離脱", before: "我慢ゲージ切れで逃げる", after: "廃止。客は逃げない" },
              { label: "客属性の効果", before: "Bonus加点 / Claimer減点 / Buzz大変動", after: "廃止。見た目が変わるだけ" },
              { label: "決着", before: "生存1店 or 制限時間到達", after: "120秒で全店が同時に脱落" },
              { label: "画面の向き", before: "縦画面", after: "縦画面のまま（据え置き）" },
            ]}
          />
        </div>
        <p className="mt-5 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          <strong>削るのは内部処理だけで、画面は賑やかなまま。</strong>
          客キャラクター・属性の見た目・行列・背景は本戦でも画面に出る。
          ゲーム上の意味を失って演出になっただけで、アート素材は1枚も無駄になっていない。
        </p>
        <GitHubLink href="https://github.com/Okashimachi/Takoda99-Docs">
          Takoda99-Docs / 00_本選差分
        </GitHubLink>
      </Panel>

      <Panel era="final" title={<SectionHeading id="honsen-why">なぜ根幹から変えたか — 予選で観測された事実</SectionHeading>} accent={accent}>
        <ul>
          <li>最も多かったフィードバックが <strong>「お題しか見られない」</strong></li>
          <li>
            大阪会場の実戦で、<strong>より正確でクリア数も多くミスも少なかった側が負けた</strong>。
            運として説明はつくが、納得感のある敗北になっていない
          </li>
          <li>98人分の体力を配信・表示していたが、<strong>実際には見られていなかった</strong>（提灯・店の見た目も同様）</li>
          <li>評価と体力の連動が弱く、<strong>順位1位なのに体力切れで脱落</strong>する事象が発生した</li>
        </ul>
        <div className="my-7">
          <StatRow
            accent={accent}
            items={[
              { value: "1", unit: "位", label: "なのに脱落", note: "評価と体力の連動が弱く、順位1位でも体力切れで落ちた", muted: true },
              { value: "98", unit: "人分", label: "配信していた体力", note: "実際にはほとんど見られていなかった", muted: true },
              { value: "3", unit: "分", label: "予選のプレゼン枠", note: "1位が決まらないまま残り20〜30人で時間切れ", muted: true },
              { value: "10", unit: "秒", label: "弱い人の体験時間", note: "本戦では最低20秒に引き上げた", muted: true },
            ]}
          />
        </div>
        <p className="mt-4">因果構造は1本に繋がっていた。</p>
        <pre className="codeblock">{`お題しか見られない
  → 速さと正確さのトレードオフが認識されない
  → 「いつリスクを取るか」というタイミング軸が存在しないものとして扱われる
  → 正確に打つこと自体の意味が消える
  → 「お題どおり打ったのになぜ負けた？」`}</pre>
        <p className="mt-4">
          <strong>根本原因は1つ：見てほしい情報が視界に入っていない。</strong>
        </p>
        <Disclosure summary="「運が絡んでいた」ことの正体" accent={accent}>
          <p>
            予選で評価を動かしていた4要素のうち、<strong>2つが運だった</strong>
            （どの客が来たか＝属性の加減点／行列がどう詰まったか＝客の離脱）。
            しかもどちらも「画面を見ていないと気づけない」情報で、
            <strong>「お題しか見られない」という同じ問題の別の顔</strong>でしかなかった。
            本戦では視線誘導で見せにいくのではなく、
            <strong>評価を動かす要因のほうを実力だけに減らした</strong>。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" tone="flat" title={<SectionHeading id="honsen-choice">取り得た2案と、単純案を選んだ理由</SectionHeading>} accent={accent}>
        <DecisionLog
          accent={accent}
          items={[
            {
              adopted: "単純案 — 見られていない情報を捨て、残す情報を極限まで絞る",
              rejected: "複雑案 — 視線誘導・周辺アニメ・考える時間で、周辺情報を自然に見せる",
            },
          ]}
        />
        <p className="mt-4">
          複雑案が恩恵を与えるのは「このゲームに慣れた、少し上手い層」だが、
          <strong>ハッカソンは本作を初めて発表する場であり、全員が初心者になる</strong>。
          プレイ回数は1〜2回。遊び込むほど味が出る設計は、そもそも味が出るところまで到達しない。
          <strong>初回のプレイで最大火力が出る設計</strong>に切り替えた。
        </p>
        <Disclosure summary="判断の補強：下に合わせて作れば、上級者は勝手に遊びを見つける" accent={accent}>
          <p>
            新しいゲームを始めたとき、人は最初は単純なことしかできない。
            スプラトゥーンの初回は「床を塗る・撃つ・潜る」しかできず、
            スペシャル・ギアパワー・マップ・イカランプは見えていない。
            <strong>下に合わせて作れば上級者は勝手に遊びを見つける（RTA・縛り・ノーミス狙い）が、逆は成立しない。</strong>
          </p>
        </Disclosure>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          副次的に、<strong>情報量が減ることでアートの自由度が上がった</strong>
          （ダイナミックなUIは情報量削減が前提）。実装も「機能を消す・表示しない」変更が中心になり、軽い。
        </p>
      </Panel>

      <Panel era="final" title={<SectionHeading id="honsen-score">スコア — 順位を決める唯一の値</SectionHeading>} accent={accent}>
        <pre className="codeblock">{`スコア = 作ったたこ焼きの数（量） − ミスの多さ（正確さ）

  deltaScore = W_TAKOYAKI × たこ焼きの個数 − W_MISS × その注文でのミス打鍵数
  score      = Σ deltaScore`}</pre>
        <div className="mt-4">
          <DiffTable
            accent={accent}
            items={[
              { label: "性質", before: "相対値（生存店内のパーセンタイル）", after: "絶対値。積み上がる" },
              { label: "中身", before: "直近パフォーマンスの移動平均（EMA）", after: "試合開始からの累計" },
              { label: "動き", before: "上がったり下がったりする", after: "打てば増える。ミスすると増えにくい" },
              {
                label: "プレイヤーから見て",
                before: "「なぜ上がった／下がった？」が分かりにくい",
                after: "「打った数だけ増える」で説明が終わる",
              },
            ]}
          />
        </div>
        <PullQuote accent={accent} caption="本戦企画書 3.8">
          速く正確に打った人が上に行く。それだけ。
        </PullQuote>
        <p className="mt-5">
          <strong>速さは「個数」に自然に含まれる。</strong>
          速く打てる人ほど時間内に多くのたこ焼きを作れるため、速度を別の項として持つ必要がない。
          「速さと正確性」という2軸が、そのまま2つの項になった。
        </p>
        <p className="mt-3">
          <code>W_TAKOYAKI</code> と <code>W_MISS</code> の
          <strong>比率こそが本作の面白さの中心</strong>。
          <code>W_MISS</code> が小さければミスを恐れず速く打つゲームに、大きければ慎重に正確に打つゲームになる。
          <strong>釣り合っているとき、どちらを取るかの判断が発生する＝狙っている状態</strong>。
          この2値は <code>GameParameters</code> 経由のサーバー設定値にしてあり、
          <strong>ビルドなしで当日まで調整できる</strong>。
        </p>
        <Disclosure summary="比率をどう決めたか（企画では決めきらず、シミュレーションに預けた）" accent={accent}>
          <p>
            基準は<strong>「速さ型と正確型の平均順位が拮抗する点」</strong>。
            どちらかの型が明確に有利なら、それは「どちらを取るかの判断」が消えている状態なので、
            <strong>2つの型を戦わせて平均順位が並ぶ重みを探す</strong>という形に落とした。
          </p>
          <p className="mt-3">
            現在の値は <code>100 : 28</code>。ただし
            <strong>拮抗点はゲーム側を触るたびに動く</strong>のが実際で、
            お題の長さや注文数の配分を変えるたびに測り直している
            （注文数を 2 / 4 / 8個 にした際は1客あたりの加点が増え、ミスの罰が相対的に軽くなったぶん拮抗点が上がった）。
          </p>
          <p className="mt-3">
            <strong>企画書の時点では「仮の値」としか書いていない。</strong>
            構造（何と何の比率で決まるか）を先に確定させ、
            <strong>数値はシミュレーションと実プレイに預ける</strong>という分け方をしている。
          </p>
        </Disclosure>
        <p className="mt-3 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          画面上の主役は引き続き<strong>順位</strong>で、スコアは補助表示。
          ただし<strong>リザルトでは具体的な数字が達成感になる</strong>ため、そこでは大きく出す。
        </p>
      </Panel>

      <Panel tone="dark" title={<SectionHeading id="honsen-cull">20秒等間隔 × 6段階の足切り</SectionHeading>} accent={accent}>
        <p>脱落経路を1本に畳んだ結果、脱落は<strong>時刻で決まる</strong>ようになった。</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr>
                {["時刻", "生存数", "切る数", "切る割合", "意味"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-bold" style={{ color: "rgba(251,249,244,0.5)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["20秒", "99 → 75", "24", "24%", "初回。全員が最低20秒は遊べる"],
                ["40秒", "75 → 55", "20", "27%", "ルールを理解した頃"],
                ["60秒", "55 → 35", "20", "36%", "中盤。淘汰が本格化"],
                ["80秒", "35 → 20", "15", "43%", "終盤の入口"],
                ["100秒", "20 → 10", "10", "50%", "決勝進出ライン"],
                ["120秒", "10 → 0", "10", "100%", "試合終了。全店が同時に閉店"],
              ].map((r) => (
                <tr key={r[0]} className="border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                  <td className="px-3 py-2.5 text-base font-black" style={{ color: accent }}>{r[0]}</td>
                  <td className="px-3 py-2.5 font-mono text-sm font-bold" style={{ color: "#fff" }}>{r[1]}</td>
                  <td className="px-3 py-2.5" style={{ color: "rgba(251,249,244,0.7)" }}>{r[2]}</td>
                  <td className="px-3 py-2.5" style={{ color: "rgba(251,249,244,0.7)" }}>{r[3]}</td>
                  <td className="px-3 py-2.5 text-xs" style={{ color: "rgba(251,249,244,0.55)" }}>{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5">
          切る割合は <code>24% → 27% → 36% → 43% → 50% → 100%</code> と単調に増加する。
          これは単なる緩和ではなく、<strong>理解度と淘汰の強さを一致させる設計</strong>。
          <strong>厳しい淘汰が来る頃には、プレイヤーは既にルールを理解している。</strong>
          予選の理不尽さは「分からないうちに落とされた」ことに由来しており、これはその逆をやっている。
        </p>
        <Disclosure summary="なぜ20秒“等間隔”なのか（不均等でもよかった）" accent={accent}>
          <ul>
            <li><strong>プレイヤー</strong>：一度覚えれば以降は説明不要。秒読みが常に0〜20秒に収まり、数字の意味が直感的になる</li>
            <li><strong>観客・LT</strong>：「20秒ごとに人が減る」リズムが外から見て分かる。プレゼン中に「今20人減りました」と言える</li>
            <li><strong>実装</strong>：<code>atMs</code> が20000の倍数で揃う。デバッグ時に事故が起きにくい</li>
            <li>
              <strong>調整</strong>：間隔を触らず <code>targetAliveCount</code> だけで淘汰カーブを動かせる。
              <strong>調整変数が1本に減り、シミュレーションの試行が速く回る</strong>
            </li>
          </ul>
        </Disclosure>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          満たすべき条件は「決着は開始2分ちょうど（LTの尺）」「最後は10人で約20秒戦う」
          「どれだけ弱い人でも20秒は遊べる（予選の“10秒で終わる”体験を潰す）」
          「初回に50%を一気に切らない」の4つ。時刻はすべて固定し、
          動かすのは中間ステージの <code>targetAliveCount</code> だけと決めている。
        </p>
      </Panel>

      <Panel era="final" title={<SectionHeading id="honsen-finish">決着方式 — 「最後の1人を残さない」</SectionHeading>} accent={accent}>
        <pre className="codeblock">{`【危険】 10人 → 9人淘汰 → 1人だけ生存状態のまま試合が続いている？終わっている？
【安全】 10人 → 10人全員が同時に脱落 → 試合終了。全員がリザルトへ`}</pre>
        <p className="mt-4">
          120秒の最終ステージでは<strong>残り10店を全員同時に脱落させる</strong>。1店だけ勝ち残らせない。
          「9人を落として1人を残す」形にすると<strong>残った1人だけが試合に取り残される</strong>状態が生まれ、
          予選までの開発でも実際にこの不具合が出ていた。
          全員が同じタイミングで同じ状態に入れば、
          <strong>「勝者だけ別の状態にいる」という特殊ケースが構造ごと消える</strong>。
        </p>
        <p className="mt-3">
          もちろん<strong>プレイヤーの体験としては勝者が生まれる</strong>。
          差はクライアントの演出でつけ、1位／2〜3位／4〜10位／11位以下の4段階に分岐させる。
          <strong>処理はシンプルに、演出は豪華に。</strong>
          サーバーは「120秒で全員脱落・順位はスコア順」だけを持ち、
          盛り上がりの担保はクライアントの責務にした（
          <a href="/client" className="underline" style={{ color: "var(--color-client)" }}>
            クライアントサイド
          </a>
          ）。
        </p>
        <Disclosure summary="意図した副産物：決勝の10人＝上位10名リストと完全に一致する" accent={accent}>
          <pre className="codeblock">{`100秒時点で、上位10名リストが、そのまま生存者全員になる
  → 決勝では「リストに映っている全員が敵」という状態が生まれる
  → 誰が上で誰が下かが一目で分かり、逆転もリアルタイムで見える
  → 観戦している脱落者にも、何が起きているかが完全に伝わる`}</pre>
          <p className="mt-3">
            上位リストの表示件数を10に決めたことと、決勝の生存数を10に決めたことが噛み合い、
            <strong>試合が進むほどUIが情報を出し切った状態に収束する</strong>。
            LTで最も見せたい20秒が、最も分かりやすい画面になる。
          </p>
        </Disclosure>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          「勝敗2軸を混ぜない」という予選の看板設計を、自分で畳みにいく判断が一番きつかった。
          ただ予選で得た事実（正確に打ったほうが負けた／体力は見られていなかった）は、
          <strong>2軸のうち片方が運で動いていたことの証拠</strong>でもあった。
          機能を足して分かりやすくするのではなく<strong>削って分かりやすくする</strong>と決めたことで、
          サーバー・クライアント双方の実装まで一緒に軽くなった。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
