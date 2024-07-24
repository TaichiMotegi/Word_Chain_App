import Link from "next/link";

export default function MainPage() {
  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-3xl mt-5">
        しりとりソロプレイ！ 制限時間内に何単語答えられるか挑戦しよう！
      </h1>
      <h2 className="text-3xl mt-10">ルール</h2>
      <div className="text-xl mt-5 bg-slate-200 px-8 py-2">
        <ol className="list-decimal">
          <li className="py-3">んで終わる単語を使用したらGAME OVER</li>
          <li className="py-3">一度使用した単語を使用したらGAME OVER</li>
          <li className="py-3">
            小文字で終わる場合はその文字から始まる単語を入力してください <br />
            例：きんぎょ → ヨーロッパ
          </li>
          <li className="py-3">
            伸ばし棒で終わる場合はその前の文字から始まる単語を入力してください{" "}
            <br />
            例：アカデミー → みそ
          </li>
        </ol>
      </div>
      <Link
        href="/game"
        className="font-semibold text-xl text-center border mt-32 w-2/5 px-4 py-5 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
      >
        <div>スタート</div>
      </Link>
    </div>
  );
}
