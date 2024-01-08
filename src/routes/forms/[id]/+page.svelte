<!-- TODO: Editor page -->
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.form}
	<!-- <FormEditor data={data.form} /> -->
	<code>{'<FormEditor />'}</code>
{:else}
	<p>Form not found</p>
{/if}
