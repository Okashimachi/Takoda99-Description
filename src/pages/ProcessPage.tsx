import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { CodeBlock, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { sections } from "../lib/accentTheme";
import { images } from "../assets/images";

const accent = sections.process.accent;

const toc = [
  { id: "multirepo", label: "マルチレポ構成" },
  { id: "cascade", label: "正典のカスケード" },
  { id: "sdd", label: "仕様書駆動開発" },
  { id: "ai", label: "AI駆動開発" },
  { id: "git", label: "Git運用" },
  { id: "params", label: "調整パラメータの外部化" },
  { id: "sim", label: "ヘッドレスシミュレータ" },
];

const repos = [
  ["Takoda99-Docs", "企画・ゲーム仕様の正典"],
  ["Takoda99-Proto", "DTO/メッセージ契約（唯一の結合点）"],
  ["Takoda99-Client-Docs", "クライアント設計の正典"],
  ["Takoda99-Server", "Go サーバー"],
  ["Takoda99-Unity", "Unityクライアント（Unity/ と pureC#/ の2領域）"],
];

export default function ProcessPage() {
  return (
    <PageLayout
      section="process"
      title="開発手法"
      lead="3人でハッカソン期間内にネトゲを作るための工夫。このチームの一番の武器です。"
      ownerLine="担当: カシュー（チーム全体の運用）"
      toc={toc}
    >
      <Panel title={<SectionHeading id="multirepo">マルチレポ構成（5本）とその理由</SectionHeading>} accent={accent}>
        <div className="space-y-2">
          {repos.map(([name, desc]) => (
            <div key={name} className="flex flex-wrap items-center gap-2 rounded-lg border p-3" style={{ borderColor: "var(--color-border-soft)" }}>
              <GitHubLink href={`https://github.com/Okashimachi/${name}`}>{name}</GitHubLink>
              <span className="text-sm" style={{ color: "var(--color-ink-dim)" }}>{desc}</span>
            </div>
          ))}
        </div>
        <ul className="mt-4">
          <li>AIに渡すコンテキスト量の削減</li>
          <li>Unityのシーン/Prefab/アセットのコンフリクト隔離</li>
          <li>1ドキュメント＝1作業ブランチ相当の粒度</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="cascade">正典のカスケード</SectionHeading>} accent={accent}>
        <div className="overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 py-2 text-sm font-bold">
            {["Takoda99-Docs", "Takoda99-Proto", "Takoda99-Client-Docs", "各リポジトリの .sdd", "実装コード"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-lg border px-3 py-2" style={{ borderColor: accent, color: "var(--color-ink)" }}>{s}</span>
                {i < arr.length - 1 && <span style={{ color: "var(--color-ink-faint)" }}>→</span>}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4">
          「矛盾したら常に上流が優先」という一方向のルール。
          <strong>Proto の変更だけは人間承認フローに回す</strong>＝AIに触らせない境界を明示している。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="sdd">仕様書駆動開発（SDD）</SectionHeading>} accent={accent}>
        <p>本サイトの核心のひとつ。</p>
        <ul>
          <li>実装より必ず仕様書が先。仕様書が無いモジュールを src に書かない</li>
          <li>1仕様書 ＝ 1ブランチ ＝ 1PR の粒度に切ってある</li>
          <li>仕様書は「宣言的に」書く（議事録ではなく「何がどういう形か」）</li>
          <li>実装中に仕様と違う判断をしたら、コードでなく仕様書を先に直す</li>
          <li><code>spec:</code> コミットと <code>feat:</code> コミットを分け、仕様のdiffが読める形にする</li>
          <li>各 .cs の先頭に対応仕様書のパスをコメントで書く</li>
        </ul>
        {images.dev.sddIndex && (
          <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "var(--color-border-soft)" }}>
            <img src={images.dev.sddIndex} alt=".sdd 索引" className="w-full rounded-lg" />
            <p className="mt-2 text-xs" style={{ color: "var(--color-ink-faint)" }}>.sdd 索引（依存順・✅列）</p>
          </div>
        )}
      </Panel>

      <Panel title={<SectionHeading id="ai">AI駆動開発の実践</SectionHeading>} accent={accent}>
        <p>今のハッカソンで一番刺さる話題。</p>
        <ul>
          <li>
            各リポジトリに <code>CLAUDE.md</code> / <code>AGENTS.md</code> を置いて責務・依存・禁止事項を宣言
          </li>
          <li>してはいけない設計のチェックリストを明文化してAIに渡す</li>
          <li>AIに書かせやすい設計を選ぶ（<a href="/client" className="underline" style={{ color: "var(--color-client)" }}>クライアントのMVU採用理由</a>に直結）</li>
          <li>デバッグパネル（送受信Envelopeの生JSON表示）を最初に作る → AI生成コードのバグの切り分けを即断できる</li>
          <li>進捗の正典は GitHub issue、内容の正典は plan/spec、と分けている</li>
        </ul>
        <Disclosure summary="機械強制の例（禁止事項の宣言）" accent={accent} defaultOpen>
          <CodeBlock>{`unity: "C#に経営ロジックを書かない（サーバー権威）"
server: "game は他の internal 部品を import しない"`}</CodeBlock>
          <p className="mt-3">
            Go は <code>.golangci.yml</code> の <TermTag>depguard</TermTag> で逆流importをCIで弾き、
            <code>go test ./internal/game/...</code> をCIの門番にしている。
            「AIが設計を壊せない仕組みを作った」というのが一番のアピール。
          </p>
        </Disclosure>
      </Panel>

      <Panel title={<SectionHeading id="git">Git運用</SectionHeading>} accent={accent}>
        <p>
          <code>main</code> / <code>develop</code> / <code>feature/xxx</code>。
          AIは push・PR作成・feature間マージまで自由、develop/mainへのマージは人間のみ。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="params">調整パラメータの外部化</SectionHeading>} accent={accent}>
        <p>
          コード直書き禁止。<code>GameParameters</code> を Postgres に置き、config-front（Web UI）から編集、
          サーバーが起動時取得する。ハッカソンの「バランス調整のたびにビルド」問題への回答。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="sim">ヘッドレスシミュレータ（cmd/matchsim）</SectionHeading>} accent={accent}>
        <p>
          合成dtを流して試合を高速シミュレートする。room の実tickでも sim でも同じ試合コードが動く。
          <a href="/server" className="mx-1 underline" style={{ color: "var(--color-server)" }}>step関数を純粋に保った</a>成果。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          このサイト自体もAIで作った。仕様書駆動という開発思想を、サイト制作という別作業にも
          そのまま持ち込めることを、この文章自体が証明している。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
