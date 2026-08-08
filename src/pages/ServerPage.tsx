import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { CodeBlock, EffortNote, GitHubLink } from "../components/Bits";
import { sections } from "../lib/accentTheme";
import { LayerDiagram } from "../components/LayerDiagram";

const accent = sections.server.accent;

const toc = [
  { id: "layers", label: "層アーキテクチャと純関数コア" },
  { id: "room", label: "単一ゴルーチンとロックフリー設計" },
  { id: "transport", label: "99人同期のスパイク・帯域対策" },
  { id: "disconnect", label: "切断の扱い：例外処理の割り切り" },
  { id: "liveops", label: "止まらないLiveOps運用" },
  { id: "infra", label: "あえてのDocker廃止と10秒デプロイ" },
];

export default function ServerPage() {
  return (
    <PageLayout
      section="server"
      title="サーバーサイド"
      lead="限界までリソースを切り詰めた超軽量アーキテクチャ。99人マルチプレイをメモリ1GBの最弱インスタンスで回し切る泥臭い工夫が詰まっています。"
      ownerLine="担当: りーせ"
      toc={toc}
    >
      <Panel title={<SectionHeading id="layers">層アーキテクチャと純粋関数コア</SectionHeading>} accent={accent}>
        <p className="mb-4">「変わらないもの（コア）を、変わるもの（部品）から守る」ための分離設計です。</p>
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
          <LayerDiagram />
        </div>
        <ul className="mt-4">
          <li><strong>戦闘の権威の純化</strong>：コア（<code>game</code>）から通信・時計・I/Oを完全に排除し、<code>Tick(dt)</code> だけで進む純粋な状態機械にしました。</li>
          <li><strong>ヘッドレスシミュレータ</strong>：通信を介さず「メモリ上だけで99人対戦を数秒で回す」超高速の負荷テストを実現し、クライアント完成前からバランス調整を可能にしています。</li>
          <li><strong>depguardによる機械強制</strong>：コア層への不要な import をCIツールで機械的に弾き、後輩エンジニアが部品をいじっても心臓部が絶対に壊れない安全な砂場を提供しています。</li>
        </ul>
        <GitHubLink href="https://github.com/Okashimachi/Takoda99-Server">Takoda99-Server</GitHubLink>
      </Panel>

      <Panel title={<SectionHeading id="room">単一ゴルーチンとロックフリー設計</SectionHeading>} accent={accent}>
        <p>
          99人からの同時打鍵報告を排他制御（Mutex）でロックするのではなく、1試合につき1つのGoroutineとChannel（<code>inbox</code>）に全て流し込んで直列処理（selectループ）する設計です。
        </p>
        <ul className="mt-3">
          <li><strong>競合の完全排除</strong>：状態更新が必ず1列に並ぶため、Race Conditionが構造上発生しません。</li>
          <li><strong>爆速な処理</strong>：ロック待機時間がゼロになり、Go言語の並行処理の強み（Share memory by communicating）を最大限に活かしています。</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="transport">99人同期のスパイク対策と帯域コントロール</SectionHeading>} accent={accent}>
        <p>
          99人対戦で一番怖い「通信スパイク（O(N^2)の爆発）」を防ぐため、徹底した通信の間引きと非同期化を行っています。
        </p>
        <ul className="mt-3">
          <li><strong>通信頻度の間引き</strong>：マッチング時の入室通知は1秒ごと、試合中の全店状態リスト（<code>StoreListUpdate</code>）は250ms間隔に絞り、帯域の破綻を防いでいます。</li>
          <li><strong>スローコンシューマの非同期切断</strong>：Send処理は全て非同期キューに逃し、回線が遅くてキューが詰まるプレイヤーがいれば、サーバ全体の遅延を防ぐため容赦なく接続を切り捨てます（Eviction）。</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="disconnect">切断の扱い：例外処理を経済モデルに丸投げ</SectionHeading>} accent={accent}>
        <p>
          マルチプレイ特有の「回線落ちしたプレイヤーの扱い」に対して、切断専用の復帰機構やBot化といった複雑な処理をあえて作っていません。
        </p>
        <div
          className="mt-4 rounded-xl border-l-4 p-4 text-sm font-bold"
          style={{ borderColor: accent, background: "var(--color-base-panel)", color: "var(--color-ink)" }}
        >
          切断した店は注文を送らなくなる → 放置された客が我慢切れで帰る → 信用が減る → 0で自滅脱落（SelfCollapse）
        </div>
        <p className="mt-3">
          という、ゲームの既存の経済モデルだけで自然に脱落させる設計です。「機能を足さずにドメインルールで解決する」割り切りの見本です。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="liveops">止まらないLiveOps運用（動的パラメータ更新）</SectionHeading>} accent={accent}>
        <p>
          ハッカソン本番でのトラブルや「人が集まらない」問題に対処するための運用基盤です。
        </p>
        <ul className="mt-3">
          <li><strong>再起動不要のパラメータ反映</strong>：Supabase Postgresと設定APIを利用し、ゲームのバランス調整やマッチング下限人数をサーバを落とさずにリアルタイムで変更できます。</li>
          <li><strong>Bot自動補完</strong>：過疎帯でもゲームが成立するよう、足りない定員をBotが自動で埋めるフォールバックを用意しています。</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="infra">あえてのDocker廃止と10秒ホットフィックス</SectionHeading>} accent={accent}>
        <p>
          GCPの無料枠（メモリ1GBのe2-micro）で99人対戦を動かし切るための、泥臭いインフラ最適化です。
        </p>
        <ul className="mt-3">
          <li><strong>Dockerを捨てる勇気</strong>：Dockerデーモンだけでメモリを50〜100MB消費するためコンテナを廃止。Goの静的バイナリ（約11MB）をsystemdで直置き起動し、極限までメモリを節約しています。</li>
          <li><strong>展示本番での機動力</strong>：巨大なCI/CDを組まず、手元でビルドしたバイナリをscpで送るだけ。展示中の試合の合間にわずか10秒でバグ修正（ホットフィックス）を当てられる運用力を持っています。</li>
        </ul>
        <Disclosure summary="コスト制約下のインフラ判断（デプロイコマンド例）" accent={accent}>
          <CodeBlock>{`GOOS=linux GOARCH=amd64 CGO_ENABLED=0 \\
  go build -o takoda99-server ./cmd/server
scp takoda99-server vm:/opt/takoda99/
ssh vm 'sudo systemctl restart takoda99'`}</CodeBlock>
        </Disclosure>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          「純関数コアによる隔離」「単一ゴルーチンによるロックフリー」「異常系をゲームルールに丸投げする割り切り」など、見た目の地味さの裏にエンジニアリングのロマンを詰め込みました。ハッカソン後半にコードが荒れても、コアパッケージだけは最後まで壊れない堅牢さを証明できました。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
