<script lang="ts">
	import type { DatetimeQuestion } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';
	export let data: DatetimeQuestion = {
		type: QuestionType.DATETIME,

		name: 'Date Time Question',

		required: false,

		content: 'date and time',

		default: 0,

		min: 0,

		max: 100
	};
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	name={data.name}
	type="datetime-local"
	required={data.required}
	bind:value={data.default}
	min={data.min}
	max={data.max}
/>
