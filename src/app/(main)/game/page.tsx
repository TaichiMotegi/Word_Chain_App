"use client";
import { useState } from "react";
import { normalizedString } from "@/utils/normalizedStr";
import Swal from "sweetalert2";

export default function GamePage() {
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState<string[]>(["りんご"]);
  const [disabled, setDisabled] = useState(false);
  const [cheat, setCheat] = useState(false);

  const handleClick = () => {
    let first = word.slice(0, 1);
    let end = answer[0].replace(/ー|-/g, "").slice(-1);
    if (word.endsWith("ん")) {
      Swal.fire({
        icon: "error",
        title: "GAME OVER",
        text: "語尾がんで終わってしまいました",
        showCancelButton: true,
        confirmButtonText: "Restart",
        cancelButtonText: "Exit",
      }).then((result) => {
        if (result.isConfirmed) {
          setWord("");
          setAnswer(["りんご"]);
          setCheat(false);
        } else {
          setDisabled(true);
          setWord("");
          setCheat(false);
        }
      });
      return;
    } else if (normalizedString(first) !== normalizedString(end)) {
      setCheat(true);
      setWord("");
      return;
    } else if (answer.includes(word)) {
      Swal.fire({
        icon: "error",
        title: "GAME OVER",
        text: "一度使用した単語を使ってしまいました",
        showCancelButton: true,
        confirmButtonText: "Restart",
        cancelButtonText: "Exit",
      }).then((result) => {
        if (result.isConfirmed) {
          setWord("");
          setAnswer(["りんご"]);
          setCheat(false);
        } else {
          setDisabled(true);
          setWord("");
          setCheat(false);
        }
      });
      return;
    }
    setAnswer((prevAnswer: string[]): string[] => {
      const newWord = [word, ...prevAnswer];
      setWord("");
      setCheat(false);
      return newWord;
    });
  };

  return (
    <div className="h-screen flex justify-around items-center">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mt">{answer.slice(0)[0]}</h1>
        <form action={handleClick} className="w-8/12 mt-5">
          <div>
            <input
              value={word}
              onChange={(e) => {
                setWord(e.target.value.trim());
              }}
              className="text-4xl text-center block mt-2 py-6 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
              disabled={disabled}
            />
          </div>
          <div
            className={`text-red-500 font-semibold ${
              cheat === true ? "" : "invisible"
            }`}
          >
            相手の語尾で始まる単語を入力してください
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setAnswer(["りんご"]);
                setDisabled(false);
                setCheat(false);
              }}
              className="mt-8 py-3 w-3/4 rounded-full text-white bg-gray-800 hover:bg-gray-700 text-md font-semibold"
            >
              Restart
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 h-[calc(100vh-300px)] flex justify-center items-start overflow-y-auto">
        <table className="w-3/4">
          <tbody>
            {answer.map((word) => {
              return (
                <tr key={word} className="">
                  <td className="border-b-2 border-solid border-blueGray-100 py-3 text-3xl whitespace-nowrap font-semibold text-center">
                    {word}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
