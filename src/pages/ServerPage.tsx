import { PageLayout, SectionHeading } from "../components/PageLayout";
import { Panel } from "../components/Panel";
import { Disclosure } from "../components/Disclosure";
import { DecisionLog, DiffTable, EffortNote, GitHubLink, TermTag } from "../components/Bits";
import { EraDivider, EraZoneHeader } from "../components/Era";
import { sections } from "../lib/accentTheme";
import { LayerDiagram } from "../components/LayerDiagram";

const accent = sections.server.accent;

const toc = [
  { id: "authority", label: "サーバー権威", group: "予選版 / QUALIFIER", groupColor: "var(--color-ink-faint)" },
  { id: "layers", label: "層アーキテクチャ" },
  { id: "room", label: "ロックフリー設計" },
  { id: "infra", label: "インフラの割り切り" },
  { id: "honsen", label: "作り直しの全体像", group: "本戦版 / FINAL" },
  { id: "score", label: "順位の決め方を作り直す" },
  { id: "cull", label: "決着を時刻で切る" },
  { id: "bandwidth", label: "通信量を1/10にする" },
  { id: "sim", label: "バランスを実測で決める" },
  { id: "bot", label: "Botに人らしさを持たせる" },
  { id: "odai", label: "お題のテンポを作り直す" },
  { id: "liveops", label: "当日ビルドしないための道具" },
];

