"use client";
import { useState } from "react";
import { normalizedString } from "@/utils/normalizedStr";
import { Timer } from "@/components/Timer";
import { alertGameOver } from "@/utils/alertGameOver";
import { Warning } from "@/components/Warning";

export default function GamePage() {
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState<string[]>(["りんご"]);
  const [disabled, setDisabled] = useState(false);
  const [invisible, setInvisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [worning, setWorning] = useState("worning");
  const [time, setTime] = useState(5);

  const handleClick = () => {
    const containsNonHiragana = /[^ぁ-ん]/.test(word);
    const first = word.slice(0, 1);
    const end = answer[0].replace(/ー|-/g, "").slice(-1);
    if (containsNonHiragana) {
      setInvisible(false);
      setWord("");
      setWorning("ひらがなのみで入力してください");
      return;
    } else if (normalizedString(first) !== normalizedString(end)) {
      setInvisible(false);
      setWord("");
      setWorning("相手の語尾で始まる単語を入力してください");
      return;
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
    }
    setAnswer((prevAnswer: string[]): string[] => {
      const newWord = [word, ...prevAnswer];
      setWord("");
      setInvisible(true);
      setTime(5);
      return newWord;
    });
  };

  return (
    <div className="h-screen flex items-center">
      <div className="w-1/2 flex flex-col items-center">
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
            handleClick();
          }}
          className="w-8/12 mt-5"
        >
          <div>
            <input
              value={word}
              onChange={(e) => {
                setWord(e.target.value.trim());
              }}
              className="text-4xl text-center block mt-2 mb-4 py-6 px-2 w-full leading-5 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
              disabled={disabled}
            />
          </div>
          <Warning text={worning} invisible={invisible} />
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setAnswer(["りんご"]);
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
      <div className="w-1/2 h-[calc(100vh-300px)] flex justify-center items-start overflow-y-auto">
        <table className="w-3/5">
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
