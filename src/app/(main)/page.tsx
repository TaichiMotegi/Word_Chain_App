import Link from "next/link";

export default function MainPage() {
  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-3xl mt-20">
        しりとりソロプレイ！ 1回答5秒以内で何単語答えられるか挑戦しよう！
      </h1>
      <h2 className="text-3xl mt-10">ルール</h2>
      <div className="text-xl mt-5 bg-slate-200 px-8 py-2">
        <ol className="list-decimal">
          <li className="py-3">5秒以内に答える</li>
          <li className="py-3">ひらがなのみで入力する</li>
          <li className="py-3">
            小文字で終わる場合はその文字から始まる単語を入力する
            <br />
            例：きんぎょ → よーろっぱ
          </li>
          <li className="py-3">
            伸ばし棒で終わる場合はその前の文字から始まる単語を入力する
            <br />
            例：すきー → きなこ
          </li>
          <li className="py-3">んで終わったらGame Over</li>
          <li className="py-3">一度使用した単語を使用したらGame Over</li>
        </ol>
      </div>
      <Link
        href="/game"
        className="font-semibold text-xl text-center border mt-24 w-1/4 px-4 py-5 rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500"
      >
        <div>Play Game</div>
      </Link>
    </div>
  );
}
