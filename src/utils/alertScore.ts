import Swal from "sweetalert2";

type AlertGameOverProps = {
  score: number;
  isPaused: boolean;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  setInvisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export const alertScore = ({
  score,
  setWord,
  setAnswer,
  setInvisible,
  setDisabled,
  setIsPaused,
  setTime,
}: AlertGameOverProps) => {
  setIsPaused(true);
  Swal.fire({
    title: `<div style="font-size:xxx-large; font-style: italic; color: #6633FF;">${score}words!</div>`,
    showCancelButton: true,
    confirmButtonText: "Restart",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      setWord("");
      setAnswer(["りんご"]);
      setInvisible(true);
      setDisabled(false);
      setTime(5);
      setIsPaused(false);
    } else {
      setDisabled(true);
      setWord("");
      setInvisible(true);
    }
  });
};
