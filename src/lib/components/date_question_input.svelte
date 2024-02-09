<script lang="ts">
	import type { DateQuestion } from '../form/form.js';
	import { QuestionType } from '../form/form.js';

	export let data: DateQuestion = {
		type: QuestionType.DATE,

		name: 'Date Question',

		value: 0.0,

		min: 0.0,

		max: 24.0,

		content: '',

		required: false
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="date"
		required={data.required}
		min={data.min}
		max={data.max}
		bind:value={data.value}
	/>
</fieldset>
