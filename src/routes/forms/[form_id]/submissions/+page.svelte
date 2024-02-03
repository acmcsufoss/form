<!-- Submissions List Page -->

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- {#if data.submissions} -->
<code>{JSON.stringify(data)}</code>
<!-- <SubmissionsList data={data.form} /> -->
<!-- {:else} -->
<!-- <p>Form not found</p> -->
<!-- {/if} -->
