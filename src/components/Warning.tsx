type WarningProps = {
  text: string;
  invisible: boolean;
};

export const Warning: React.FC<WarningProps> = ({ text, invisible }) => {
  return (
    <div
      className={`pb-20 items-center text-red-500 font-semibold ${
        invisible === true ? "invisible" : ""
      }`}
    >
      {text}
    </div>
  );
};
