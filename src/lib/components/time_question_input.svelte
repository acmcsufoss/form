<script lang="ts">
	import type { TimeQuestion } from '../form/form.js';
	import { QuestionType } from '../form/form.js';

	export let data: TimeQuestion = {
		type: QuestionType.TIME,

		name: 'Time Question',

		content: 'Default?',

		required: false,

		min: 0,

		max: 0,

		value: 0.0
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="time"
		required={data.required}
		bind:value={data.value}
		min={data.min}
		max={data.max}
	/>
</fieldset>
