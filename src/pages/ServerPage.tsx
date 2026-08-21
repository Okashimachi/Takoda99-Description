import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, DiffTable, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { EraDivider, EraZoneHeader } from "../components/Era";
import { sections } from "../lib/accentTheme";
import { LayerDiagram } from "../components/LayerDiagram";
import { BandwidthDiagram, SpectatorDiagram } from "../components/ServerDiagrams";

const accent = sections.server.accent;

/**
 * 「見出し + 説明」の箇条書き。
 *
 * 素の <ul><li><strong>ラベル</strong>：本文…</li></ul> だと、
 * ラベルの太字と本文中の太字が同じ見た目になり、行間も詰まっているため
 * どこが要点か分からなくなる。ラベルを独立した行に出し、本文からは
 * 強調を外して、強弱を1段だけにしている。
 *
 * このページでしか使わないのでローカルに置く（共有部品は触らない）。
 */
function PointList({ items }: { items: { label: string; body: string }[] }) {
  return (
    // 余白はインラインで指定する。共有CSSの .prose-body li に margin-bottom が
    // 入っており、Tailwind の space-y-* がそれに負けて 5.6px まで詰まるため。
    // 共有CSS側は他ページも使うので触らない。
    // list-style と padding もインラインで打ち消す。共有CSSの .prose-body ul が
    // disc と padding-left を持っており、Tailwind の list-none / pl-0 では消えず、
    // 中黒と左の罫線が二重に出てしまう。
    <ul className="mt-4" style={{ listStyle: "none", paddingLeft: 0 }}>
      {items.map((it, i) => (
        <li
          key={it.label}
          className="pl-4"
          style={{
            borderLeft: `2px solid ${accent}`,
            marginBottom: i === items.length - 1 ? 0 : "1.5rem",
          }}
        >
          <div className="text-[0.95rem] font-bold leading-snug" style={{ color: "var(--color-ink)" }}>
            {it.label}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--color-ink-dim)" }}>
            {it.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

const toc = [
  { id: "authority", label: "サーバー権威", group: "予選版 / QUALIFIER", groupColor: "var(--color-ink-faint)" },
  { id: "layers", label: "層アーキテクチャ" },
  { id: "room", label: "ロックフリー設計" },
  { id: "infra", label: "インフラの割り切り" },
  { id: "honsen", label: "企画の決定が要求したもの", group: "本戦版 / FINAL" },
  { id: "sim", label: "バランスを測れるようにする" },
  { id: "spectator", label: "脱落したあとの時間" },
  { id: "bandwidth", label: "通信量を1/10にする" },
  { id: "bot", label: "Botに人らしさを持たせる" },
  { id: "odai", label: "お題のテンポを作り直す" },
  { id: "liveops", label: "当日ビルドしないための道具" },
];

export default function ServerPage() {
  return (
    <PageLayout
      section="server"
      title="サーバーサイド"
      lead="99人が同時に打鍵し続ける試合を、無料枠のVM1台で捌く。本戦で決まった新しいルールを、実際に成立させるまでの記録です。"
      ownerLine="担当: りーせ"
      toc={toc}
    >
      <Panel tone="flat" accent={accent}>
        <p>
          サーバーの仕事は「99店の試合を1つの正しい状態として進めること」です。誰が何個作ったか、次に誰が脱落するか、どの客がどの店に並んでいるかを、すべてサーバーが決めます。
        </p>
        <p className="mt-3">
          予選で土台は作りました。本戦では<strong>ゲームのルール自体が作り直され</strong>、それを成立させるためにサーバー側でも作り直しが必要になりました。ここはその過程の記録です。
        </p>
      </Panel>

      {/* ───────────── 予選ゾーン ───────────── */}

      <EraZoneHeader
        era="qual"
        accent={accent}
        title="まず「壊れないもの」を作った"
        lead="99人が同時に触っても状態が壊れないこと、無料枠で動き切ること。予選ではここを固めました。土台は本戦でもそのまま使っています。"
      />

      <Panel era="qual" title={<SectionHeading id="authority">サーバー権威</SectionHeading>} accent={accent}>
        <p>
          クライアントは<strong>打鍵の正誤を判定して「1人ぶん打ち終わった」と報告するだけ</strong>です。順位も脱落もサーバーが決めます。クライアントの申告は信用しません。
        </p>
        <p className="mt-3">
          不正対策であると同時に、<strong>99人の画面が食い違わないための設計</strong>でもあります。「自分だけ順位が違う」が起きると、対戦ゲームとして成立しません。
        </p>
        <Disclosure summary="申告を信用しないと、具体的に何を防げるのか" accent={accent}>
          <PointList
            items={[
              {
                label: "順番の飛ばし読み",
                body: "行列の先頭以外の客を「打ち終わった」と報告されても弾きます。サーバーが行列の実体を持っているので、そもそも整合しません。",
              },
              {
                label: "あり得ない速さの申告",
                body: "1語あたりの所要時間に下限を設け、下回る報告は下限に丸めます。順位計算には使いませんが、あとで分析するときに数字が汚れるのを防ぎます。",
              },
              {
                label: "ミス数の水増し・過少申告",
                body: "打鍵数はサーバーが配ったお題から分かるので、報告がそれを超えていれば切り詰めます。",
              },
            ]}
          />
        </Disclosure>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="layers">層アーキテクチャ</SectionHeading>} accent={accent}>
        <p>「変わらないもの（コア）を、変わるもの（部品）から守る」ための分離です。</p>
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
          <LayerDiagram />
        </div>
        <PointList
          items={[
            {
              label: "コアから通信・時計・I/Oを追い出した",
              body: "試合の中核は「経過時間を渡すと状態が進むだけ」の純粋な計算にしてあります。",
            },
            {
              label: "ルールで機械的に守る",
              body: "コアが余計なものを取り込んでいないかをCIが自動で弾きます。人の注意力に頼りません。",
            },
          ]}
        />
        <p className="mt-4">
          地味な分離ですが、<strong>本戦でいちばん効いたのはここ</strong>でした。通信を介さずに試合をまるごと回せるので、あとで触れるシミュレータが成立します。
        </p>
        <GitHubLink href="https://github.com/Okashimachi/Takoda99-Server">Takoda99-Server</GitHubLink>
      </Panel>

      <Panel era="qual" tone="flat" title={<SectionHeading id="room">ロックフリー設計</SectionHeading>} accent={accent}>
        <p>
          99人からの報告を<TermTag>排他制御</TermTag>で守るのではなく、1試合ぶんの処理を1本の流れに集めて順番に捌いています。状態を書き換える場所が1箇所しかないので、<strong>競合が起きようがない</strong>形です。
        </p>
      </Panel>

      <Panel era="qual" tone="flat" title={<SectionHeading id="infra">インフラの割り切り</SectionHeading>} accent={accent}>
        <p>無料枠のVM1台で動かしています。コンテナは使わず、1つの実行ファイルを直接常駐させる形です。</p>
        <Disclosure summary="コンテナも自動デプロイも使わなかった理由" accent={accent}>
          <DecisionLog
            accent={accent}
            items={[
              {
                adopted: "手元でビルドした実行ファイルを転送して差し替える。メモリを食わず、試合の合間に数十秒で入れ替えられる。",
                rejected: "コンテナで運用する。常駐するだけでメモリを持っていかれるうえ、非力なVMではビルドに数分かかる。",
              },
              {
                adopted: "自動デプロイは組まない。入れ替えは進行中の試合を消すので、人が「今は試合中でない」と確認してから打つ。",
                rejected: "コミットしたら自動で反映。展示中に勝手に試合が消える事故が起きうる。",
              },
            ]}
          />
        </Disclosure>
      </Panel>

      {/* ───────────── 断絶 ───────────── */}

      <EraDivider
        accent={accent}
        headline="ゲームのルールが作り直された。サーバーはそれを成立させる側に回った"
        before="打ち方を評価して相対順位に変換／一定間隔で下位を切り続ける"
        after="打った数がそのまま点になる／20秒ごとに「ここまで残す」を決めて切る"
        note="なぜこのルールにしたかは企画のページにあります。ここでは、その決定がサーバーに何を要求したかを書きます。"
      />

      {/* ───────────── 本戦ゾーン ───────────── */}

      <EraZoneHeader
        era="final"
        accent={accent}
        title="決まったルールを、実際に成立させる"
        lead="ルールを単純にすると、今度は「その数字が本当に妥当か」を確かめる必要が出てきます。本戦のサーバー作業は、その確かめ方を用意することが中心でした。"
      />

      <Panel era="final" title={<SectionHeading id="honsen">企画の決定が要求したもの</SectionHeading>} accent={accent}>
        <p>
          ルールの変更は<strong>企画側の判断</strong>です。ただ、決めただけでは動きません。それぞれがサーバーに宿題を出してきました。
        </p>
        <div className="mt-5">
          <DiffTable
            accent={accent}
            headings={["企画が決めたこと", "サーバーがやることになったこと"]}
            items={[
              {
                label: "スコア1本にする",
                before: "打った数から打ち間違いを引くだけ",
                after: "重みの比率が遊び方を決めてしまうので、実測で詰める仕組みが要る",
              },
              {
                label: "20秒ごとに切る",
                before: "全員が最低20秒は遊べる",
                after: "脱落した人が観戦者として長く残る。その時間ぶんの配信を作り直す",
              },
              {
                label: "客が帰らなくなる",
                before: "出たお題は必ず打ち切れる",
                after: "1客が重いと打ち切れないまま終わる。お題の長さを見直す",
              },
              {
                label: "99人を必ず埋める",
                before: "人数が集まらなくても成立させる",
                after: "Botの出来がそのまま体験になる。人らしさを作り込む",
              },
            ]}
          />
        </div>
        <p className="mt-5">
          共通しているのは<strong>「決めた数字が妥当かどうか、勘で判断しない」</strong>ことでした。以下はその手段を用意していった話です。
        </p>
      </Panel>

      <Panel era="final" title={<SectionHeading id="sim">バランスを測れるようにする</SectionHeading>} accent={accent}>
        <p>
          点の付け方が単純になると、今度は<strong>「打ち間違いをどれくらい重くするか」で遊び方が変わります</strong>。軽ければ雑に速く打つゲームになり、重ければ止まって確実に打つゲームになります。
        </p>
        <p className="mt-3">
          ここで効いたのが<strong>コアから通信を追い出してあったこと</strong>でした。通信もクライアントも介さずに、<strong>99人の試合を丸ごと再生できます</strong>。速い人と正確な人の両方を用意して何十試合も回し、どちらのやり方でも同じくらいの順位に落ち着く重みを探しました。
        </p>
        <Disclosure summary="この方法でいちばん学んだこと" accent={accent}>
          <PointList
            items={[
              {
                label: "釣り合う点は、ゲーム側を変えるたびに動く",
                body: "お題を短くしたとき、難易度の上がり方を変えたとき、注文の量を変えたとき。そのたびに最適な重みがずれました。",
              },
              {
                label: "一度、測り直しを忘れて先に進んでしまった",
                body: "あとから「正確に打つ人が有利すぎる状態」で動いていたことに気づきました。以降は「お題や難易度に触ったら必ず測り直す」を手順として残しています。",
              },
              {
                label: "見る指標も途中で変えた",
                body: "最初は点の散らばり具合を見ていましたが、これは点の絶対値が変わるだけで動くので判断を誤ります。「強い人がちゃんと上位に来ているか」を見るようにしてから安定しました。",
              },
            ]}
          />
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="spectator">脱落したあとの時間</SectionHeading>} accent={accent}>
        <p>
          20秒ごとに切る形にしたことで、<strong>ほとんどの人は試合の大半を観戦者として過ごす</strong>ことになりました。ここが退屈だと、全体の体験としては失敗です。
        </p>
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
          <SpectatorDiagram />
        </div>
        <p className="mt-4">
          脱落しても、順位表・次の区切りまでの秒読み・次に落ちそうな店が届き続けるようにしました。<strong>次に誰が切られるかは観戦の見どころそのもの</strong>だからです。
        </p>
        <Disclosure summary="当初は脱落した瞬間に情報が止まっていた" accent={accent}>
          <PointList
            items={[
              {
                label: "何が起きていたか",
                body: "秒読みはまだ生きている店にだけ配っていました。脱落した瞬間から届かなくなるので、秒数が最後の値で固まったまま順位表だけが動き続ける画面になります。",
              },
              {
                label: "どう気づいたか",
                body: "クライアント側から「順位は動いているのに秒読みが止まっている」と指摘をもらいました。サーバー側だけ見ていると、送っていないことには気づけません。",
              },
              {
                label: "どう直したか",
                body: "通信の形は変えず、配る相手を広げるだけにしました。クライアント側は受け取る用意がすでにあったので、あちらの修正は不要です。増える通信量も事前に見積もってから入れました。",
              },
            ]}
          />
          <p className="mt-5 text-sm" style={{ color: "var(--color-ink-dim)" }}>
            なお最後の区切りでは、表示のうえでは1位以外が脱落するように見せています。裏では全員を同じように処理していて、見せ方だけを変えている形です。
          </p>
        </Disclosure>
      </Panel>

      {/* 暗い面（tone="dark"）は使わない。共有部品の Disclosure が明るい地を前提にしており、
          暗い面の中に置くと本文が読めなくなる（共有側を直すのは別の担当範囲）。 */}
      <Panel era="final" title={<SectionHeading id="bandwidth">通信量を1/10にする</SectionHeading>} accent={accent}>
        <p>
          予選は<strong>全店の詳細を短い間隔で全員に配って</strong>いました。1試合で675MBに達していて、99人が会場のWi-Fiにぶら下がることを考えると現実的ではありません。
        </p>
        <div className="mt-5 rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
          <BandwidthDiagram />
        </div>
        <p className="mt-4">
          本戦では<strong>値の性質ごとに配る間隔を分けました</strong>。順位表はゆっくりで足り、自分の点数だけは手応えに直結するので短い間隔で届けます。結果として<strong>71MB</strong>まで下がりました。
        </p>
        <Disclosure summary="間隔を分けるときに踏んだ落とし穴" accent={accent}>
          <PointList
            items={[
              {
                label: "区切りの瞬間だけは間引かない",
                body: "順位が大きく入れ替わった直後を落とすと、次の配信まで古い並びが残ります。脱落が発生した回はまとめて全部通しています。",
              },
              {
                label: "提供直後の返事は間引かない",
                body: "クライアントは「報告したのに返事が来ない＝弾かれた」で不正申告を検知しています。ここを間引くと判別できなくなります。",
              },
            ]}
          />
          <p className="mt-4">
            どちらも「一律に間引く」だと壊れる場所です。<strong>間引いていいものと、絶対に落としてはいけないものを分けて考える</strong>必要がありました。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="bot">Botに人らしさを持たせる</SectionHeading>} accent={accent}>
        <p>
          99人ぶんの席は、集まった人数に関わらず埋めます。足りない席はBotが入るので、<strong>Botの出来がそのまま体験を左右します</strong>。
        </p>
        <p className="mt-3">
          予選のBotは全員が同じ強さでした。全員が同じ平均に寄るので順位表が毎回シャッフルされ、<strong>人間だけが外れ値</strong>になります。本戦では強さを3階層に分け、さらに<strong>1体ごとの個性を固定</strong>しました。「あの店ずっと速いな」が成立します。
        </p>
        <Disclosure summary="人らしく見せるために効いた3つのこと" accent={accent}>
          <PointList
            items={[
              {
                label: "個性と揺らぎを分けた",
                body: "以前は「毎回ぶれる」だけで個体差がなく、全員が平均に回帰していました。生まれたときに決まる個性と、打つたびの揺らぎを別々に持たせています。",
              },
              {
                label: "速さと正確さを連動させた",
                body: "別々に決めると「超速いのにミスだらけ」「遅いのに完璧」という、実際にはいない人が生まれます。上手い人ほど速くて正確、という関係を持たせました。",
              },
              {
                label: "難しくなると崩れるようにした",
                body: "以前は難易度が上がっても同じ調子で打ち続けるので、終盤ほどBotが人間より有利でした。上手いBotほど崩れにくい、という差もつけています。",
              },
            ]}
          />
          <p className="mt-4">
            調整の目安は<strong>「標準的な速さの人が、ちょうど真ん中あたりに来るか」</strong>に置きました。途中で「打つのが遅い人が必ず最下位になる」状態になっていることに気づき、Botの幅が人の幅より狭かったのが原因だったので、いちばん弱い層を広げて直しています。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="odai">お題のテンポを作り直す</SectionHeading>} accent={accent}>
        <p>
          難しくなるほど1語が長くなる作りでした。客が帰らなくなったぶん<strong>「打ち切れないまま試合が終わる」</strong>が起きやすく、打ち切るまで点が入らないので終盤ほど手応えがなくなります。
        </p>
        <p className="mt-3">
          本戦は<strong>1語を短いまま保って、代わりに打つ語数を増やす</strong>形に変えました。区切りが増えるので、ミスしても次で取り返せます。
        </p>
        <Disclosure summary="辞書を書き直す過程で見つかったこと" accent={accent}>
          <PointList
            items={[
              {
                label: "同じ書き出しの使い回しだった",
                body: "長い語をよく見ると、同じ書き出しの文をつなげて作られていました。難易度が上がるほど同じフレーズを繰り返し打たされることになり、単調さの原因になっていました。関西弁の短文に書き直しています。",
              },
              {
                label: "古い語が消えない仕組みだった",
                body: "新しい語を入れても古い語が残るので、放っておくと新旧が混ざって出題されます。外した語を明示的に消す処理を足しました。",
              },
              {
                label: "戻せるようにしてある",
                body: "外した語はコードに残してあり、当日「やっぱり戻したい」となっても戻せます。",
              },
            ]}
          />
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="liveops">当日ビルドしないための道具</SectionHeading>} accent={accent}>
        <p>
          本番で入れ替えると<strong>進行中の試合が消えます</strong>。当日は「触らずに直せる」ことが最優先でした。
        </p>
        <PointList
          items={[
            {
              label: "設定は管理画面から",
              body: "難易度の上がり方、点の重み、Botの強さ、注文の量まで、ゲームの数字はすべて外に出してあります。保存すれば次の試合から反映されます。",
            },
            {
              label: "状況を見るための画面",
              body: "99店の状況、脱落しそうな店、難易度が狙いどおり上がっているかを1画面で見られるようにしました。見えないものは調整できないので、調整のたびに手を入れています。",
            },
          ]}
        />
        <Disclosure summary="運用まわりでいちばん怖かった事故" accent={accent}>
          <p className="mb-4">
            設定が本番に届いていないのに、届いたつもりで進めていたことが何度かありました。
          </p>
          <PointList
            items={[
              {
                label: "なぜ起きたか",
                body: "管理画面とサーバーは別々に作っているので、片方だけ直すとズレます。サーバー側の初期値だけ更新して管理画面を直し忘れ、意図しない値が本番に保存されていました。誰も気づかないまま数日動いています。",
              },
              {
                label: "どう防ぐようにしたか",
                body: "画面が「サーバーが返しているのに自分が知らない項目」と「自分が持っているのにサーバーが返さない項目」の両方を検知して警告するようにしました。あわせて、初期値がズレたら自動テストが落ちるようにしています。",
              },
              {
                label: "後者がいちばん危ない",
                body: "「触っても効かないツマミ」なので、当日いじって時間を溶かします。効かないことに気づくまでが長い分、前者より厄介です。",
              },
            ]}
          />
        </Disclosure>
      </Panel>

      <EffortNote accent={accent}>
        <p className="text-[0.95rem] font-bold leading-relaxed" style={{ color: "var(--color-ink)" }}>
          本戦のサーバーは、足すより外す作業が中心でした。
        </p>
        <PointList
          items={[
            {
              label: "凝っていたのは、むしろ予選のほうだった",
              body: "順位の決め方も脱落のさせ方も、予選版のほうが複雑です。それでも面白くならなかったのは、凝っていることとプレイヤーが納得できることが別だったからでした。",
            },
            {
              label: "外したぶん、測れるようになった",
              body: "単純にしたことで「本当にこの数字でいいのか」を試せるようになりました。勘で決めていた部分を実測に置き換えられたのが、今回いちばん進んだところだと思っています。",
            },
          ]}
        />
      </EffortNote>
    </PageLayout>
  );
}
