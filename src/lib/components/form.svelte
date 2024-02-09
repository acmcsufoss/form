<script lang="ts">
	import type {
		Form,
		QuestionList,
		// Question,
		TextQuestion,
		TextareaQuestion,
		BooleanQuestion,
		ColorQuestion,
		SingleTextSelectQuestion,
		NumberQuestion,
		TimeQuestion,
		DateQuestion,
		DatetimeQuestion,
		AvailablityQuestion
	} from '$lib/form';
	import { QuestionType } from '$lib/form';
	import BooleanQuestionInput from './boolean_question_input.svelte';
	import TextQuestionInput from './text_question_input.svelte';
	import SingleTextSelectQuestionInput from './single_text_select_question_input.svelte';
	import ColorQuestionInput from './color_question_input.svelte';
	import NumberQuestionInput from './number_question_input.svelte';
	// import TextAreaInput from './textarea_question_input.svelte';
	import TextareaQuestionInput from './textarea_question_input.svelte';
	import DateQuestionInput from './date_question_input.svelte';
	import AvailabilityQuestionInput from './availability_question_input.svelte';
	import DatetimeQuestionImput from './datetime_question_imput.svelte';
	import TimeQuestionInput from './time_question_input.svelte';
	// Placeholder for now before we start importing actual data

	let question_1: BooleanQuestion = {
		type: QuestionType.BOOLEAN,

		name: 'Age Check',

		content: 'Are you over 18 years old?',

		required: false,

		value: true,

		style: 'checkbox'
	};
	let question_2: TextQuestion = {
		type: QuestionType.TEXT,

		name: 'FRQ',

		content: 'How do you feel about this form?',

		required: false,

		value: 'Sample Text'
	};
	let question_3: SingleTextSelectQuestion = {
		type: QuestionType.SINGLE_TEXT_SELECT,

		name: 'multiple choice',

		content: 'please pick one',

		required: true,

		allowCustomChoice: true,

		choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],

		choiceIndex: -1
	};
	let question_4: ColorQuestion = {
		type: QuestionType.COLOR,

		name: 'Color Question',

		content: 'Pick a color',

		required: false,

		value: '#000000'
	};
	let question_5: NumberQuestion = {
		type: QuestionType.NUMBER,

		name: 'Number Question',

		content: 'Pick a number',

		required: true,

		min: 0,

		max: 100,

		placeholder: 'select a number'
	};
	let question_6: TextareaQuestion = {
		type: QuestionType.TEXTAREA,

		name: 'Text Area Question',

		content: 'text area?',

		required: true,

		minLength: 0,

		maxLength: 1000,

		placeholder: 'write here',

		value: ''
	};

	let question_7: TimeQuestion = {
		type: QuestionType.TIME,

		name: 'Time Question',

		content: 'What Time is it?',

		required: true,

		min: 0,

		max: 0,

		value: 0.0
	};

	let question_8: DateQuestion = {
		type: QuestionType.DATE,

		name: 'Date Question',

		content: 'What is the current date?',

		required: false,

		min: 0,

		max: 0,

		value: 0.0
	};

	let question_9: DatetimeQuestion = {
		type: QuestionType.DATETIME,

		name: 'Datetime Question',

		content: 'What is the current date and time?',

		required: false,

		min: 0,

		max: 0,

		value: 0.0
	};
	let question_10: AvailablityQuestion = {
		type: QuestionType.AVAILABILITY,

		name: 'Datetime Question',

		content: 'When are you availabile?',

		required: false,

		maxDateRanges: 5
	};
	let questionList: QuestionList = {
		data: [
			question_1,
			question_2,
			question_3,
			question_4,
			question_5,
			question_6,
			question_7,
			question_8,
			question_9,
			question_10
		],

		shuffled: false
	};

	let currentForm: Form = {
		id: '20',

		questions: questionList
	};
</script>

<form action="">
	<div class="form-header">
		<h1>form</h1>
		<p class="form-description">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<hr />
		<div class="form-information">
			<p>Account:</p>
			<p>Name:</p>
			<p>Date:</p>
		</div>
	</div>
	{#each questionList.data as question}
		<div class="question">
			{#if question.type === QuestionType.BOOLEAN}
				<BooleanQuestionInput data={question} />
			{:else if question.type === QuestionType.TEXT}
				<TextQuestionInput data={question} />
			{:else if question.type === QuestionType.SINGLE_TEXT_SELECT}
				<SingleTextSelectQuestionInput data={question} />
			{:else if question.type === QuestionType.NUMBER}
				<NumberQuestionInput data={question} />
			{:else if question.type === QuestionType.COLOR}
				<ColorQuestionInput data={question} />
			{:else if question.type === QuestionType.TEXTAREA}
				<TextareaQuestionInput data={question} />
			{:else if question.type === QuestionType.DATE}
				<DateQuestionInput data={question} />
			{:else if question.type === QuestionType.AVAILABILITY}
				<AvailabilityQuestionInput data={question} />
			{:else if question.type === QuestionType.DATETIME}
				<DatetimeQuestionImput data={question} />
			{:else if question.type === QuestionType.TIME}
				<TimeQuestionInput data={question} />
			{/if}
		</div>
	{/each}
	<input type="hidden" value={currentForm.id} />
	<input type="submit" value="Sumbit" />
</form>

<!-- 
    TO DO: 
    Create Components for each question type.
    create type script function to render the form to where each question is rendered based on its type. 
    style the form

-->

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
	/* uncomment the global to see css components */
	
    /* :global(*) {
        border-style: dotted;
        border-color: red;
    } */

	:global(*) {
		font-family: 'Poppins';
		font-size: 11px;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 400px;
	}
	hr {
		margin: 0;
		margin-left: -15px;
		width: 100%;
		padding: 0px 15px;
	}
	:global(fieldset) {
		border: none;
		min-width: 0;
		margin: 0px;
		padding: 0px;
		max-width: 100%;
		width: 100%;
		display: block;
	}
	:global(legend) {
		font-size: 13px;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: 'Poppins';
	}
	.form-header {
		padding: 15px 15px;
		width: calc(100% - 30px);
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		border-top: 7px solid #04a2ff;
	}
	.form-description {
		padding-bottom: 7px;
	}
	.form-information {
		padding-top: 7px;
	}
	h1 {
		margin: 0;
		text-align: left;
		font-size: 28px;
		font-weight: 600;
	}
	p {
		margin: 0;
		text-align: left;
		font-size: 11px;
		font-weight: 400;
	}
	.question {
		padding: 20px 15px;
		width: calc(100% - 30px);
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		border-color: #c5c8c9;
		border-width: 0;
		border-style: solid;
	}
	:global(label) {
		display: flex;
	}
	:global(input) {
		display: flex;
	}
</style>
