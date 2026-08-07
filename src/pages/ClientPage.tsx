import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { sections } from "../lib/accentTheme";

const accent = sections.client.accent;

const toc = [
  { id: "split", label: "pureC# / Unity 分割" },
  { id: "mvu", label: "MVU アーキテクチャ" },
  { id: "modules", label: "モジュール構成" },
  { id: "typing", label: "打鍵判定の作り込み" },
  { id: "send", label: "送信設計" },
  { id: "webgl", label: "WebGL制約" },
  { id: "principles", label: "絶対原則" },
  { id: "views", label: "描画モジュール" },
];

const pureModules = [
  ["01", "Contract", "Proto参照・Envelopeコーデック"],
  ["02", "RomajiTable", "ローマ字テーブル・かな分割"],
  ["03", "TypingJudge", "打鍵判定 ※クライアント唯一のローカルドメイン"],
  ["04", "Store / Reducer", "ClientStateの唯一の保持者"],
  ["05", "Dispatcher", "Envelope.type振り分け・送信キュー"],
  ["06", "MatchClientController", "ライフサイクル状態機械・結線"],
  ["07", "ScenarioPlayer", "サンプルデータ再生・テスト専用"],
];

export default function ClientPage() {
  return (
    <PageLayout
      section="client"
      title="クライアントサイド"
      lead="サーバー権威下の“薄いクライアント”を、いかに壊れない形で組むか。"
      ownerLine="担当: カシュー"
      toc={toc}
    >
      <Panel accent={accent}>
        <p>
          Unity WebGL / unityroom公開。クライアントは受信stateを描画するだけの薄い層に徹する。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="split">2領域分割：pureC# と Unity</SectionHeading>} accent={accent}>
        <ul>
          <li>判断基準は「<code>UnityEngine</code> を書かずに実装できるか」だけ</li>
          <li>pureC# は DLL としてビルドし <code>Assets/Plugins/Takoda99/</code> から参照（<code>dotnet test</code> 実行で自動コピー）</li>
          <li>利点：Unityを起動せずにビルド・単体テストできる ＝ ロジックのCIが速い</li>
          <li>pureC#/src に UnityEngine を持ち込むのは絶対禁止</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="mvu">アーキテクチャ選定：MVU（単方向データフロー）</SectionHeading>} accent={accent}>
        <p>
          <code>Dispatcher → Reducer → ClientState → View</code>、打鍵は <code>TypingJudge → OrderServed</code>。
        </p>
        <ul>
          <li>stateの実体はサーバーにあり、書き込み口を1点に絞るのが素直</li>
          <li>プレーンC#＋イベント購読で書ける</li>
          <li>バグの切り分けが機械的</li>
          <li>AIに書かせやすい（Action追加＋reducerに1ケース、の定型作業に落ちる）</li>
        </ul>
        <Disclosure summary="却下したアーキテクチャとその理由" accent={accent}>
          <DecisionLog
            accent={accent}
            items={[
              { adopted: "MVU（単方向データフロー）", rejected: "MVVM — Viewからstateを書き戻せて原則を構造的に守れない" },
              { adopted: "MVU（単方向データフロー）", rejected: "ECS — クライアントにシミュレーションが無い" },
              { adopted: "MVU（単方向データフロー）", rejected: "素のMVP — 書き込み口が分散する" },
              { adopted: "MVU（単方向データフロー）", rejected: "汎用状態管理ライブラリ — stateはサーバーの写しなので不要" },
            ]}
          />
        </Disclosure>
        <p className="mt-4">
          なおフルDDDは採らない。ドメインモデルは持たず、ユビキタス言語だけを踏襲する構成にしている。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="modules">モジュール構成（pureC#、依存順＝実装順）</SectionHeading>} accent={accent}>
        <div className="space-y-2">
          {pureModules.map(([n, name, desc]) => (
            <div key={n} className="flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: "var(--color-border-soft)" }}>
              <span className="font-mono text-xs" style={{ color: accent }}>{n}</span>
              <div>
                <div className="font-bold text-sm" style={{ color: "var(--color-ink)" }}>{name}</div>
                <div className="text-xs" style={{ color: "var(--color-ink-dim)" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          Unity側：<code>foundation</code> / <code>platform</code> / <code>matchmaking</code> / <code>match-view</code> / <code>value-objects</code>
        </p>
        <GitHubLink href="https://github.com/Okashimachi/Takoda99-Unity">Takoda99-Unity</GitHubLink>
      </Panel>

      <Panel title={<SectionHeading id="typing">打鍵判定の作り込み</SectionHeading>} accent={accent}>
        <ul>
          <li>日本語ローマ字入力の複数表記を受理する前方一致オートマトン</li>
          <li>
            促音「っ」の文脈解決：次が子音なら重ね（<code>takko</code>）＋ <code>xtu/ltu/ltsu/xtsu</code>、
            母音始まり/語末なら <code>xtu</code>系のみ
          </li>
          <li>撥音「ん」の文脈解決、拗音の最長一致分割（「しゃ」を「し」+「ゃ」に割らない）</li>
          <li>未登録のかなでも例外を投げず1打鍵単位として通す（お題でクラッシュさせない）</li>
        </ul>
        <Disclosure summary="設計判断：文脈解決の置き場所" accent={accent}>
          <p>
            文脈解決をテーブル側(<code>Segment</code>)に寄せ、判定側は「候補集合を前方一致で辿るだけ」に保った。
            テストしやすい形にするための意図的な役割分担。
          </p>
        </Disclosure>
        <ul className="mt-4">
          <li>
            <code>elapsedMs</code> の起点は「最初の打鍵」ではなく「客が行列先頭になった時」
            → 行列を溜める戦略にちゃんとペナルティが乗る
          </li>
          <li>
            <TermTag>IClock</TermTag> を抽象化（pureC# は <code>UnityEngine.Time</code> を参照できないため）
          </li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="send">送信設計：注文単位での集約</SectionHeading>} accent={accent}>
        <p>
          1文字ごとに送らない。注文単位で <code>OrderServed</code>（<code>customerId</code> / <code>elapsedMs</code> /
          <code>missCount</code> / <code>clientTimestamp</code>）に集約する。
          99人×毎打鍵の帯域を回避し、レイテンシの影響も受けにくい。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="webgl">WebGL制約</SectionHeading>} accent={accent}>
        <p>
          <code>System.Net.WebSockets</code> が使えないため <TermTag>NativeWebSocket</TermTag> を採用。
          自前のディスパッチループが無いため <code>Update</code> で <code>DispatchMessageQueue()</code> を呼ぶ
          （WebGLビルドでは no-op、エディタ/スタンドアロンでのみ必要）。<code>ConnectAsync</code> は fire-and-forget。
        </p>
        <p className="mt-3">最大の技術リスクをWebGL疎通確認として最優先で潰した。</p>
      </Panel>

      <Panel title={<SectionHeading id="principles">絶対原則</SectionHeading>} accent={accent}>
        <ul>
          <li>C#に経営ロジックを書かない（例外は打鍵判定＋その集計のみ）</li>
          <li>描画は必ず受信state経由。楽観的更新で経営数値を先取りしない</li>
          <li>
            我慢ゲージはサーバー権威、<code>PatienceTimer</code> は表示専用カウントダウン。
            離脱は <code>CustomerLeft</code> を受信して初めて確定
          </li>
          <li>クライアントは外部DBを直接取得しない（<code>MatchStart.params</code> の公開サブセットのみ）</li>
          <li>契約はこのリポジトリで確定しない（Proto の人間承認へ）</li>
          <li>操作は文字キーのみ</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="views">描画モジュールと値オブジェクト</SectionHeading>} accent={accent}>
        <ul>
          <li><code>MainStoreView</code>：暖簾・屋台土台・お題単語・提灯・鉄板</li>
          <li><code>TakoyakiStandView</code>：24穴のスロット</li>
          <li><code>SubStoreBoardView</code>：他98店のタイル</li>
          <li><code>PatienceTimer</code></li>
        </ul>
        <p className="mt-3">
          <code>ViewSampleDriver</code> でサーバー未接続でも画面を作れるようにした。
        </p>
        <p className="mt-3">
          <code>StoreVisualState</code> / <code>CustomerMoodState</code> / <code>TakoyakiStandState</code> /
          <code>CreditLifeLanternState</code> / <code>RankBarViewState</code> などの値オブジェクトで表示状態を導出。
          「stateから表示への変換」を純粋関数に閉じ込めてテスト可能にした。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          促音・撥音・拗音の文脈解決は、日本語タイピングゲームの定番の落とし穴。
          テーブル側に寄せる判断のおかげで、TypingJudge自体は非常にシンプルなまま保てた。
          WebGLのWebSocket制約は開発初期に潰しておいたことで、後半の機能追加を疎通不安なく進められた。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
