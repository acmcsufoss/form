<script lang="ts">
	import type { Form } from '$lib/form';
	import FormPreview from './form_preview.svelte';

	export let data: Form[];
</script>

<div class="form-list">
	{#if data.length > 0}
		<ul>
			{#each data as form (form.id)}
				<li>
					<FormPreview data={form} />
				</li>
			{/each}
		</ul>
	{/if}
</div>
