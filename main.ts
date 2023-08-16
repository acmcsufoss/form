import { createJWT, verifyJWT } from "./deps.ts";
import { getForms } from "./forms.ts";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  JWT_SECRET,
  PORT,
  SERVER_URL,
} from "./env.ts";

if (import.meta.main) {
  Deno.serve({ port: PORT }, handle);
}

async function handle(request: Request): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname === "/forms") {
    const forms = await getForms();
    return new Response(JSON.stringify(forms), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response("Not found", { status: 404 });
}
