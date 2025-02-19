<script lang="ts">
	import type { BooleanQuestion } from '$lib/form';
	import BooleanQuestionInput from './boolean_question_input.svelte';
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
	<fieldset>
		<legend>Choose a Style</legend>
		<select name={'style'} bind:value={data.style}>
			{#each [{ content: 'checkbox', value: 'checkbox' }, { content: 'radio', value: 'radio' }] as option}
				<option value={option.value}>{option.content}</option>
			{/each}
		</select>
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<BooleanQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
