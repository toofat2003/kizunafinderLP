import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const robots = `User-agent: *
Allow: /
`;

const goneHtml = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow,noarchive" />
    <title>サービス提供終了</title>
    <style>
      :root { color-scheme: light dark; }
      body {
        align-items: center;
        display: flex;
        font-family: system-ui, sans-serif;
        justify-content: center;
        margin: 0;
        min-height: 100vh;
        padding: 24px;
      }
      main { max-width: 36rem; }
      h1 { font-size: 1.5rem; }
      p { line-height: 1.8; }
    </style>
  </head>
  <body>
    <main>
      <h1>サービス提供終了</h1>
      <p>このサービスは提供を終了しました。現在、申込み・お問い合わせは受け付けていません。</p>
    </main>
  </body>
</html>`;

export function middleware(request: NextRequest) {
  const hasBody = request.method !== "HEAD";

  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse(hasBody ? robots : null, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new NextResponse(hasBody ? goneHtml : null, {
    status: 410,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Language": "ja",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      "Content-Type": "text/html; charset=utf-8",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export const config = {
  matcher: ["/:path*"],
};
