<!-- Form List Page -->

<script lang="ts">
	import type { PageData } from './$types';
	import { makeFormNewURL, makeFormURL } from '$lib/urls';

	export let data: PageData;
</script>

<h1>Forms</h1>

<div class="form-list">
	{#if data.forms.length > 0}
		<ul>
			{#each data.forms as form}
				<a href={makeFormURL(form.id)} title={JSON.stringify(form)}>{form.title}</a>
			{/each}
		</ul>
	{/if}
</div>

<a href={makeFormNewURL()}>Create a form</a>
