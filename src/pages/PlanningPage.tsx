import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { sections } from "../lib/accentTheme";

const accent = sections.planning.accent;

const toc = [
  { id: "concept", label: "コンセプト" },
  { id: "coreplay", label: "コアプレイ" },
  { id: "twoaxis", label: "評価と信用" },
  { id: "elimination", label: "脱落経路" },
  { id: "risk", label: "リスクとリターン" },
  { id: "customers", label: "客属性とメカニクス" },
  { id: "decisions", label: "意思決定ログ" },
  { id: "pivot", label: "ピボットの話" },
  { id: "glossary", label: "用語集の統治" },
];

export default function PlanningPage() {
  return (
    <PageLayout
      section="planning"
      title="企画/仕様"
      lead="なぜこのゲームなのか。何を採用し、何を却下したか。意思決定の見せ場です。"
      ownerLine="担当: カシュー"
      toc={toc}
    >
      <Panel title={<SectionHeading id="concept">コンセプトと参照元</SectionHeading>} accent={accent}>
        <p>
          コアプレイは<strong>寿司打</strong>のタイピング、対戦構造は<strong>テトリス99</strong>の
          「99人・下位淘汰」を参照した。寿司打の「速く正確に打つ気持ちよさ」を、
          1人ではなく99店が同時にやり合うバトルロワイヤルに乗せ替えることで、
          単なるタイピング練習ではなく「サバイバル」の緊張感を持たせている。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="coreplay">コアプレイの図解</SectionHeading>} accent={accent}>
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

      <Panel title={<SectionHeading id="twoaxis">勝敗2軸を「混ぜない」設計</SectionHeading>} accent={accent}>
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

      <Panel title={<SectionHeading id="elimination">2つの脱落経路と緊張カーブ</SectionHeading>} accent={accent}>
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

      <Panel title={<SectionHeading id="risk">リスクとリターンのマップ</SectionHeading>} accent={accent}>
        <p>
          「速く打つ」か「正確に打つ」か、「行列を溜めて捌く」か「JK(<TermTag>Buzz</TermTag>)を優先して取る」か。
          プレイヤーの判断1つ1つが評価と信用のどちらに効くかを分けて設計している。
          速度偏重は信用リスクを溜めやすく、正確性偏重は評価の伸びが遅くなる、という
          トレードオフをコアプレイの時点で仕込んだ。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="customers">客属性とメカニクス</SectionHeading>} accent={accent}>
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

      <Panel title={<SectionHeading id="decisions">意思決定ログ</SectionHeading>} accent={accent}>
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

      <Panel title={<SectionHeading id="pivot">ピボットの話：テキストロ99からの全面刷新</SectionHeading>} accent={accent}>
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

      <Panel title={<SectionHeading id="glossary">用語集をユビキタス言語の正典にする統治</SectionHeading>} accent={accent}>
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
    </PageLayout>
  );
}
