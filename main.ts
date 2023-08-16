/** @jsx h */
import { h } from "https://esm.sh/preact@10.5.15";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";

function handler(_req: Request): Response {
  const page = (
    <div>
      <h1>Current time</h1>
      <p>{new Date().toLocaleString()}</p>
    </div>
  );
  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

Deno.serve(handler);

// See: https://dash.deno.com/playground/example-ssr-jsx-preact
