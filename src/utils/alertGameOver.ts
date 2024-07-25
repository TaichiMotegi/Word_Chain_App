import Swal from "sweetalert2";

type AlertGameOverProps = {
  text: string;
  isPaused: boolean;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  setInvisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export const alertGameOver = ({
  text,
  setWord,
  setAnswer,
  setInvisible,
  setDisabled,
  setIsPaused,
  setTime,
}: AlertGameOverProps) => {
  setIsPaused(true);
  Swal.fire({
    icon: "error",
    title: "GAME OVER",
    text: text,
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
