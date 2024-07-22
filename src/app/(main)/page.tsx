"use client";
import { useState } from "react";

export default function MainPage() {
  const [word, setWord] = useState("");
  const [answer, setAnswer] = useState<string[]>(["りんご"]);

  const handleClick = () => {
    let first = word.slice(0, 1);
    let end = answer.slice(-1)[0].slice(-1);
    if (word.endsWith("ん")) {
      setWord("GAME OVER");
      return;
    } else if (first !== end) {
      setWord("GAME OVER");
      return;
    } else if (answer.includes(word)) {
      setWord("GAME OVER");
      return;
    }
    setAnswer((prevAnswer: string[]): string[] => {
      const newWord = [...prevAnswer, word];
      setWord("");
      return newWord;
    });
  };

  return (
    <div>
      <div>{answer.slice(-1)[0]}</div>
      <form action={handleClick}>
        <input
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
          }}
          className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
        />
        <button
          type="submit"
          className="mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400"
        >
          回答
        </button>
      </form>

      <table>
        {answer.map((word) => {
          return (
            <tr key={word}>
              <td>{word}</td>
            </tr>
          );
        })}
      </table>

      {/* <ul>
        {answer.map((word) => {
          return <li key={word}>{word}</li>;
        })}
      </ul> */}
    </div>
  );
}