export default function ServerPage() {
  return (
    <PageLayout
      section="server"
      title="サーバーサイド"
      lead="99人が同時に打鍵し続ける試合を、無料枠のVM1台で捌く。予選で見えた「面白くならない理由」を、本戦では作り直しで潰しました。"
      ownerLine="担当: りーせ"
      toc={toc}
    >
      <Panel tone="flat" accent={accent}>
        <p>
          サーバーの仕事は「99店の試合を1つの正しい状態として進めること」です。誰が何個作ったか、次に誰が脱落するか、どの客がどの店に並んでいるかを、すべてサーバーが決めます。
        </p>
        <p className="mt-3">
          予選で土台は作りました。ただ実際に遊んでもらうと、<strong>作りの問題ではなくルールの問題で面白くならない</strong>ことが分かりました。本戦はそこを作り直した記録です。
        </p>
      </Panel>

      {/* ───────────── 予選ゾーン ───────────── */}

      <EraZoneHeader
        era="qual"
        accent={accent}
        title="まず「壊れないもの」を作った"
        lead="99人が同時に触っても状態が壊れないこと、無料枠で動き切ること。予選ではここを固めました。本戦でも土台はそのまま使っています。"
      />

      <Panel era="qual" title={<SectionHeading id="authority">サーバー権威</SectionHeading>} accent={accent}>
        <p>
          クライアントは<strong>打鍵の正誤を判定して「1人ぶん打ち終わった」と報告するだけ</strong>です。順位も脱落もサーバーが決めます。クライアントの申告は信用しません。
        </p>
        <p className="mt-3">
          これは不正対策であると同時に、<strong>99人の画面が食い違わないための設計</strong>でもあります。「自分だけ順位が違う」が起きると、対戦ゲームとして成立しなくなります。
        </p>
        <Disclosure summary="申告を信用しないと、具体的に何を防げるのか" accent={accent}>
          <ul>
            <li>
              <strong>順番の飛ばし読み</strong>：行列の先頭以外の客を「打ち終わった」と報告されても弾きます。サーバーが行列の実体を持っているので、そもそも整合しません。
            </li>
            <li>
              <strong>あり得ない速さの申告</strong>：1語あたりの所要時間に下限を設けて、下回る報告は下限に丸めます。順位計算には使いませんが、あとで分析するときに数字が汚れるのを防ぎます。
            </li>
            <li>
              <strong>ミス数の水増し・過少申告</strong>：打鍵数はサーバーが配ったお題から分かるので、報告されたミス数がそれを超えていれば切り詰めます。
            </li>
          </ul>
        </Disclosure>
      </Panel>

      <Panel era="qual" title={<SectionHeading id="layers">層アーキテクチャ</SectionHeading>} accent={accent}>
        <p>「変わらないもの（コア）を、変わるもの（部品）から守る」ための分離です。</p>
        <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--color-border-soft)" }}>
          <LayerDiagram />
        </div>
        <ul className="mt-4">
          <li>
            <strong>コアから通信・時計・I/Oを追い出した</strong>：試合の中核は「経過時間を渡すと状態が進むだけ」の純粋な計算にしてあります。
          </li>
          <li>
            <strong>ルールで機械的に守る</strong>：コアが余計なものを取り込んでいないかを、CIが自動で弾きます。人の注意力に頼りません。
          </li>
        </ul>
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
        <p>
          無料枠のVM1台で動かしています。コンテナは使わず、1つの実行ファイルを直接常駐させる形です。
        </p>
        <Disclosure summary="コンテナを使わなかった理由" accent={accent}>
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
        headline="動くようにはなった。ただ、遊んだ人の反応が良くなかった"
        before="打ち方によって評価が上下し、早い人は開始10秒ほどで脱落していた"
        after="打った数がそのまま点になり、20秒間は誰でも遊べる"
        note="どちらも作りの不具合ではなく、ルールがそうなっていたことが原因でした。直すには順位の決め方と決着のつけ方を作り直す必要がありました。"
      />

      {/* ───────────── 本戦ゾーン ───────────── */}

      <EraZoneHeader
        era="final"
        accent={accent}
        title="「面白くならない理由」を潰しにいった"
        lead="本戦は機能を足すより、納得できない仕組みを外す作業が中心でした。そのぶん空いた時間を、体験を詰める側に回しています。"
      />

      <Panel
        era="final"
        title={<SectionHeading id="honsen">作り直しの全体像</SectionHeading>}
        accent={accent}
      >
        <DiffTable
          accent={accent}
          items={[
            { label: "順位の決め方", before: "打ち方を評価して相対順位に変換", after: "作った数から打ち間違いを引いた累積" },
            { label: "脱落のさせ方", before: "一定間隔で下位を切り続ける", after: "20秒ごとに「ここまで残す」を決めて切る" },
            { label: "客の扱い", before: "待たせすぎると帰る", after: "帰らない。出たお題は必ず打ち切れる" },
            { label: "全店の状況配信", before: "全員の詳細を短い間隔で配る", after: "順位表として必要な分だけ配る" },
            { label: "Bot", before: "全員が同じ強さ", after: "3階層＋1体ごとの個体差" },
            { label: "お題", before: "難しくなるほど1語が長くなる", after: "1語は短いまま、打つ語数が増える" },
          ]}
        />
        <p className="mt-5">
          共通しているのは<strong>「プレイヤーが説明できる形にする」</strong>ことです。なぜ自分が下なのか、なぜ落ちたのかが分からない仕組みを、順に外していきました。
        </p>
      </Panel>

      <Panel era="final" title={<SectionHeading id="score">順位の決め方を作り直す</SectionHeading>} accent={accent}>
        <p>
          予選でいちばん多かった声が<strong>「同じように打ったのに評価が違う」</strong>でした。当時は打鍵の速さや正確さをならして、他の店と比べた相対値で順位を出していたためです。うまく打てた実感と画面の数字が結びつきませんでした。
        </p>
        <p className="mt-3">
          本戦は<strong>作ったたこ焼きの数から、打ち間違いを引くだけ</strong>にしました。自分で数えられる形です。
        </p>
        <Disclosure summary="なぜ「相対評価」をやめたのか" accent={accent}>
          <DecisionLog
            accent={accent}
            items={[
              {
                adopted: "作った数 − 打ち間違い。誰でも計算できて、頑張った量がそのまま出る。",
                rejected: "打鍵の速さと正確さをならして相対順位に直す。数字は綺麗になるが、なぜその順位なのかを本人が説明できない。",
              },
              {
                adopted: "点がマイナスになることを許す。「ミスが多かった」という正直な情報として残す。",
                rejected: "0で止める。下位が全員0に並んでしまい、誰を落とすかがくじ引きになる。",
              },
            ]}
          />
          <p className="mt-4">
            相対評価をやめたことで副産物もありました。ならす処理や正規化が消えたぶん、<strong>試合をシミュレーションで再現しやすくなり</strong>、後述するバランス調整が回せるようになっています。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="cull">決着を時刻で切る</SectionHeading>} accent={accent}>
        <p>
          予選は一定間隔で下位から切り続ける方式でした。生存人数に応じて切られる人数が変わるので、<strong>運が悪いと開始10秒ほどで終わって</strong>しまいます。せっかく来てもらって10秒で待ち時間に戻るのは、体験としてよくありませんでした。
        </p>
        <p className="mt-3">
          本戦は<strong>「20秒ごとに、ここまで残す」を先に決めておく</strong>形にしました。最初の区切りが来るまでは誰も落ちないので、<strong>全員が同じだけ遊べる時間</strong>が保証されます。
        </p>
        <Disclosure summary="脱落した後の時間も設計対象にした" accent={accent}>
          <p>
            99人でやると、ほとんどの人は<strong>試合の大半を観戦者として過ごします</strong>。ここが退屈だと、全体の体験としては失敗です。
          </p>
          <p className="mt-3">
            脱落した後も順位表と「次の区切りまであと何秒か」「次に誰が落ちそうか」が届き続けるようにしました。実は当初は脱落した時点で秒読みが止まる作りで、順位だけが動いて秒数が固まった画面が残っていました。クライアント側から指摘をもらって直しています。
          </p>
          <p className="mt-3">
            最後の区切りでは、表示のうえでは<strong>1位以外が脱落する</strong>ように見せています。裏では全員を同じように処理していて、見せ方だけを変えている形です。決勝の緊張感を作るための演出と、内部の一貫性を両立させています。
          </p>
        </Disclosure>
      </Panel>

      <Panel tone="dark" title={<SectionHeading id="bandwidth">通信量を1/10にする</SectionHeading>} accent={accent}>
        <p>
          予選は<strong>全店の詳細を短い間隔で全員に配って</strong>いました。99人が会場のWi-Fiにぶら下がることを考えると現実的ではありません。
        </p>
        <p className="mt-3">
          本戦では<strong>値の性質ごとに配る間隔を分けました</strong>。順位表はゆっくりで足り、自分の点数だけは手応えに直結するので短い間隔で届けます。結果として通信量は1試合あたり10分の1ほどになりました。
        </p>
        <Disclosure summary="間隔を分けるときに踏んだ落とし穴" accent={accent}>
          <ul>
            <li>
              <strong>区切りの瞬間だけは間引かない</strong>：順位が大きく入れ替わった直後を落とすと、次の配信まで古い並びが残ります。脱落が発生した回はまとめて全部通しています。
            </li>
            <li>
              <strong>提供直後の返事は間引かない</strong>：クライアントは「報告したのに返事が来ない＝弾かれた」で不正申告を検知しています。ここを間引くと判別できなくなります。
            </li>
          </ul>
          <p className="mt-4">
            どちらも「一律に間引く」だと壊れる場所です。<strong>間引いていいものと、絶対に落としてはいけないものを分けて考える</strong>必要がありました。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="sim">バランスを実測で決める</SectionHeading>} accent={accent}>
        <p>
          点の付け方を単純にすると、今度は<strong>「打ち間違いをどれくらい重くするか」で遊び方が変わります</strong>。軽ければ雑に速く打つゲームになり、重ければ止まって確実に打つゲームになります。ここを勘で決めたくありませんでした。
        </p>
        <p className="mt-3">
          コアから通信を追い出してあるので、<strong>99人の試合を通信なしで丸ごと再生できます</strong>。速い人と正確な人の両方を用意して何十試合も回し、<strong>どちらのやり方でも同じくらいの順位に落ち着く重み</strong>を探しました。
        </p>
        <Disclosure summary="この方法でいちばん学んだこと" accent={accent}>
          <p>
            <strong>釣り合う点は、ゲーム側を変えるたびに動きます。</strong>お題を短くしたとき、難易度の上がり方を変えたとき、注文の量を変えたとき——そのたびに最適な重みがずれました。
          </p>
          <p className="mt-3">
            一度は<strong>測り直しを忘れたまま先に進んでしまい</strong>、後から「正確に打つ人が有利すぎる状態」で動いていたことに気づいています。以降は「お題や難易度に触ったら必ず測り直す」を手順として残しました。
          </p>
          <p className="mt-3">
            測る指標も途中で見直しました。最初は点の散らばり具合を見ていたのですが、これは<strong>点の絶対値が変わるだけで動いてしまう</strong>ので判断を誤ります。「強い人がちゃんと上位に来ているか」を見るようにしてから、判断が安定しました。
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
          <ul>
            <li>
              <strong>個性と揺らぎを分けた</strong>：以前は「毎回ぶれる」だけで個体差がなく、全員が平均に回帰していました。生まれたときに決まる個性と、打つたびの揺らぎを別々に持たせています。
            </li>
            <li>
              <strong>速さと正確さを連動させた</strong>：別々に決めると「超速いのにミスだらけ」「遅いのに完璧」という<strong>実際にはいない人</strong>が生まれます。上手い人ほど速くて正確、という関係を持たせました。
            </li>
            <li>
              <strong>難しくなると崩れるようにした</strong>：以前は難易度が上がっても同じ調子で打ち続けるので、終盤ほどBotが人間より有利でした。上手いBotほど崩れにくい、という差もつけています。
            </li>
          </ul>
          <p className="mt-4">
            調整の目安は<strong>「標準的な速さの人が、ちょうど真ん中あたりに来るか」</strong>に置きました。途中で「打つのが遅い人が必ず最下位になる」状態になっていることに気づき、Botの幅が人の幅より狭かったのが原因だったので、いちばん弱い層を広げて直しています。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="odai">お題のテンポを作り直す</SectionHeading>} accent={accent}>
        <p>
          難しくなるほど1語が長くなる作りでした。終盤の語は打ち切るまでにかなりの時間がかかり、<strong>決勝がまるごと1語で終わりかねない</strong>状態でした。打ち切るまで点が入らないので、終盤ほど手応えがなくなります。
        </p>
        <p className="mt-3">
          本戦は<strong>1語を短いまま保って、代わりに打つ語数を増やす</strong>形に変えました。区切りが増えるので、ミスしても次で取り返せます。
        </p>
        <Disclosure summary="辞書を書き直す過程で見つかったこと" accent={accent}>
          <p>
            長い語をよく見ると、<strong>同じ書き出しの文をつなげて作られていました</strong>。難易度が上がるほど同じフレーズを繰り返し打たされることになり、単調さの原因になっていました。関西弁の短文に書き直しています。
          </p>
          <p className="mt-3">
            差し替えのときに危なかったのが、<strong>新しい語を入れても古い語が消えない</strong>仕組みになっていたことです。放っておくと新旧が混ざって出題されるので、外した語を明示的に消す処理を足しました。外した語はコードに残してあり、<strong>当日「やっぱり戻したい」となっても戻せる</strong>ようにしてあります。
          </p>
        </Disclosure>
      </Panel>

      <Panel era="final" title={<SectionHeading id="liveops">当日ビルドしないための道具</SectionHeading>} accent={accent}>
        <p>
          本番で入れ替えると<strong>進行中の試合が消えます</strong>。なので当日は「触らずに直せる」ことが最優先でした。
        </p>
        <ul className="mt-3">
          <li>
            <strong>設定は管理画面から</strong>：難易度の上がり方、点の重み、Botの強さ、注文の量まで、ゲームの数字はすべて外に出してあります。保存すれば次の試合から反映されます。
          </li>
          <li>
            <strong>状況を見るための画面</strong>：99店の状況、脱落しそうな店、難易度が狙いどおり上がっているかを1画面で見られるようにしました。<strong>見えないものは調整できない</strong>ので、調整のたびに手を入れています。
          </li>
        </ul>
        <Disclosure summary="運用まわりでいちばん怖かった事故" accent={accent}>
          <p>
            <strong>設定が本番に届いていないのに、届いたつもりで進めていたこと</strong>が何度かありました。
          </p>
          <p className="mt-3">
            管理画面とサーバーは別々に作っているので、<strong>片方だけ直すとズレます</strong>。実際、サーバー側の初期値だけ更新して管理画面を直し忘れ、意図しない値が本番に保存されていたことがありました。誰も気づかないまま数日動いていました。
          </p>
          <p className="mt-3">
            対処として、<strong>画面が「サーバーが返しているのに自分が知らない項目」と「自分が持っているのにサーバーが返さない項目」の両方を検知して警告する</strong>ようにしました。後者は「触っても効かないツマミ」で、当日いじって時間を溶かすいちばん危ないやつです。あわせて、初期値がズレたら自動テストが落ちるようにしています。
          </p>
        </Disclosure>
      </Panel>

      <EffortNote accent={accent}>
        <p>
          本戦のサーバーは、<strong>足すより外す作業</strong>が中心でした。順位の決め方も、脱落のさせ方も、予選のほうが凝っています。それでも面白くならなかったのは、凝っていることとプレイヤーが納得できることが別だったからでした。
        </p>
        <p className="mt-3">
          外して単純にしたぶん、<strong>「本当にこの数字でいいのか」を測れる</strong>ようになりました。勘で決めていた部分を実測に置き換えられたのが、今回いちばん進んだところだと思っています。
        </p>
      </EffortNote>
    </PageLayout>
  );
}
