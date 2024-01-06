import { openKv } from '@deno/kv';
import { KvStore } from '$lib/store/kv';
import { DENO_KV_ACCESS_TOKEN } from '$env/static/private';

const kv = await openKv('./db.kv', { accessToken: DENO_KV_ACCESS_TOKEN });

export const s = new KvStore(kv);
