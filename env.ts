import { dotenv } from "./deps.ts";

await dotenv.load({ export: true });

/**
 * PORT is the port to listen on.
 */
export const PORT = parseInt(Deno.env.get("PORT") || "8080");

/**
 * JWT_SECRET is the secret used to sign and verify JSON Web Tokens.
 */
export const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

/**
 * SERVER_URL is the URL of the server.
 */
export const SERVER_URL = Deno.env.get("SERVER_URL")!;

/**
 * DISCORD_CLIENT_ID is the Discord client ID for OAuth2 authentication.
 */
export const DISCORD_CLIENT_ID = Deno.env.get("DISCORD_CLIENT_ID")!;

/**
 * DISCORD_CLIENT_SECRET is the Discord client secret for OAuth2 authentication.
 */
export const DISCORD_CLIENT_SECRET = Deno.env.get("DISCORD_CLIENT_SECRET")!;
