import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { EffortNote } from "../components/Bits";
import { sections } from "../lib/accentTheme";
import { images } from "../assets/images";

const accent = sections.art.accent;

const toc = [
  { id: "characters", label: "キャラクター" },
  { id: "mapping", label: "客属性とメカニクスの対応" },
  { id: "stand", label: "屋台の画面要素" },
  { id: "damage", label: "劣化表現" },
  { id: "sub", label: "他店ミニ盤面" },
  { id: "bg", label: "背景モチーフ" },
  { id: "sound", label: "サウンド" },
  { id: "flow", label: "制作フロー" },
];

const chars = [
  ["customer-normal", "通常客", images.characters.normal],
  ["customer-claimer", "クレーマー", images.characters.claimer],
  ["customer-buzz", "JK", images.characters.buzz],
  ["customer-comedian", "お笑い芸人", images.characters.comedian],
];

const mapping = [
  ["通常客", "Normal", "標準的な注文と我慢ゲージ"],
  ["ヒョウ柄おばちゃん", "Bonus", "捌くと評価に加点"],
  ["クレーマー", "Claimer", "ミスに非対称に厳しい（減点＞加点）"],
  ["JK", "Buzz", "捌くとバズ加点（減衰・上限あり）"],
];

export default function ArtPage() {
  return (
    <PageLayout
      section="art"
      title="アート"
      lead="大阪をどう画面に落とすか。唯一ビジュアルで殴れるページです。"
      ownerLine="担当: たまちゃ"
      toc={toc}
    >
      <Panel title={<SectionHeading id="characters">コンセプトアート・キャラクター</SectionHeading>} accent={accent}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {chars.map(([key, label, src]) => (
            <div key={key} className="text-center">
              <div
                className="aspect-square overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
              >
                <img src={src} alt={label} className="h-full w-full object-contain" onError={(e) => (e.currentTarget.style.opacity = "0.15")} />
              </div>
              <div className="mt-2 text-xs" style={{ color: "var(--color-ink-dim)" }}>{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm" style={{ color: "var(--color-ink-faint)" }}>
          通天閣のおっちゃんも登場予定（画像は後日追加）。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="mapping">客属性とメカニクスの対応表</SectionHeading>} accent={accent}>
        <p className="mb-4">見た目でリスク/リターンが分かる ＝ UIとしても機能するデザイン。</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-border-soft)" }}>
                <th className="p-2 text-left" style={{ color: "var(--color-ink)" }}>見た目</th>
                <th className="p-2 text-left" style={{ color: "var(--color-ink)" }}>コード名</th>
                <th className="p-2 text-left" style={{ color: "var(--color-ink)" }}>メカニクス</th>
              </tr>
            </thead>
            <tbody>
              {mapping.map((row) => (
                <tr key={row[1]} className="border-b" style={{ borderColor: "var(--color-border-soft)" }}>
                  {row.map((c, i) => (
                    <td key={i} className="p-2" style={{ color: i === 0 ? "var(--color-ink)" : "var(--color-ink-dim)" }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--color-ink-faint)" }}>
          「デザインが仕様と接続されている」— 企画/仕様ページの客属性メカニクスと対応。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="stand">屋台の画面要素</SectionHeading>} accent={accent}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["暖簾", images.art.stand],
            ["鉄板", images.art.stand],
            ["たこ焼き（24穴・注文進捗 x/N）", images.art.takoyaki],
            ["提灯（信用ライフの表現）", images.art.lantern],
          ].map(([label, src]) => (
            <div key={label} className="text-center">
              <div
                className="aspect-square overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
              >
                <img src={src} alt={label} className="h-full w-full object-contain" onError={(e) => (e.currentTarget.style.opacity = "0.15")} />
              </div>
              <div className="mt-2 text-xs" style={{ color: "var(--color-ink-dim)" }}>{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm">
          実装のView名と対応しているのが面白い点。提灯の比喩はそのまま <code>CreditLifeLanternState</code> という型名になっている。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="damage">ミスによる劣化表現</SectionHeading>} accent={accent}>
        <div className="grid grid-cols-2 gap-4 md:w-1/2">
          {[
            ["正常", images.art.takoyaki],
            ["劣化（ミス蓄積）", images.art.takoyakiBurnt],
          ].map(([label, src]) => (
            <div key={label} className="text-center">
              <div
                className="aspect-square overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--color-border-soft)", background: "var(--color-base-panel)" }}
              >
                <img src={src} alt={label} className="h-full w-full object-contain" onError={(e) => (e.currentTarget.style.opacity = "0.15")} />
              </div>
              <div className="mt-2 text-xs" style={{ color: "var(--color-ink-dim)" }}>{label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm">見た目の劣化そのものが評価の可視化になっている。</p>
      </Panel>

      <Panel title={<SectionHeading id="sub">他店98店のミニ盤面（テト99式）</SectionHeading>} accent={accent}>
        <p>
          テトリス99を参照したミニ盤面のビジュアル設計。情報密度を絞り、
          98店のタイルを一目でスキャンできるよう整理している。
        </p>
      </Panel>

      <Panel title={<SectionHeading id="bg">背景モチーフ</SectionHeading>} accent={accent}>
        <p>通天閣・道頓堀モチーフの背景。フェーズ移行に合わせて画面変化を入れる。</p>
      </Panel>

      <Panel title={<SectionHeading id="sound">サウンド</SectionHeading>} accent={accent}>
        <ul>
          <li>打鍵音（連打に耐える短い音）</li>
          <li>ミス音</li>
          <li>提供音（通常・高評価の2種）</li>
          <li>BGMのフェーズ遷移</li>
        </ul>
      </Panel>

      <Panel title={<SectionHeading id="flow">制作フロー</SectionHeading>} accent={accent}>
        <p>
          仮素材（色付き矩形＋テキスト）で先に動かし、後から差し替える運用。
          <code>ViewSampleDriver</code> でサンプルデータ駆動の画面を作れるようにしてある。
        </p>
        <p className="mt-3 font-bold" style={{ color: accent }}>
          「アートを待たずに開発が止まらない体制」＝開発手法の話でもある。
        </p>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          ラフ画から実装まで、仮素材運用のおかげでアート未着手のまま画面遷移や当たり判定の検証ができた。
          客属性の見た目を先にメカニクスへ対応づけたことで、プレイヤーは説明文を読まずとも
          リスク/リターンを直感的に判断できる。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
