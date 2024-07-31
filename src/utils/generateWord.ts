const words = [
  "りんご",
  "なし",
  "ばなな",
  "いちご",
  "おれんじ",
  "ぶどう",
  "すいか",
  "もも",
  "さくらんぼ",
  "きうい",
  "ぱいなっぷる",
  "ぶるーべりー",
  "かき",
  "らいち",
];

// ランダムな単語を生成する関数
export const generateWord = (): string => {
  const seed = Math.floor(Math.random() * words.length);
  const word = words[seed];
  return word;
};
