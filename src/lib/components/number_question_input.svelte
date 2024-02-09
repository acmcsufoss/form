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

		value: 0,

		placeholder: 'Enter a number',

		step: 1
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="number"
		required={data.required}
		min={data.min}
		max={data.max}
		bind:value={data.value}
		placeholder={data.placeholder}
		step={data.step}
	/>
</fieldset>
