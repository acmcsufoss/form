<!-- TODO: Editor page -->
<script lang="ts">
	import type { PageData } from './$types';
	import FormEditor from '$lib/components/form_editor/form_editor.svelte';

	export let data: PageData;
</script>

{#if data.form}
	<FormEditor action="" method="POST" value={data.form} />
{:else}
	<p>Form not found</p>
{/if}
