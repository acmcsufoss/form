<script lang="ts">
	import type { Question } from '$lib/form';
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

	export let data: Question;
</script>

<div class="question">
	{#if data.type === QuestionType.BOOLEAN}
		<BooleanQuestionInput {data} />
	{:else if data.type === QuestionType.TEXT}
		<TextQuestionInput {data} />
	{:else if data.type === QuestionType.SINGLE_TEXT_SELECT}
		<SingleTextSelectQuestionInput {data} />
	{:else if data.type === QuestionType.NUMBER}
		<NumberQuestionInput {data} />
	{:else if data.type === QuestionType.COLOR}
		<ColorQuestionInput {data} />
	{:else if data.type === QuestionType.TEXTAREA}
		<TextareaQuestionInput {data} />
	{:else if data.type === QuestionType.DATE}
		<DateQuestionInput {data} />
	{:else if data.type === QuestionType.AVAILABILITY}
		<AvailabilityQuestionInput {data} />
	{:else if data.type === QuestionType.DATETIME}
		<DatetimeQuestionImput {data} />
	{:else if data.type === QuestionType.TIME}
		<TimeQuestionInput {data} />
	{/if}
</div>

<style>
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
</style>
