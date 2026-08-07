import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { CodeBlock, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { sections } from "../lib/accentTheme";
import { LayerDiagram } from "../components/LayerDiagram";

const accent = sections.server.accent;

const toc = [
  { id: "why-go", label: "なぜGoか" },
  { id: "layers", label: "層アーキテクチャ" },
  { id: "loop", label: "試合ループ" },
  { id: "room", label: "room" },
  { id: "transport", label: "transport" },
  { id: "disconnect", label: "切断の扱い" },
  { id: "limiter", label: "接続数リミッター" },
  { id: "algo", label: "客・評価アルゴリズム" },
  { id: "cheat", label: "チート耐性" },
  { id: "persistence", label: "永続化" },
  { id: "infra", label: "インフラ" },
  { id: "plans", label: "plan / issue 運用" },
];

const steps = [
  "stepPhase", "stepDistribute", "stepPatience", "stepEvaluate",
  "stepNormalize", "stepHeat", "stepStorm", "checkFinish",
];

export default function ServerPage() {
  return (
    <PageLayout
      section="server"
      title="サーバーサイド"
      lead="Goで99人同時対戦を回し、コアを壊させない。技術的な密度が最も高いページです。"
      ownerLine="担当: りーせ"
      toc={toc}
    >
      <Panel title={<SectionHeading id="why-go">言語選定：なぜGoか</SectionHeading>} accent={accent}>
        <ul>
          <li>設計がサーバー権威になり「クライアントと共有するためにC#」の理由が消えた</li>
          <li>goroutineによる大量同時接続 / 低GCレイテンシ / 静的リンク単一バイナリ</li>
        </ul>
        <p className="mt-3">当初C#予定から選び直した経緯込みでの判断。</p>
        <GitHubLink href="https://github.com/Okashimachi/Takoda99-Server">Takoda99-Server</GitHubLink>
      </Panel>

      <Panel title={<SectionHeading id="layers">層アーキテクチャ</SectionHeading>} accent={accent}>
        <p className="mb-4">このページの主役。「変わらないもの（コア）を、変わるもの（部品）から守る」のが設計目標。</p>
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
          <LayerDiagram />
        </div>
        <ul className="mt-4">
          <li><code>game</code> は他の internal 部品を import しない（proto は可）</li>
          <li>
            <code>game</code> がお題を使いたいときは <code>ports.go</code> に interface を定義して注入させる
            （<code>WordSource</code> / <code>ConfigProvider</code>）。<code>game</code> は odai の実体を知らない
          </li>
          <li>組み立ては <code>main.go</code>（合成ルート）だけ</li>
        </ul>
        <Disclosure summary="機械強制：depguard と CI の門番" accent={accent} defaultOpen>
          <p>
            これを <TermTag>depguard</TermTag> で機械強制し、<code>go test ./internal/game/...</code> をCIの門番にしている。
          </p>
          <p className="mt-2 font-bold" style={{ color: accent }}>
            「後輩が層3で何を書いてもコアは無事。最悪その部品が変になるだけ」
          </p>
        </Disclosure>
      </Panel>

      <Panel title={<SectionHeading id="loop">試合ループ</SectionHeading>} accent={accent}>
        <p>
          <code>Session</code> は純粋な状態機械。時計を持たず <code>dt</code> を外から受ける。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <span key={s} className="rounded-full border px-3 py-1.5 text-xs font-mono" style={{ borderColor: "var(--color-border)", color: "var(--color-ink)" }}>
              {i + 1}. {s}
            </span>
          ))}
        </div>
        <p className="mt-4">
          step関数を純粋に保った結果、実tickでもヘッドレスsimでも同じ試合コードが動く
          （<a href="/process" className="underline" style={{ color: "var(--color-process)" }}>開発手法</a>のヘッドレスシミュレータに接続）。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="room">room：1試合＝1goroutine＋1channel</SectionHeading>} accent={accent}>
        <p>
          inbox（入力適用）と ticker（Tick）を select で回す。判断はsession goroutineのみで行う。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="transport">transport の実運用上の工夫</SectionHeading>} accent={accent}>
        <ul>
          <li>
            Send は非同期（送信キュー＋writeLoop）。単一goroutineから全接続へ順にSendするので、
            ここで実I/Oすると半開接続1つで試合全体が止まる
          </li>
          <li>キューが埋まった接続は切る（<TermTag>slow-consumer eviction</TermTag>）</li>
          <li>Close は残りを吐き切ってから閉じる（最終 <code>MatchEnd</code> を落とさないため）</li>
          <li>Bot も人間も同じ <code>Connection</code> として room からは区別しない（InMemory実装）</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="disconnect">切断の扱い：切断専用機構を持たない</SectionHeading>} accent={accent}>
        <p>
          切断した店は <code>OrderServed</code> を送らなくなる → 客が我慢ゲージ切れで離脱 → 信用減 →
          0で自滅、と既存の経済モデルだけで自然に脱落する。
        </p>
        <ul className="mt-3">
          <li>Bot引き継ぎをしない理由：離脱のペナルティが消えて公平性が崩れる</li>
          <li>即時脱落もしない理由：一時的な回線断で即死すると再接続の余地がない</li>
        </ul>
        <div
          className="mt-4 rounded-xl border-l-4 p-4 text-sm font-bold"
          style={{ borderColor: accent, background: "var(--color-base-panel)", color: "var(--color-ink)" }}
        >
          「機能を足さずに済ませる」判断の見本。
        </div>
      </Panel>

      <Panel title={<SectionHeading id="limiter">接続数リミッター</SectionHeading>} accent={accent}>
        <p>
          <code>maxConcurrentConnections=200</code>（99人＋余裕）、超過は503。
          枠は接続の生存期間ぶん保持する（upgrade直後に返すと居座る接続に無防備）。
          解放検知に <code>Connection.Done()</code> を使う
          （<code>Receive()</code> を監視すると room の readConn とチャネルを奪い合う）。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="algo">客・評価アルゴリズム</SectionHeading>} accent={accent}>
        <ul>
          <li>客300人固定・たべたべエリア（<code>RestPool</code>）で神視点管理。商圏は廃止</li>
          <li>分配は「正規化評価 ÷ (行列長+1)」の重み付き抽選</li>
          <li>
            評価 = <TermTag>EMA</TermTag>(精度・速度) ＋ バズ加点(減衰・上限) − クレーマー減点 →
            生存店内で<TermTag>パーセンタイル正規化</TermTag>
          </li>
          <li>「実力を伴わない上昇を抑制する」チューニング思想</li>
          <li>
            火力 <code>heat = heatBase + heatPerAliveDrop*(99-生存数) + heatPerPhase</code>。
            効き先は お題難度 と 我慢ゲージ短縮
          </li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="cheat">チート耐性</SectionHeading>} accent={accent}>
        <p>
          クライアント報告を信頼する構造なので、サーバーにサニティ上限（1単語あたり最短時間 / missCount妥当域 /
          提供間隔 / 割当済み客か）を設けている。
        </p>
        <p className="mt-3">ハッカソンなので性善説だが、境界は認識している——と正直に書く方が強い。</p>
      </Panel>

      <Panel title={<SectionHeading id="persistence">永続化の切り分け</SectionHeading>} accent={accent}>
        <p>
          ライブ試合状態はメモリ（レイテンシ）、GameParameters / 単語 / 試合結果は Supabase Postgres。
          結果保存は best-effort。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="infra">インフラ：GCP e2-micro + Caddy + systemd</SectionHeading>} accent={accent}>
        <ul>
          <li>
            <strong>Dockerをやめた理由</strong>：RAM 1GBのうちDockerデーモンが50〜100MB常駐する。
            <code>CGO_ENABLED=0</code> の静的リンクバイナリなので依存の同梱という理由がそもそも無い
          </li>
          <li>
            0.25 vCPUでの docker build は数分＋OOMリスク。手元クロスコンパイルなら
            約10秒＋15MB転送 → 試合の合間にホットフィックスを当てられる
          </li>
        </ul>
        <Disclosure summary="コスト制約下のインフラ判断（デプロイコマンド例）" accent={accent}>
          <CodeBlock>{`GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \\
  go build -o takoda99-server ./cmd/server
scp takoda99-server vm:/opt/takoda99/
ssh vm 'sudo systemctl restart takoda99'`}</CodeBlock>
        </Disclosure>
      </Panel>

      <Panel title={<SectionHeading id="plans">27本の plan（実装計画書）とissue運用</SectionHeading>} accent={accent}>
        <p>
          Tier A〜Dの優先度づけ、依存関係グラフ、「着手判定が要る plan」を明示している運用。
          「やらないことを決めている」ことが伝わる。
          <a href="/process" className="mx-1 underline" style={{ color: "var(--color-process)" }}>開発手法</a>ページと相互リンク。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          切断を専用機構にせず既存の経済モデルに乗せる判断は、見た目は地味だが最も設計の筋が良い部分。
          層アーキテクチャをdepguardで機械強制したことで、ハッカソン後半にコードが荒れても
          game パッケージだけは最後まで壊れなかった。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
