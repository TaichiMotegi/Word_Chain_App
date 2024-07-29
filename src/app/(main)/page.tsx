import Link from "next/link";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mt-10 font-semibold">ルール</h2>
      <div className="text-xl mt-5 px-8 py-2 border-4 border-gray-400 rounded-xl">
        <ol className="list-decimal font-semibold">
          <li className="py-3">5秒以内に答える</li>
          <li className="py-3">ひらがなと長音符のみで回答する</li>
          <li className="py-3">
            小文字で終わる場合はその文字から始まる単語を回答する
            <div>きんぎょ → よーろっぱ</div>
          </li>
          <li className="py-3">
            伸ばし棒で終わる場合はその前の文字から始まる単語を回答する
            <div>すきー → きなこ</div>
          </li>
          <li className="py-3">
            濁点・半濁点をなくすことはできません
            <div>ぎょーざ → ざるそば⭕️</div>
            <div>ぎょーざ → さる❌</div>
          </li>
          <li className="py-3">んで終わったらGame Over</li>
          <li className="py-3">一度使用した単語を使用したらGame Over</li>
        </ol>
      </div>
      <Link
        href="/game"
        className="font-semibold text-xl text-center border mt-12 w-2/5 px-4 py-5 rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500"
      >
        <div>Play Game</div>
      </Link>
    </div>
  );
}
