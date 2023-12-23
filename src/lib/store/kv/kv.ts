import type { Kv, KvKey } from '@deno/kv';
import type * as store from '$lib/store';

export enum KvCollection {
	SESSIONS_BY_ID = 'sessions_by_id',
	USERS_BY_DISCORD_USER_ID = 'users_by_discord_user_id'
	// TODO: FORMS_BY_ID = "forms_by_id",
	// TODO: SUBMISSIONS_BY_ID = "submissions_by_id",
}

export class KvStore implements store.Store {
	constructor(private readonly kv: Kv, private readonly kvNamespace: KvKey = []) {}

	public async getUserByDiscordUserID(r: store.GetUserByDiscordUserIDRequest) {
		const user = await this.kv.get<store.User>(
			this.k(KvCollection.USERS_BY_DISCORD_USER_ID, r.discordUserID)
		);
		if (!user.value) {
			throw new Error('User not found');
		}

		return user.value;
	}

	private k(...key: KvKey) {
		return [...this.kvNamespace, ...key];
	}
}
