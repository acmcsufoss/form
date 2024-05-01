<script lang="ts">
	import type { AvailablityQuestion } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import ListInput from '$lib/components/list_input/list_input.svelte';
	import TextQuestionInput from '../text/text_question_input.svelte';
	import DeleteItem from '$lib/components/form_editor/question_list_editor/delete_item.svelte';
	import BaseEditor from '../base/base_editor.svelte';
	import TextQuestionInputEditor from '../text/text_question_input_editor.svelte';
	import AvailabilityQuestionInput from './availability_question_input.svelte';
	import DatetimeQuestionInput from '../datetime/datetime_question_input.svelte';
	import AddItem from '$lib/components/form_editor/question_list_editor/add_item.svelte';
	// import AvailabilityAddItem from './availability_add_item.svelte';

	export var data = $$props as AvailablityQuestion;
</script>

<BaseEditor bind:data>
	<!-- Copied from datetime_question_input.svelte -->
	<fieldset>
		<legend>Enter Min Start Date Time</legend>
		<input type="datetime-local" bind:value={data.minStartDatetime} max={data.maxEndDatetime} />
	</fieldset>
	<!-- Copied from datetime_question_input.svelte -->
	<fieldset>
		<legend>Enter Max End Date Time</legend>
		<input type="datetime-local" bind:value={data.maxEndDatetime} min={data.minStartDatetime} />
	</fieldset>
	<!-- Copied from number_question_input.svelte -->
	<fieldset>
		<legend>Enter Max Date Ranges</legend>
		<input type="number" bind:value={data.maxDatetimeRanges} />
	</fieldset>
	<!-- TODO: Make the avaibilityQuestion Input here be the default value for the sample -->
	<AvailabilityQuestionInput bind:data />
	<svelte:fragment slot="preview">
		<AvailabilityQuestionInput {data} />
	</svelte:fragment>
</BaseEditor>
