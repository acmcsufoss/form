<script lang="ts">
	import { QuestionType } from '$lib/form';
	import type { AddItemProps } from '$lib/components/list_input/list_input';
	import { makeBlankQuestion } from './add_item';

	export let addAction: AddItemProps['addAction'];

	let type = QuestionType.TEXT;

	function add(e: MouseEvent) {
		e.preventDefault();
		addAction(makeBlankQuestion(type));
	}

	// function makeDefault(type: QuestionType): Question {
	// 	switch...
	// }
</script>

<select bind:value={type}>
	<option value={QuestionType.TEXT}>Text</option>
	<option value={QuestionType.TEXTAREA}>Textarea</option>
	<option value={QuestionType.NUMBER}>Number</option>
	<option value={QuestionType.BOOLEAN}>Boolean</option>
	<option value={QuestionType.COLOR}>Color</option>
	<option value={QuestionType.DATE}>Date</option>
	<option value={QuestionType.DATETIME}>Datetime</option>
	<option value={QuestionType.TIME}>Time</option>
	<option value={QuestionType.TIMEZONE}>Timezone</option>
	<option value={QuestionType.SELECT}>Select</option>
	<option value={QuestionType.RADIO_GROUP}>Radio group</option>
	<option value={QuestionType.AVAILABILITY}>Availability</option>
</select>

<button on:click={add}>Add</button>
