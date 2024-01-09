<script lang="ts">
	import type { NumberQuestion } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';

	export let data: NumberQuestion = {
		type: QuestionType.NUMBER,

		name: 'Defualt Number Question',

		content: 'Defualt Number?',

		required: false,

		min: 0,

		max: 100,

		default: 0,

		placeholder: 'Enter a number',

		step: 1
	};
</script>

<label class="Question-Header" for={data.name}> {data.content} </label>
<input
	name={data.name}
	type="number"
	required={data.required}
	min={data.min}
	max={data.max}
	bind:value={data.default}
	placeholder={data.placeholder}
	step={data.step}
/>
