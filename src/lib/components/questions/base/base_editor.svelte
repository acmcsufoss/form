<script lang="ts">
	import type { QuestionBase, TextQuestion } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import BooleanQuestionInput from '../boolean/boolean_question_input.svelte';
	import TextQuestionInput from '../text/text_question_input.svelte';

	/*  type: QuestionType;
	    name: string;
      content: string;
      required?: boolean; */
	export let data = $$props as QuestionBase;
</script>

<!-- Copied From TextQuestionInput -->
<div>
	<fieldset>
		<legend>Question Title</legend>
		<input type="text" bind:value={data.content} placeholder="Question Title" />
	</fieldset>

	<fieldset>
		<legend>Internal Question</legend>
		<input type="text" bind:value={data.name} placeholder="Internal Question Name" />
	</fieldset>

	<fieldset>
		<legend>Question Required</legend>
		<input type="checkbox" bind:value={data.required} placeholder="Question Required" />
	</fieldset>

	<slot />
</div>

<style>
	div {
		background-color: #ffffff;
		/* border: blue 10px solid; */
		border-radius: 20px;
	}
	input {
		padding: 5px 10px;
		background-color: #ddd8d8;
		border-radius: 10px;
		border-width: 0;
		font-size: 11px;
	}
	input::placeholder {
		font-style: italic;
		color: #1f2024;
		opacity: 0.9;
		font-size: 11px;
	}
	input:focus {
		outline-width: 1px;
		outline-color: chocolate;
	}
</style>
