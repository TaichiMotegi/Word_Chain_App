import { alertScore } from "@/utils/alertScore";
import React, { useEffect } from "react";

type TimerProps = {
  time: number;
  isPaused: boolean;
  answer: string[];
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  setInvisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export const Timer: React.FC<TimerProps> = ({
  time,
  isPaused,
  answer,
  setWord,
  setAnswer,
  setInvisible,
  setDisabled,
  setIsPaused,
  setTime,
}) => {
  useEffect(() => {
    if (time <= 0) {
      setIsPaused(true);
      alertScore({
        score: answer.length - 1,
        isPaused,
        setWord,
        setAnswer,
        setInvisible,
        setDisabled,
        setIsPaused,
        setTime,
      });
    }

    const id = setInterval(() => {
      if (!isPaused) {
        setTime((t) => t - 1);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [time, isPaused]);

  return <div className="text-9xl text-red-500">{time}</div>;
};
