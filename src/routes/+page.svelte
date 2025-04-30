<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<section class="hero">
		<div class="hero-main">
			<h1>Form</h1>
			<p>
				Form is a platform managing authenticated Discord form submissions within Discord servers.
				Give us a star <a href="https://github.com/acmcsufoss/form">on GitHub</a>.
			</p>
			<div class="hero-links">
				{#if data.user}
					<a href="/forms" class="link-accent">View Forms</a>
					<a href="/discord_oauth2/logout" class="link-secondary">Log Out</a>
				{:else}
					<a href="/discord_oauth2" class="link-accent">Log In with Discord</a>
				{/if}
			</div>
		</div>
		<div>
			<img src="/logo.svg" alt="Form Logo" />
		</div>
	</section>
</main>

<style>
	main {
		min-height: 80vh;
		background-color: rgb(var(--color-background-400));
		padding: 2rem;
	}

	h1 {
		font-size: 3.5rem;
	}

	a {
		color: rgb(var(--color-foreground-700));
	}

	p {
		font-size: 1.25rem;
	}

	.hero {
		max-width: 1024px;
		margin-inline: auto;
		padding-block: 3rem;
		display: flex;
		flex-direction: column-reverse;
		gap: 2rem;
	}

	.hero > .hero-main {
		max-width: 70ch;
		display: flex;
		flex-direction: column;
	}

	.hero img {
		max-width: 10rem;
	}

	.hero-links {
		margin-block-start: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hero-links > a {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 10rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.125rem;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
	}

	.hero-links > .link-accent {
		background-color: rgb(var(--color-contrast));
	}

	.hero-links > .link-secondary {
		border: 2px solid rgb(var(--color-contrast));
	}

	@media screen and (min-width: 640px) {
		.hero {
			flex-direction: row;
		}

		.hero-links {
			flex-direction: row;
		}
	}
</style>
