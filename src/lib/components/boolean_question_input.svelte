<script lang="ts">
	import type { BooleanQuestion } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';

	export let data: BooleanQuestion = {
		type: QuestionType.BOOLEAN,

		name: 'Default Question',

		content: 'Default?',

		required: false,

		default: false,

		style: 'checkbox'
	};
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
{#if data.style === 'radio'}
	<input name={data.name} type="radio" required={data.required} bind:value={data.default} />
{:else}
	<input name={data.name} type="checkbox" required={data.required} bind:value={data.default} />
{/if}
