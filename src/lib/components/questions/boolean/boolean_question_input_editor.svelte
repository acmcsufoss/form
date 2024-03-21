<script lang="ts">
	import { QuestionType, type BooleanQuestion, type SelectQuestion } from '$lib/form';
	import BooleanQuestionInput from './boolean_question_input.svelte';
	import TextQuestionInput from '../text/text_question_input.svelte';
	import TextareaQuestionInput from '../textarea/textarea_question_input.svelte';
	import SelectQuestionInput from '../select/select_question_input.svelte';
	import { drafts } from '$lib/stores/drafts/drafts';
	const data = $$props as BooleanQuestion;

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

<TextQuestionInput
	bind:value={data.content}
	content="Question Title"
	placeholder="Question Title"
/>
<TextQuestionInput
	content="Internal Question Name"
	bind:value={data.name}
	placeholder="Internal Question Name"
/>
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
	<BooleanQuestionInput {...data} />
</details>
