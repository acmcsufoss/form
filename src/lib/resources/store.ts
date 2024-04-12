import { openKv } from '@deno/kv';
import { KvStore } from '$lib/db/kv';
import { DENO_KV_ACCESS_TOKEN, DENO_KV_CONNECT_URL } from '$env/static/private';

const kvPath = DENO_KV_CONNECT_URL || './.denokv';
const kv = await openKv(kvPath, { accessToken: DENO_KV_ACCESS_TOKEN });

export const s = new KvStore(kv);
