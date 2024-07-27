export const normalizedString = (word: string): string => {
  const replacements: { [key: string]: string } = {
    ょ: "よ",
    ゃ: "や",
    ゅ: "ゆ",
    ぁ: "あ",
    ぃ: "い",
    ぅ: "う",
    ぇ: "え",
    ぉ: "お",
  };

  return word.replace(/[ょゃゅぁぃぅぇぉ]/g, (match) => replacements[match]);
};
