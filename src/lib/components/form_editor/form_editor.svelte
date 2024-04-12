<script lang="ts">
	import type { Form } from '$lib/form';
	import { QuestionType, type QuestionList } from '$lib/form';
	import QuestionInput from '$lib/components/question_input/question_input.svelte';
	import QuestionListEditor from './question_list_editor/question_list_editor.svelte';
	import BaseEditor from '../questions/base/base_editor.svelte';
	import BooleanQuestionInputEditor from '../questions/boolean/boolean_question_input_editor.svelte';
	import QuestionInputEditor from './question_input_editor/question_input_editor.svelte';

	export let action: string;
	export let method: string;
	export let value: Form;

	var questions: any = value.questions;
	// TODO: Add discord data: channels, threads, guilds, roles.
	function addItem() {
		questions.append();
	}
	function handleSumbit(event: MouseEvent) {
		event.preventDefault();
		console.log(questions);
	}
</script>

<form {action} {method}>
	<div class="form-header">
		<h1>Form editor</h1>
		<p class="form-description">Edit a form!</p>
		<hr />
		<div class="form-information">
			<p>Form ID: {value.id}</p>
		</div>
	</div>

	<QuestionInput type={QuestionType.TEXT} name="title" content="Title" bind:value={value.title} />

	<QuestionInput
		type={QuestionType.TEXTAREA}
		name="description"
		content="Description"
		bind:value={value.description}
	/>

	<QuestionInput
		type={QuestionType.DATETIME}
		name="startDate"
		content="Start date"
		bind:value={value.startDate}
	/>

	<QuestionInput
		type={QuestionType.DATETIME}
		name="endDate"
		content="End date"
		bind:value={value.endDate}
	/>

	<QuestionInput
		type={QuestionType.TIMEZONE}
		name="timezone"
		content="Timezone (default: UTC/GMT)"
		bind:value={value.timezone}
	/>

	<QuestionInput
		type={QuestionType.BOOLEAN}
		name="anonymized"
		content="Anonymized"
		bind:value={value.anonymized}
	/>

	<QuestionInput
		type={QuestionType.BOOLEAN}
		name="shuffled"
		content="Shuffled"
		bind:value={value.questions.shuffled}
	/>

	<QuestionListEditor bind:value={questions} />
	<button type="submit" on:click={handleSumbit}>Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 400px;
	}
	/* :global(fieldset) {
		border: none;
		min-width: 0;
		margin: 0px;
		padding: 0px;
		max-width: 100%;
		width: 100%;
		display: block;
	} */
	:global(legend) {
		font-size: 13px;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: 'Poppins';
	}

	:global(.question) {
		padding: 20px 15px;
		width: calc(100% - 30px);
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		border-color: #c5c8c9;
		border-width: 0;
		border-style: solid;
	}

	/* :global(label) {
		display: flex;
	} */

	/* :global(input) {
		display: flex;
	} */
</style>
