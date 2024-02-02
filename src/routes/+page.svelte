<script lang="ts">
	import type { PageData } from './$types';
	import DemoForm from '$lib/components/demo_form.svelte';

	export let data: PageData;
</script>

<h1>Demo form</h1>

<p>Welcome to Form (give us a star <a href="https://github.com/acmcsufoss/form">on GitHub</a>)</p>

<p>
	{#if data.user}
		Hello, {data.user.discordUsername}!{' '}
		View <a href="/forms">your forms</a>?{' '}
		<a href="/discord_oauth2/logout">Log out</a>?
	{:else}
		<a href="/discord_oauth2">Log in with Discord</a> to get started.
	{/if}
</p>

<DemoForm />

<style>
	h1,
	p {
		text-align: center;
	}

	:global(body) {
		background-color: #ebf8ff;
	}
</style>
