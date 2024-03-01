<script lang="ts">
	import type { Question } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import AvailabilityQuestionInput from '$lib/components/form/questions/availability/availability_question_input.svelte';
	import BooleanQuestionInput from '$lib/components/form/questions/boolean/boolean_question_input.svelte';
	import ColorQuestionInput from '$lib/components/form/questions/color/color_question_input.svelte';
	import DateQuestionInput from '$lib/components/form/questions/date/date_question_input.svelte';
	import DatetimeQuestionImput from '$lib/components/form/questions/datetime/datetime_question_imput.svelte';
	import NumberQuestionInput from '$lib/components/form/questions/number/number_question_input.svelte';
	import RadioGroupQuestionInput from '$lib/components/form/questions/radio_group/radio_group_question_input.svelte';
	import TextQuestionInput from '$lib/components/form/questions/text/text_question_input.svelte';
	import TextareaQuestionInput from '$lib/components/form/questions/textarea/textarea_question_input.svelte';
	import TimeQuestionInput from '$lib/components/form/questions/time/time_question_input.svelte';
	import SelectQuestionInput from '$lib/components/form/questions/select/select_question_input.svelte';
	import TimezoneQuestionInput from '$lib/components/form/questions/timezone/timezone_question_input.svelte';

	export let data: Question;
</script>

<div class="question">
	{#if data.type === QuestionType.BOOLEAN}
		<BooleanQuestionInput {data} />
	{:else if data.type === QuestionType.TEXT}
		<TextQuestionInput {data} />
	{:else if data.type === QuestionType.RADIO_GROUP}
		<RadioGroupQuestionInput {data} />
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
	{:else if data.type === QuestionType.SELECT}
		<SelectQuestionInput {data} />
	{:else if data.type === QuestionType.TIMEZONE}
		<TimezoneQuestionInput {data} />
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
