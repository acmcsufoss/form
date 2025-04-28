import { DISCORD_PUBLIC_KEY } from '$env/static/private';
import { RequestHandler } from '@sveltejs/kit';
import { verifyKey } from 'discord-interactions';

export const POST: RequestHandler = async ({ request }) => {
	const rawBody = await request.text();
	let interaction: any;
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

	return new Response(null, { status: 204 });
};
