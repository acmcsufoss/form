<script lang="ts">
	import type { BooleanQuestion } from '$lib/form';

	export let data: BooleanQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
{#if data.style === 'radio'}
	<input name={data.name} type="radio" required={data.required} checked={data.default} />
{:else}
	<input name={data.name} type="checkbox" required={data.required} checked={data.default} />
{/if}
