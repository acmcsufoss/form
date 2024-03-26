<script lang="ts">
	import { QuestionType, type BooleanQuestion, type SelectQuestion } from '$lib/form';
	import BooleanQuestionInput from './boolean_question_input.svelte';
	import input from '../text/text_question_input.svelte';
	import TextareaQuestionInput from '../textarea/textarea_question_input.svelte';
	import SelectQuestionInput from '../select/select_question_input.svelte';
	import { drafts } from '$lib/stores/drafts/drafts';
	export var data = $$props as BooleanQuestion;

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

<input bind:value={data.content} name="temp" placeholder="Question Title" />
<input bind:value={data.name} placeholder="Internal Question Name" />
<SelectQuestionInput
	name={'style'}
	content={'Choose a Style'}
	options={[
		{ content: 'checkbox', value: 'checkbox' },
		{ content: 'radio', value: 'radio' }
	]}
	bind:value={data.style}
/>
<BooleanQuestionInput bind:value={data.required} content="Required" />
<details>
	<summary>Sample</summary>
	<BooleanQuestionInput bind:data />
</details>
