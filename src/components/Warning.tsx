type WarningProps = {
  text: string;
  color: boolean;
  invisible: boolean;
};

export const Warning: React.FC<WarningProps> = ({ text, color, invisible }) => {
  return (
    <div
      className={`pb-20 items-center text-center text-2xl ${
        color === true ? "text-red-500" : "text-indigo-700"
      } font-semibold ${invisible === true ? "invisible" : ""}`}
    >
      {text}
    </div>
  );
};
