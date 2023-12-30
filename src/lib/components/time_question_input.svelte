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

		default: 0.0
	};
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	name={data.name}
	type="time"
	required={data.required}
	bind:value={data.default}
	min={data.min}
	max={data.max}
/>
