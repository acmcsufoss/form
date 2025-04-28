<!-- TODO: Editor page -->
<script lang="ts">
	import type { PageData } from './$types';
	import FormEditor from '$lib/components/form_editor/form_editor.svelte';

	export let data: PageData;
</script>

{#if data.form}
	<button
		on:click={() => {
			window.location.href = '/forms';
		}}
	>
		Back to Forms</button
	>
	<FormEditor action="" method="POST" value={data.form} />
{:else}
	<p>Form not found</p>
{/if}
