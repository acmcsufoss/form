import type { User } from '$lib/store';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface Platform {}

		interface Locals {
			user: User;
		}
	}
}

export {};
