<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Form</h1>

<p>
	Form is a platform managing authenticated Discord form submissions within Discord servers. Give us
	a star <a href="https://github.com/acmcsufoss/form">on GitHub</a>.
</p>

<p>
	{#if data.user}
		Hello, {data.user.discordUsername}!{' '}
		View <a href="/forms">your forms</a>?{' '}
		<a href="/discord_oauth2/logout">Log out</a>?
	{:else}
		<a href="/discord_oauth2">Log in with Discord</a> to get started.
	{/if}
</p>

<style>
	h1,
	p {
		text-align: center;
	}
</style>
