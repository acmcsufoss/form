import { createJWT, getCookies, verifyJWT } from "./deps.ts";

/**
 * handle handles request to /oauth endpoint.
 */
export async function handle(
  request: Request,
  clientID: string,
  clientSecret: string,
  jwtSecret: string,
  redirectURI: string,
): Promise<Response> {
  const url = new URL(request.url);
  const existingJWT = getCookies(request.headers)["jwt"];
  if (existingJWT) {
    const accessToken = await verifyJWT(existingJWT, jwtSecret);
    if (accessToken) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/forms" },
      });
    }
  }

  // Handle unauthorized requests.
  const code = url.searchParams.get("code");
  if (!code) {
    return Response.redirect(makeAuthorizationURL(clientID, redirectURI));
  }

  // Exchange code for access token.
  const accessToken = await exchangeCode(
    code,
    clientID,
    clientSecret,
    redirectURI,
  );

  // Encode access token into JWT.
  const jwt = await createJWT(
    { alg: "HS512", typ: "JWT" },
    { accessToken },
    // TODO: Figure out how to convert a string into
    // a CryptoKey before passing to this function.
    jwtSecret,
  );

  // Set JWT as a cookie and redirect to /forms.
  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie": `jwt=${jwt}; Path=/; HttpOnly`,
      Location: "/forms",
    },
  });
}

/**
 * makeAuthorizationURL creates a Discord authorization URL.
 */
export function makeAuthorizationURL(
  clientID: string,
  redirectURI: string,
): string {
  return `https://discord.com/oauth2/authorize?response_type=code&client_id=${clientID}&scope=identify%20guilds.members.read&redirect_uri=${redirectURI}`;
}

/**
 * exchangeCode exchanges a code for a Discord access token.
 */
export async function exchangeCode(
  code: string,
  clientID: string,
  clientSecret: string,
  redirectURI: string,
): Promise<string> {
  const r = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectURI,
    }),
  });
  const json = await r.json();
  return json.access_token;
}

const API_ENDPOINT = "https://discord.com/api/v10";
