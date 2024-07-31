## しりとりソロプレイ！

一人でしりとりをどこまで続けることができるか挑戦するアプリケーションです．
基本的なしりとりのルールにプラスして 1 回答 5 秒で答える必要があります．
また使用できる単語は Wikipedia に載っている単語のみです．
しりとり力，タイピング速度，記憶力を鍛えよう！

https://word-chain-app.vercel.app/

## 仕様

- ホーム画面の Play Game をクリックするとゲームが始まります
- ページ遷移すると autofocus で入力欄にカーソルが当たっている状態になっているので，単語を入力し Enter を押すと回答できます
- 最初の単語はフルーツの名前がランダムに出力されます
- 下記のような単語を入力した場合は別の単語を再入力をする必要があります
  - 「ひらがな」と「長音符」以外の文字が入力した場合
  - 直前の単語の末尾と入力した単語の先頭が違う場合
  - Wikipedia に載っていない単語を入力した場合 ＊
- 回答した単語の履歴は画面右に表示されます
- １回答５秒以内で答えらなかった場合，その時点で回答した単語数がアラートで表示されます
  - Wikipedia 内を検索している際、5 秒カウントは停止します
- 下記のような場合は Game Over のアラートが表示されます
  - 末尾が「ん」で終わる単語を入力した場合
  - 過去に使用した単語を入力した場合
- Restart ボタンを押すと最初からやり直せます

＊Yahoo API のかな漢字変換を用いて入力された単語の変換候補を 5 件取得します．取得した５件のうちに Wikipedia に存在する単語があるか MediaWiki API を使用して確認します．

## 参考資料

### Next.js＆React

- [Next.js フルスタック Web アプリケーション開発入門](https://www.udemy.com/course/nextjs-fullstack/)
- [Next js で学ぶ React 講座](https://www.youtube.com/watch?v=15WLMqnkPsE&list=PLwM1-TnN_NN6fUhOoZyU4iZiwhLyISopO&ab_channel=%E3%81%97%E3%81%BE%E3%81%B6%E3%83%BC%E3%81%AEIT%E5%A4%A7%E5%AD%A6)
- [【React】useRef \~2 つの使い方とその背景~](https://qiita.com/hinako_n/items/1d041e71820148e8bf61)

### TypeScripv

- [プロを目指す人のんための TypeScript 入門](https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%99%E4%BA%BA%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AETypeScript%E5%85%A5%E9%96%80-%E5%AE%89%E5%85%A8%E3%81%AA%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%81%8B%E3%82%89%E9%AB%98%E5%BA%A6%E3%81%AA%E5%9E%8B%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9%E3%81%BE%E3%81%A7-Software-Design-plus/dp/4297127474/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.M5U7tV6BwTgnpnUPA5u9D41SOxZE4j-43ZFyXt4PRXXfZRwXZskEpQStAK5ngGkgmVZzCsvH8cRO7iKPLtRfpOw1ZXNbWKD44m4TNIakrp3moB6E1jWKS5Pm9wakTFLLwTzI0eZu9786if-pZHPOCt8YcjTrRSrRZKBiou3e6zPaYAZ0Tg1SCANPEKCg6laTe943FTMC6Xhe9iMsUBmstPtFkh015-gTm3T1gBH-hJTFRONSkIxvpjWRATxBjSxGHIDiGT2UzodTRmkROuGO8s-eHsbM-hdIL52GH4KWEBQ.j5hNeOwUKFAUa9EWl3VXrpIhcb8MZReUdJqcnbr6Lc4&dib_tag=se&keywords=TypeScript&qid=1722249996&s=books&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1)

### API

- [MediaWiki API:チュートリアル](https://www.mediawiki.org/wiki/API:Tutorial/ja)
- [MediaWiki API を使って Wikipedia の情報を取得](https://qiita.com/yubessy/items/16d2a074be84ee67c01f)
- [YahooJapan API ドキュメント かな漢字変換](https://developer.yahoo.co.jp/webapi/jlp/jim/v2/conversion.html)

### その他

- [ReadableStream を JSON に変換](https://zenn.dev/nuintee/scraps/4dd1083c9f8b17)
- [【JavaScript】乱数（範囲指定）](https://qiita.com/sho-17/items/4a89f13e13fa9dcc250a)
- [sweetalert2](https://sweetalert2.github.io/)
