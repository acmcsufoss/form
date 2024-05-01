<script lang="ts">
	import type { DateQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import DateQuestionInput from './date_question_input.svelte';
	export let data = $$props as DateQuestion;

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
		<legend>Min Date</legend>
		<input type="date" bind:value={data.min} />
	</fieldset>
	<fieldset>
		<legend>Max Date</legend>
		<input type="date" bind:value={data.max} />
	</fieldset>
	<fieldset>
		<legend>Default Date</legend>
		<input type="date" bind:value={data.value} />
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<DateQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
