"use client";
import { useEffect, useRef, useState } from "react";
import { normalizedString } from "@/utils/normalizedString";
import { Timer } from "@/components/Timer";
import { alertGameOver } from "@/utils/alertGameOver";
import { Warning } from "@/components/Warning";
import { generateWord } from "@/utils/generateWord";

export default function GamePage() {
  // 入力された単語を制御するためのstate
  const [word, setWord] = useState("");
  // 回答された単語を制御するためのstate
  const [answer, setAnswer] = useState<string[]>([generateWord()]);
  // inputタグのdisabled属性を制御するためのstate
  const [disabled, setDisabled] = useState(false);
  // 警告文を表示するためのstate
  const [invisible, setInvisible] = useState(true);
  // 警告文を指定するためのstate
  const [worning, setWorning] = useState("worning");
  // 警告文の色を指定するためのstate
  const [infoColor, setInfoColor] = useState(true);
  // タイマーの時間を制御するためのstate
  const [time, setTime] = useState(5);
  // タイマーを停止するためのstate
  const [isPaused, setIsPaused] = useState(false);
  // 回答が送信されたかどうかを判定するためのstate
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 入力された単語を処理する関数
  const handleSubmit = async () => {
    setDisabled(true);
    setIsPaused(true);
    // ひらがなと長音符以外が含まれているかどうかを判定
    const containsNonHiragana = /[^ぁ-んー]/.test(word);
    // 入力された単語の最初の文字を取得
    const first = word.slice(0, 1);
    // 回答された単語の最後の文字を取得
    const end = answer[0].replace(/ー|-/g, "").slice(-1);
    // ひらがな以外が含まれている場合の処理
    if (containsNonHiragana) {
      setInvisible(false);
      setWord("");
      setInfoColor(true);
      setWorning("ひらがなのみで入力してください");
      setDisabled(false);
      setIsSubmitted(true);
      setIsPaused(false);
      return;
      // 入力された単語が回答された単語の最後の文字で始まっていない場合の処理
    } else if (normalizedString(first) !== normalizedString(end)) {
      setInvisible(false);
      setWord("");
      setInfoColor(true);
      setWorning("相手の語尾で始まる単語を入力してください");
      setDisabled(false);
      setIsSubmitted(true);
      setIsPaused(false);
      return;
      // 入力された単語が「ん」で終わっている場合の処理
    } else if (word.endsWith("ん")) {
      alertGameOver({
        text: "語尾がんで終わってしまいました",
        isPaused,
        setWord,
        setAnswer,
        setInvisible,
        setDisabled,
        setIsPaused,
        setTime,
      });
      return;
      // 入力された単語がすでに使用されている場合の処理
    } else if (answer.includes(word)) {
      alertGameOver({
        text: "一度使用した単語を使ってしまいました",
        isPaused,
        setWord,
        setAnswer,
        setInvisible,
        setDisabled,
        setIsPaused,
        setTime,
      });
      return;
      // wikipediaに存在しない単語が入力された場合の処理
    } else if (!(await checkExist(word))) {
      setInvisible(false);
      setWord("");
      setInfoColor(true);
      setWorning("Wikipediaに存在しない単語です");
      setDisabled(false);
      setIsSubmitted(true);
      setIsPaused(false);
      return;
      // 回答が正しい場合の処理
    } else {
      setAnswer((prevAnswer: string[]): string[] => {
        const newWord = [word, ...prevAnswer];
        setWord("");
        setInvisible(true);
        setIsSubmitted(true);
        setTime(5);
        setDisabled(false);
        setIsPaused(false);
        return newWord;
      });
    }
  };

  // wikipediaに単語が存在するかどうかAPIリクエストを送信する関数
  const checkExist = async (query: string): Promise<boolean> => {
    setInvisible(false);
    setInfoColor(false);
    setWorning("Wikipedia検索中...");
    const response = await fetch("/api/checkExist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data.exists;
  };

  // 回答した後にフォーカスをinputタグに移動する処理
  useEffect(() => {
    if (isSubmitted && inputRef.current) {
      inputRef.current.focus();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="w-full flex items-center">
      <div className="w-3/5 mt-12 flex flex-col items-center">
        <Timer
          time={time}
          answer={answer}
          isPaused={isPaused}
          setTime={setTime}
          setWord={setWord}
          setAnswer={setAnswer}
          setInvisible={setInvisible}
          setIsPaused={setIsPaused}
          setDisabled={setDisabled}
        />
        <h1 className="mt-20 text-5xl font-bold">{answer.slice(0)[0]}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-8/12 mt-5"
        >
          <div>
            <input
              ref={inputRef}
              value={word}
              onChange={(e) => {
                setWord(e.target.value.trim());
              }}
              className="text-4xl text-center block mt-2 mb-4 py-6 px-2 w-full leading-5 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
              disabled={disabled}
              autoFocus
            />
          </div>
          <Warning text={worning} color={infoColor} invisible={invisible} />
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setAnswer([generateWord()]);
                setDisabled(false);
                setInvisible(true);
                setTime(5);
                setIsPaused(false);
              }}
              className="py-5 w-1/2 rounded-md text-white bg-indigo-700 hover:bg-indigo-500 text-xl text-md font-semibold"
            >
              Restart
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/4 h-[calc(100vh-300px)] flex justify-start items-start overflow-y-auto">
        <table className="w-full">
          <tbody>
            {answer.map((word, index) => (
              <tr
                key={index}
                className="flex border-b-2 border-solid border-blueGray-100"
              >
                <td className="flex-1 py-3 text-3xl whitespace-nowrap font-semibold text-center">
                  {word}
                </td>
                <td className="flex-none py-3 text-2xl whitespace-nowrap font-mono text-center">
                  {answer.length - index}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
