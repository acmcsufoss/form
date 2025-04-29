<!-- TODO: Use code from authenticated form submission. -->
<script lang="ts">
	import Form from '$lib/components/form/form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	// console.log('data', data);
</script>

{#if data.form}
	<Form data={data.form} user={data.user} />
{:else}
	<p>Form not found</p>
{/if}
