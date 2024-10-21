<script lang="ts">
	import type { DateQuestion, DatetimeQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import DatetimeQuestionInput from './datetime_question_input.svelte';
	export let data = $$props as DatetimeQuestion;

	/* type: QuestionType.DATE,
				name: 'justDate',
				content: 'Pick a date (jk you can only pick today)',
				required: false,
				value: new Date().toISOString(),
				min: new Date().toISOString(),
				max: new Date().toISOString() */
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>Min Date/Time</legend>
		<input type="datetime-local" bind:value={data.min} />
	</fieldset>
	<fieldset>
		<legend>Max Date/Time</legend>
		<input type="datetime-local" bind:value={data.max} />
	</fieldset>
	<fieldset>
		<legend>Default Date/Time</legend>
		<input type="datetime-local" bind:value={data.value} />
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<DatetimeQuestionInput {data} />
		</div>
	</svelte:fragment>
</BaseEditor>
