<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>


{#if data.submission}
	<!-- <Submission data={data.submission} /> -->
	<code>{'<Submission />'}</code>
{:else}
	<p>Submission not found</p>
{/if}
