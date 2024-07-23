"use client";
import { useState } from "react";
import { normalizedString } from "@/utils/normalizedStr";
import Swal from "sweetalert2";

export default function MainPage() {
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState<string[]>(["りんご"]);

  const handleClick = () => {
    let first = word.slice(0, 1);
    let end = answer[0].replace(/ー|-/g, "").slice(-1);
    if (word.endsWith("ん")) {
      Swal.fire({
        icon: "error",
        title: "GAME OVER",
        text: "んで終わってしまいました",
        footer: '<a href="#">Restart</a>',
      });
      return;
    } else if (normalizedString(first) !== normalizedString(end)) {
      alert("相手の語尾で始まる単語を入力してください");
      setWord("");
      return;
    } else if (answer.includes(word)) {
      Swal.fire({
        icon: "error",
        title: "GAME OVER",
        text: "過去に使われた単語です",
        footer: '<a href="#">Restart</a>',
      });
      return;
    }
    setAnswer((prevAnswer: string[]): string[] => {
      const newWord = [word, ...prevAnswer];
      setWord("");
      return newWord;
    });
  };

  return (
    <div className="h-screen flex justify-around items-center">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mt">{answer.slice(0)[0]}</h1>
        <form action={handleClick} className="w-8/12 mt-5">
          <input
            value={word}
            onChange={(e) => {
              setWord(e.target.value.trim());
            }}
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </form>

        {/* <ul>
        {answer.map((word) => {
          return <li key={word}>{word}</li>;
        })}
      </ul> */}
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
