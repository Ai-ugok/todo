import 'https://deno.land/std/dotenv/load.ts';

/* サーバーにアクセス（fetch）があったら呼び出される関数 */
Deno.serve(async (req) => {
  const appid = Deno.env.get('79cf670c6bb57b15d64241c4cb02d476'); // 環境変数の読み込み
  console.log(appid); // ここはVSCodeのターミナル

  // メッセージボディを構成
  const body = JSON.stringify({ env: appid });

  // アクセスしてきたクライアントにJSONを返す
  return new Response(body, {
    headers: {
      'Access-Control-Allow-Origin': '*', // アクセス制限（全許可）
      'content-type': 'application/json; charset=utf-8',
    },
  });
});