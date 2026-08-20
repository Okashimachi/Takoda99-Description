import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, DiffBadge, DiffTable, EffortNote, GitHubLink, TermTag } from "../components/Bits";
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
  { id: "honsen", label: "★ 本戦での差分" },
  { id: "proto", label: "Proto v0.8.0 移行" },
  { id: "removal", label: "無効化ではなく撤去" },
  { id: "ranking", label: "ランキングUIの新設" },
  { id: "personal", label: "予選のバグを設計で潰す" },
  { id: "simplify", label: "状態遷移が単純になった" },
  { id: "polish", label: "純増した演出まわり" },
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
        <p className="mt-3 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          <strong>2領域分割 〜 描画モジュール</strong> ＝ 予選版の設計（本戦でもそのまま生きている土台）。／
          <a href="#honsen" className="underline" style={{ color: accent }}>
            本戦での差分
          </a>{" "}
          以降 ＝ 本戦に向けた作り替え。
          <strong>アーキテクチャは1行も変えずに、ゲームの根幹の変更を吸収できた</strong>のがこのページの主題。
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
            <span style={{ color: "var(--color-ink-faint)" }} className="line-through">
              我慢ゲージはサーバー権威、<code>PatienceTimer</code> は表示専用カウントダウン。
              離脱は <code>CustomerLeft</code> を受信して初めて確定
            </span>
            <br />
            <span className="text-xs">
              → 本戦で我慢ゲージ・客の離脱ごと廃止（
              <a href="#removal" className="underline" style={{ color: accent }}>
                無効化ではなく撤去
              </a>
              ）。原則そのものは「勝敗に関わる値をクライアントで推測しない」として生き、
              <strong>脱落圏内かどうかも自前で判定せずサーバーの <code>cutStoreIds</code> / <code>selfAtRisk</code> に従う</strong>
              形へ引き継がれた
            </span>
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
          <li><code>SubStoreBoardView</code>：他98店のタイル（テト99風ミニ盤面）</li>
          <li><code>PatienceTimer</code></li>
        </ul>
        <p className="mt-3 text-xs" style={{ color: "var(--color-ink-faint)" }}>
          ※ <code>SubStoreBoardView</code> / <code>PatienceTimer</code> / <code>RankBarView</code> /{" "}
          <code>StarRatingView</code> と、<code>CreditLifeLanternState</code> /{" "}
          <code>RankBarViewState</code> などの値オブジェクトは本戦で撤去した（
          <a href="#removal" className="underline" style={{ color: accent }}>
            無効化ではなく撤去
          </a>
          ）。役割は <code>ranking-view/</code> の各パネルへ移譲されている。
        </p>
        <p className="mt-3">
          <code>ViewSampleDriver</code> でサーバー未接続でも画面を作れるようにした。
        </p>
        <p className="mt-3">
          <code>StoreVisualState</code> / <code>CustomerMoodState</code> / <code>TakoyakiStandState</code> /
          <code>CreditLifeLanternState</code> / <code>RankBarViewState</code> などの値オブジェクトで表示状態を導出。
          「stateから表示への変換」を純粋関数に閉じ込めてテスト可能にした。
        </p>
      </Panel>

      <Panel
        eyebrow="ここから本戦版"
        title={
          <SectionHeading id="honsen">
            <DiffBadge accent={accent} />
            本戦での差分 — MVUが破壊的な契約変更を吸収した
          </SectionHeading>
        }
        accent={accent}
      >
        <p>
          本戦ではゲームの根幹が変わった（
          <a href="/planning#honsen" className="underline" style={{ color: "var(--color-planning)" }}>
            企画側の方針転換
          </a>
          ）。信用（体力）制の廃止、客の離脱の廃止、評価→スコアへの置き換え、20秒ごとの段階足切り。
          クライアントから見ると、これは<strong>受信するデータの意味がまるごと入れ替わる</strong>変更になる。
        </p>
        <p className="mt-3">
          それでも <strong>MVU（<code>Dispatcher → Reducer → ClientState → View</code>）の構造は変えていない</strong>。
          変わったのは Action の顔ぶれと reducer のケース、そして View だけ。
          「書き込み口を1点に絞る」という予選の判断が、
          <strong>ゲーム性の作り替えという最大級の変更に対してそのまま効いた</strong>。
        </p>
        <div className="mt-5">
          <DiffTable
            accent={accent}
            items={[
              { label: "新規に受信するデータ", before: "—", after: "ゼロ。99人分は既に全員受信済みだった" },
              { label: "作業の中心", before: "—", after: "表示の撤去と再配置" },
              { label: "画面レイアウト", before: "縦画面", after: "縦画面のまま（向きを変えない）" },
              { label: "打鍵判定・OrderServed", before: "—", after: "変更なし" },
              { label: "状態遷移", before: "打鍵中に離脱の割り込みあり", after: "割り込みが構造的に消えた" },
            ]}
          />
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          「画面の向きを変えない」は消極的な判断ではなく明示的な決定。
          向きを変えると全画面の作り直しになり、残り2週間弱では吸収できない。
          <strong>変えるのはHUDの中身であって、画面の枠組みではない。</strong>
        </p>
      </Panel>

      <Panel title={<SectionHeading id="proto">Proto v0.8.0 移行 — <code>MatchEnd</code> が空になった</SectionHeading>} accent={accent}>
        <p>
          契約（Proto）が v0.5.0 → v0.8.0 に上がり、クライアントの本戦対応はここから始まった。
          <code>vendor/Takoda99.Proto/Messages.cs</code> は<strong>1文字も編集せず丸ごとコピーする手ミラー</strong>で、
          契約はこのリポジトリで確定しないという予選からの原則をそのまま維持している。
        </p>
        <ul className="mt-4">
          <li><strong>増えた</strong>：<code>RankingSnapshot</code>（全量）/ <code>RankingDelta</code>（差分）/ <code>StoreEliminatedBatch</code> / <code>PersonalResult</code></li>
          <li><strong>送られなくなった</strong>：<code>CustomerLeft</code> / <code>CreditUpdate</code> / <code>StoreListUpdate</code> / <code>StoreEliminated</code>（単体）</li>
          <li>
            <strong>最大の破壊的変更</strong>：<code>MatchEnd</code> が
            <strong>ペイロードを持たない空クラスになった</strong>。
            v0.5.0 では <code>finalRank</code> / <code>stats</code> / <code>reason</code> を運んでいたため、
            <code>MatchEndAction</code> / <code>MatchResult</code> / <code>Renderer.OnMatchEnd(int, MatchStats)</code> が
            <strong>この1点で総崩れになる</strong>
          </li>
        </ul>
        <Disclosure summary="Obsoleteフィールドは「消える」のではなく「0で届く」" accent={accent}>
          <p>
            Proto v0.8.0 は互換のため Obsolete フィールドを型から消していない。
            <strong>JSONにキーは存在し、ゼロ値が届く。</strong>
          </p>
          <ul className="mt-3">
            <li><code>InitialLife</code> = 0 → ライフゲージの最大値が0</li>
            <li><code>Normalized</code> / <code>StarRating</code> = 0 → 評価バー・星が常に0で描かれる</li>
            <li><code>EvalNormalized</code> / <code>CreditLife</code> = 0 → 他店タイルが全部「瀕死」に見える</li>
            <li><code>PatienceMaxMs</code> = 0 → 我慢ゲージが即0＝<strong>即離脱扱い</strong></li>
          </ul>
          <p className="mt-3">
            <strong>「参照しない」ではなく「参照ごと消す」</strong>をルールにし、
            <code>EvalNormalized</code> <code>CreditLife</code> <code>StarRating</code> <code>PatienceMaxMs</code>{" "}
            などで grep して0件であることを撤去の完了条件に置いた。
          </p>
        </Disclosure>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          廃止済みメッセージが万一届いた場合は、
          <strong>予選時点で実装済みの「知らないメッセージは黙って捨てる」経路がそのまま効く</strong>
          （<code>OnUnknownMessage</code> を出して state を変えない）。本戦対応で新たに書いたコードはない。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="removal">「無効化ではなく撤去」を方針として決めた</SectionHeading>} accent={accent}>
        <DecisionLog
          accent={accent}
          items={[
            {
              adopted: "使わなくなったコード・表示は消す（Proto側は互換のため残っていても、クライアントからは消す）",
              rejected: "残して呼ばない／値を0で握り潰す — Obsoleteはゼロ値で届くので、無効化より誤作動のほうが厄介",
            },
          ]}
        />
        <ul className="mt-4">
          <li><strong>撤去</strong>：信用ゲージ・提灯・店の体力表現／我慢ゲージ／星評価／たこ焼きの劣化演出／99店ミニ盤面（<code>SubStoreBoardView</code>）／ランクバー</li>
          <li>
            <strong>撤去しない</strong>：客キャラクター（属性別の見た目）・客の行列・背景・注文カウンタ <code>x/N</code>・屋号。
            <strong>ゲーム上の意味を失っただけで、画面からは消えない</strong>
          </li>
          <li>
            <strong>SEも撤去対象</strong>：他店脱落音の都度再生版は、そのまま使うと足切り時に24〜49回同時に鳴る
          </li>
        </ul>
        <Disclosure summary="いちばん消しにくかったもの：予選の特殊ケース対応" accent={accent}>
          <p>
            「動くから残す」をしない、と決めて消した分岐。いずれも<strong>前提そのものが消えている</strong>。
          </p>
          <ul className="mt-3">
            <li>
              <strong>「優勝者には <code>StoreEliminated</code> が来ない」ための特別扱い</strong>
              — 予選は最後の1店だけ脱落しないため、自分を順位一覧に載せる契機が <code>MatchEnd</code> しか無かった。
              本戦は120秒に全店が脱落するので、優勝者も同じ経路を通る
            </li>
            <li>
              <strong><code>MatchResult.Reason</code> の空文字で優勝を判定する処理</strong>
              — <code>MatchEnd.reason</code> が優勝の唯一の手がかりだった。今は <code>FinalRank == 1</code> で済む
            </li>
            <li>
              <strong>打鍵中に客が離脱したときの <code>AbortOrder</code> ＋状態巻き戻し</strong>
              — 客が逃げなくなった
            </li>
          </ul>
          <p className="mt-3">
            どれも<strong>長いコメント付きで実在していた</strong>ぶん、消す判断には根拠が要った。
            差分ドキュメント側に「なぜ前提が消えたか」を書いてから、コメントごと削除している。
          </p>
        </Disclosure>
      </Panel>

      <Panel title={<SectionHeading id="ranking">ランキングUIの新設 — 「上位を見せる／下位を急かす」</SectionHeading>} accent={accent}>
        <p>
          予選の99店ミニ盤面を置き換える、本戦UIの中核。
          仕様書8本ぶんの作り込みで、<strong>新しい通信は1つも増えていない</strong>
          （すべて <code>ClientState.Ranking</code> と <code>ClientState.Cull</code> から取る）。
        </p>
        <ul className="mt-4">
          <li><strong>上位10スロット</strong>：順位に従属するスロット配置と、行入れ替えの演出</li>
          <li><strong>下位ランキング</strong>：横3列×縦10行。脱落確定／警告／通常の帯で塗り分ける</li>
          <li><strong>オーディエンスパネル</strong>：脱落後に11〜99位の89店を一覧するグリッド</li>
          <li><strong>淘汰予告 ＋ 秒読み</strong>：予選のポップアップから<strong>常設UIへ格上げ</strong>。画面端ビネットの2段階警告＋中央カウントダウン</li>
          <li><strong>自店順位のネオンパネル</strong>：順位を主役へ昇格させ、スコアは補助表示に置く</li>
        </ul>
        <p className="mt-4">
          狙いは<strong>行動指針を情報配置だけで作ること</strong>。
          上位なら正確性でスコアを伸ばす、下位なら急ぐ、中位は両方が見えるので
          <strong>「上を目指すか逃げ切るか」というタイミングの判断が発生する</strong>。
          予選でテキストでは伝わらなかった軸を、画面配置だけで伝える。
        </p>
        <Disclosure summary="実装で効いた3つの前提" accent={accent}>
          <ul>
            <li>
              <strong>自分の順位はランキング表から引かない。</strong>
              <code>EvaluationUpdate.rank</code> を使う。ランキング表は差分の取りこぼしでズレ得る
              （全量 <code>RankingSnapshot</code> が来たら丸ごと置き換えてリセットする）
            </li>
            <li>
              <strong>順位と <code>cutLineRank</code> をクライアントで比較しない。</strong>
              脱落圏内かは <code>cutStoreIds</code> / <code>selfAtRisk</code> に従う。
              <strong>勝敗に関わる推測をクライアントにさせない</strong>という予選からの原則の適用
            </li>
            <li>
              <strong>表示件数は10件を下回らない。</strong>
              100秒以降は上位10名＝生存者全員になり、
              <strong>決勝がそのまま画面に収束する</strong>。行入れ替え演出が一番見られるのもこの20秒
            </li>
          </ul>
        </Disclosure>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          秒読みは<strong>ローカル補間</strong>。サーバーは1秒ごとの正確な配信を保証しないため、
          受信時刻を起点に毎フレーム計算し、次の受信で上書きする。
          <strong>表示の滑らかさはクライアントの責務</strong>と明示的に線を引いた。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="personal">予選のバグを、実装ではなく設計で潰した</SectionHeading>} accent={accent}>
        <p>予選で踏んだ、いちばん痛い不具合。</p>
        <pre className="codeblock">{`脱落モーダル →「次へ」→ 個人成績シーンへ遷移
                          ↓
              このシーンでサーバーからデータを受け取る設計だった
                          ↓
              しかしサーバーが個人成績を送るのは【全員の試合が終わった時】
                          ↓
              1位が決まる前に遷移すると、何も表示されない ★バグ`}</pre>
        <p className="mt-4">
          原因は<strong>画面遷移のタイミングとデータ受信のタイミングが結びついていたこと</strong>。
          <strong>プレイヤーがボタンを押す速さに、データの有無が依存していた。</strong>
        </p>
        <p className="mt-3">
          本戦では、<strong>脱落した瞬間に <code>PersonalResult</code> を受信して保持する</strong>方式に変えた。
          個人成績シーンは<strong>保持データを表示するだけで、サーバーへ問い合わせない</strong>。
        </p>
        <ul className="mt-4">
          <li><strong>いつ遷移してもデータは揃っている。</strong>ボタンを押す速さに依存しない</li>
          <li>脱落時点で最終順位は確定しているため、後から値が変わらない</li>
          <li>
            決勝の10店も120秒に脱落するため<strong>全員がこの経路を通る</strong>。例外処理が発生しない
          </li>
          <li>
            守るべき制約は1つだけに絞った ——{" "}
            <strong>次の試合の <code>MatchStart</code> より前に必ず破棄されていること</strong>
          </li>
        </ul>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-dim)" }}>
          99人中89人が最初に見る「結果」は個人成績画面であり、優先度は高い。
          リザルト側は <code>finalRank</code> で1位／2〜3位／4〜10位／11位以下の4段階に演出を分岐させる。
          <strong>サーバーは勝者を特別扱いしないので、盛り上がりの担保はクライアントの責務</strong>になった。
          優勝者だけは脱落モーダルを出さず Result へ直行させている。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="simplify">状態遷移が単純になった — 本戦最大の恩恵</SectionHeading>} accent={accent}>
        <pre className="codeblock">{`【予選】お題を表示 → 打鍵中 → ┬ 打ち切った → OrderServed
                              └ CustomerLeft が来た → 入力中断・行列から除去・次の客へ

【本戦】お題を表示 → 打鍵中 → 打ち切った → OrderServed`}</pre>
        <ul className="mt-4">
          <li>入力中断・状態巻き戻しの処理が<strong>不要になった</strong></li>
          <li>
            「打っている最中に対象が消える」ことに起因するバグが
            <strong>構造的に発生しなくなった</strong>
          </li>
          <li>体験としても<strong>一度出たお題は必ず打ち切れる</strong>。理不尽な中断がない</li>
        </ul>
        <p className="mt-4">
          逆に増えた複雑さもある。<strong>1ステージで最大49件の脱落が同時に届く</strong>ため、
          <code>StoreEliminatedBatch</code> を<strong>1つの演出・1回の大きな音に集約</strong>した。
          1件ずつ再生すると詰まり、SEは49回鳴る。
          脱落者を反映してからランキングを描き直すという<strong>適用順序</strong>も、通信シーケンス側で先に決めてから実装している。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="polish">削った分を演出に回した</SectionHeading>} accent={accent}>
        <p>
          本戦対応は撤去が中心だったぶん、空いた時間を<strong>体験の底上げ</strong>に使えた。
        </p>
        <ul className="mt-3">
          <li>
            <strong>たこ焼き調理アニメーション</strong>：手・舟皿・玉の飛行と鉄板の穴の巡回。
            調整値は ScriptableObject に外出しし、<strong>実機で見ながら詰められる</strong>形にした
          </li>
          <li>
            <strong>提供数に応じた舟皿の出し分け</strong>（2 / 4 / 8個）
          </li>
          <li>
            <strong>SE / BGM の一括管理</strong>：実体と音量を SO 1つに集約し、鳴らす側は識別子（<code>SoundId</code>）だけを知る。
            <code>FontTheme</code> / <code>CustomerSpriteLibrary</code> と同じ「実体はSOに外出しする」方針の音版
          </li>
          <li>
            <strong>WebGL の日本語入力（IME）対応</strong>：unityroom 上で日本語入力を有効にしたままでも打鍵が通るようにした
          </li>
          <li>
            <strong>リザルト／マッチング画面のネオン刷新</strong>：情報量を削ったぶん、1枚あたりの面積を大きく取れた
          </li>
        </ul>
        <p className="mt-4 text-xs" style={{ color: "var(--color-ink-faint)" }}>
          ※ 音源素材は <a href="https://otologic.jp/" target="_blank" rel="noreferrer noopener" className="underline">OtoLogic</a> から取得。
          音源ファイル本体はリポジトリにコミットせず <code>.meta</code> のみ管理している。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          <strong>本戦：</strong>
          ゲームの根幹が変わったのに、<strong>アーキテクチャの選定をやり直す必要がまったく無かった</strong>のが一番の収穫。
          MVUで書き込み口を1点に絞っていたおかげで、
          <code>MatchEnd</code> が空クラスになるという破壊的変更も
          「Actionを差し替えてreducerのケースを書き直す」定型作業に落ちた。
        </p>
        <p className="mt-3">
          逆に神経を使ったのは<strong>撤去</strong>のほう。
          Obsoleteフィールドが0で届く以上、「残して呼ばない」は無効化ではなく<strong>誤作動</strong>になる。
          grepして0件、を完了条件に置くところまで決めてから手を動かした。
          予選の個人成績のバグも、
          <strong>同じ実装をやり直すのではなく「遷移とデータ受信を切り離す」という設計変更で潰した</strong>のが、
          本戦でいちばん納得のいった判断。
        </p>
        <p className="mt-3">
          <strong>予選：</strong>
          促音・撥音・拗音の文脈解決は、日本語タイピングゲームの定番の落とし穴。
          テーブル側に寄せる判断のおかげで、TypingJudge自体は非常にシンプルなまま保てた。
          WebGLのWebSocket制約は開発初期に潰しておいたことで、後半の機能追加を疎通不安なく進められた。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
