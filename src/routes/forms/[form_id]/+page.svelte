<!-- TODO: Editor page -->
<script lang="ts">
	import type { PageData } from './$types';
	import FormEditor from '$lib/components/form_editor.svelte';

	export let data: PageData;
</script>

{#if data.form}
	<FormEditor action="" method="POST" data={data.form} />
{:else}
	<p>Form not found</p>
{/if}
