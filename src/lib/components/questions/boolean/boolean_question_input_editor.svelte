<script lang="ts">
	import type { QuestionType, BooleanQuestion, SelectQuestion } from '$lib/form';
	import BooleanQuestionInput from './boolean_question_input.svelte';
	import input from '../text/text_question_input.svelte';
	import TextareaQuestionInput from '../textarea/textarea_question_input.svelte';
	import SelectQuestionInput from '../select/select_question_input.svelte';
	import { drafts } from '$lib/stores/drafts/drafts';
	import BaseEditor from '../base/base_editor.svelte';
	export let data: BooleanQuestion;
	/* 
    type: QuestionType.BOOLEAN,
		name: 'internal name',
		content: 'Are you 18 years old?',
		required: false,
		style: 'checkbox',
		value: false */
	// var mySelect: SelectQuestion = {
	// 	type: QuestionType.SELECT,
	// options: [
	// 	{ content: 'checkbox', value: 'checkbox' },
	// 	{ content: 'radio', value: 'radio' }
	// ],
	// 	name: 'booleanStyleSelector',
	// 	content: 'Choose A Style'
	// };
</script>

<BaseEditor bind:data>
	<!-- <SelectQuestionInput
		name={'style'}
		content={'Choose a Style'}
		options={[
			{ content: 'checkbox', value: 'checkbox' },
			{ content: 'radio', value: 'radio' }
		]}
		bind:value={data.style}
	/> -->
	<fieldset>
		<legend>Choose a Style</legend>
		<select name={'style'} bind:value={data.style}>
			{#each [
				{ content: 'checkbox', value: 'checkbox' },
				{ content: 'radio', value: 'radio' }
			] as option}
				<option value={option.value}>{option.content}</option>
			{/each}
		</select>
	</fieldset>
	<details>
		<summary>Sample</summary>
		<div class="question">
			<BooleanQuestionInput bind:data />
		</div>
	</details>
</BaseEditor>
