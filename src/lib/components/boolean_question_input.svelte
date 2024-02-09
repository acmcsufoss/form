<script lang="ts">
	import type { BooleanQuestion } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';

	export let data: BooleanQuestion = {
		type: QuestionType.BOOLEAN,

		name: 'Default Question',

		content: 'Default?',

		required: false,

		value: false,

		style: 'checkbox'
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	{#if data.style === 'radio'}
		<input name={data.name} type="radio" required={data.required} bind:value={data.value} />
	{:else}
		<input name={data.name} type="checkbox" required={data.required} bind:value={data.value} />
	{/if}
</fieldset>
