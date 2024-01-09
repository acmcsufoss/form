<!-- Form List Page -->

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Forms</h1>

<div class="form-list">
	{#if data.forms.length > 0}
	<ul>
		{#each data.forms as form}
		<a href="/forms/{form.id}">{form.title}</a>
	{/each}
	</ul>
	{:else}
	<a href="/forms/new">Create form</a>
	{/if}
</div>

<a href="/forms/new">Create form</a>
