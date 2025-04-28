import { DISCORD_PUBLIC_KEY } from '$env/static/private';
import { RequestHandler } from '@sveltejs/kit';
import { verifyKey } from 'discord-interactions';
import { s } from '$lib/resources/store';
import type * as db from '$lib/db/store';
import type { APIInteraction } from 'discord-api-types/v10';
import { createHash } from 'crypto';

function generateUniqueInviteId(user_id: string, form_id: string) {
	const hash = createHash('sha256');
	// Using discord public key as a seed. Might need to change this later.
	hash.update(user_id + form_id + DISCORD_PUBLIC_KEY);
	return hash.digest('base64url').slice(0, 16);
}

export const POST: RequestHandler = async ({ url, request }) => {
	const rawBody = await request.text();
	let interaction: APIInteraction;
	try {
		interaction = JSON.parse(rawBody);
	} catch {
		return new Response('Bad JSON', { status: 400 });
	}

	const signature = request.headers.get('X-Signature-Ed25519');
	const timestamp = request.headers.get('X-Signature-Timestamp');
	const public_key = DISCORD_PUBLIC_KEY;
	// Verify Signature
	if (!signature || !timestamp || !public_key) {
		return new Response('Invalid Request Signature', { status: 401 });
	}
	const isValidRequest = await verifyKey(rawBody, signature, timestamp, public_key);
	if (!isValidRequest) {
		return new Response('Invalid Request Signature', { status: 401 });
	}

	// Verify Discord PING
	if (interaction.type === 1) {
		return new Response(JSON.stringify({ type: 1 }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (interaction.type === 3) {
		const custom_id = interaction.data.custom_id;
		const form = await s.getFormByID(custom_id);
		const discord_user = interaction.member?.user;
		if (!discord_user) {
			return new Response('Invalid Discord User', { status: 401 });
		}
		if (!form) {
			return new Response('Invalid custom_id', { status: 401 });
		}

		let user = await s.getUserByDiscordUserID(discord_user.id);

		if (!user) {
			user = await s.createUser({
				discordUserID: discord_user.id,
				discordUsername: discord_user.username,
				discordAvatar: discord_user.avatar ?? ''
			});
		}

		const hash = generateUniqueInviteId(user.id, form.id);

		const invite = await s.getWIPFormByInviteID(hash);
		if (!invite) {
			s.createWIPFormByInviteID({ inviteID: hash, form: form, user: user });
		}

		// TODO: Create invites/[invite_id]
		// Use custom_id to create a new invite_id.

		return new Response(
			JSON.stringify({
				type: 4,
				data: {
					content: 'Form Link: ' + url + '/' + hash,
					flags: 1 << 6
				}
			}),
			{
				headers: { 'Content-Type': 'application/json' },
				status: 200
			}
		);
	}
	return new Response(null, { status: 204 });
};
