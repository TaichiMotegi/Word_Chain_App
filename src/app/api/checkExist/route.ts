import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.CLIENT_ID;
const YAHOO_API_URL = process.env.YAHOO_API_URL;
const WIKIPEDIA_API_URL = process.env.WIKIPEDIA_API_URL;

type Params = {
  q: string;
  format: string;
  mode: string;
  dictionary: string[];
  results: number;
};

type RequestPayload = {
  id: string;
  jsonrpc: string;
  method: string;
  params: Params;
};

// クライアントから送信された回答をmedeiawikiAPIに渡す関数
export const POST = async (req: NextRequest, res: NextResponse) => {
  // ReadableStreamからデータを読み取る
  const reader = req.body?.getReader();
  let body = "";
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = (await reader?.read()) ?? {};
    if (done) break;
    body += decoder.decode(value, { stream: true });
  }
  // json形式に変換しクエリを取得
  const body_obj = JSON.parse(body);
  const query = body_obj.query;

  try {
    const exists = await checkExist(query);
    return NextResponse.json({ message: "API処理成功", exists: exists });
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return NextResponse.json({ message: "API処理失敗", errorMesage: error });
  }
};

// mediawikiAPIに変換候補を送信する関数
const checkExist = async (query: string) => {
  try {
    const candidates = await convertQuery(query);
    for (const candidate of candidates) {
      const exists = await checkWordInWikipedia(candidate);
      if (exists) {
        console.log(`単語 "${candidate}" はWikipediaに存在します。`);
        return true;
      } else {
        console.log(`単語 "${candidate}" はWikipediaに存在しません。`);
      }
    }
    return false;
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return false;
  }
};

// YahooAPIにクエリを送信し変換候補を取得する関数
const convertQuery = async (query: string): Promise<string[]> => {
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": `Yahoo AppID: ${CLIENT_ID}`,
  };

  const paramDic: RequestPayload = {
    id: "1234-1",
    jsonrpc: "2.0",
    method: "jlp.jimservice.conversion",
    params: {
      q: query,
      format: "hiragana",
      mode: "kanakanji",
      dictionary: ["base", "name", "place", "zip", "symbol"],
      results: 5,
    },
  };

  const response = await fetch(YAHOO_API_URL ?? "", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(paramDic),
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  // segmentの数をチェック
  if (data.result.segment.length > 1) {
    console.log("segmentが複数存在するため、処理を終了します。");
    return [];
  }
  return data.result.segment.flatMap((segment: any) => segment.candidate);
};

// wikipediaに単語が存在するかどうかAPIリクエストを送信する関数
const checkWordInWikipedia = async (word: string): Promise<boolean> => {
  const url = `${WIKIPEDIA_API_URL}?format=json&action=query&prop=info&titles=${encodeURIComponent(
    word
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));

  return !data.query.pages.hasOwnProperty("-1");
};
