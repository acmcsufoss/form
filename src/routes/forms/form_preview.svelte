<script lang="ts">
	import type { Form } from '$lib/form';
	import { makeFormURL } from '$lib/urls';

	export let data: Form;
</script>

<article>
	<h2>
		<a href={makeFormURL(data.id)} title={JSON.stringify(data)}>
			{#if data.title}
				{data.title}
			{:else}
				Untitled
			{/if}
		</a>
	</h2>

	<p>
		ID: {data.id}
	</p>

	<hr />

	<p>
		{#if data.description}
			{data.description}
		{:else}
			No description
		{/if}
	</p>
</article>

<style>
	article {
		--color: purple;
		padding: 1rem;
		margin: 1rem;
		outline: 3px solid var(--color);
		border-radius: 1rem;
		overflow: hidden;
	}

	h2,
	p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	h2 {
		margin: 0;
		padding: 0;
	}

	p,
	hr {
		margin: 0.4rem 0;
	}
</style>
