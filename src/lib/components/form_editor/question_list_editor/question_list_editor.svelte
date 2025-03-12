<script lang="ts">
	import type { Question } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import QuestionInputEditor from '$lib/components/form_editor/question_input_editor/question_input_editor.svelte';
	import { makeBlankQuestion } from './add_item';

	export let data: Question[];

	let type = QuestionType.TEXT;

	function addItem() {
		data = [...data, makeBlankQuestion(type, data.length)];
	}

	function deleteItem(i: number) {
		for (let j = i; j < data.length - 1; j++) {
			data[j] = data[j + 1];
			data[j].position -= 1;
		}
		data = data.slice(0, data.length - 1);
	}

	function handleMove(i: number, direction: number) {
		let temp = data[i];
		let newPos = data[i].position + direction;

		data[i].position += direction;
		data[newPos].position -= direction;

		data[i] = data[newPos];
		data[newPos] = temp;
	}
</script>

<!-- <QuestionInput
	type={QuestionType.BOOLEAN}
	name="shuffled"
	content="Shuffled"
	bind:value={shuffled}
/> -->

<!-- TODO: Figure out how to handle indexed names for the items in the list if needed. -->

{#each data as question, i}
	<details>
		<summary>
			{question.position}
			<span class="sort-buttons">
				<button type="button" disabled={i === 0} on:click={() => handleMove(i, -1)}>Up</button>
				<button type="button" disabled={i === data.length - 1} on:click={() => handleMove(i, 1)}
					>Down</button
				>
				<button type="button" on:click={() => deleteItem(i)}>Delete</button>
			</span>

			<span class="question-content">
				{#if question.content}
					{question.content}
				{:else}
					<em>Untitled</em>
				{/if}
				<!-- Remove question.value display after testing -->
				{#if question.value}
					{question.value}
				{:else}
					<em>No value found</em>
				{/if}
			</span>
			<span class="question-type">{question.type}</span>
		</summary>
		<QuestionInputEditor bind:data={question} />
	</details>
{/each}

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

<button type="button" on:click={() => addItem()}>Add</button>

<!-- <ListInput
	bind:value={data}
	components={{
		question: QuestionInputEditor,
		addItem: AddItem,
		deleteItem: DeleteItem
	}}
/> -->

<style>
	/* li {
		outline: 2px solid red;
	} */
	summary {
		margin: 15px 0px;
		padding: 10px;
		border-radius: 5px;
		background-color: #ffffff;
	}
	details {
		padding: 0;
	}
</style>
