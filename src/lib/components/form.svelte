<script lang="ts">
	import type { User, Form } from '$lib/store';
	import { QuestionType } from '$lib/form';
	import AvailabilityQuestionInput from './availability_question_input.svelte';
	import BooleanQuestionInput from './boolean_question_input.svelte';
	import ColorQuestionInput from './color_question_input.svelte';
	import DateQuestionInput from './date_question_input.svelte';
	import DatetimeQuestionImput from './datetime_question_imput.svelte';
	import NumberQuestionInput from './number_question_input.svelte';
	import SingleTextSelectQuestionInput from './single_text_select_question_input.svelte';
	import TextQuestionInput from './text_question_input.svelte';
	import TextareaQuestionInput from './textarea_question_input.svelte';
	import TimeQuestionInput from './time_question_input.svelte';

	export let action: string;
	export let method: string;
	export let data: Form;
	export let user: User;

	if (data.questions.shuffled) {
		data.questions.data = data.questions.data.sort(() => Math.random() - 0.5);
	}
</script>

<form {action} {method}>
	<div class="form-header">
		<h1>{data.title}</h1>
		<p class="form-description">{data.description}</p>
		<hr />
		<div class="form-information">
			<p>Account: {user.discordUsername}</p>
			{#if data.schedule?.startDatetime}
				<p>Opened at: {data.schedule?.startDatetime}</p>
			{/if}
			{#if data.schedule?.endDatetime}
				<p>Opened until: {data.schedule?.endDatetime}</p>
			{/if}
		</div>
	</div>
	{#each data.questions.data as question}
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

	<button type="submit">Submit</button>
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

	hr {
		margin: 0;
		margin-left: -15px;
		width: 100%;
		padding: 0px 15px;
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

	:global(.Question-Header) {
		font-size: 13px;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: 'Poppins';
	}

	:global(label) {
		display: flex;
	}

	:global(input) {
		display: flex;
	}
</style>
