<script lang="ts">
	import { QuestionType } from '$lib/form';
	import AvailabilityQuestionInput from '$lib/components/questions/availability/availability_question_input.svelte';
	import BooleanQuestionInput from '$lib/components/questions/boolean/boolean_question_input.svelte';
	import ColorQuestionInput from '$lib/components/questions/color/color_question_input.svelte';
	import DateQuestionInput from '$lib/components/questions/date/date_question_input.svelte';
	import DatetimeQuestionInput from '$lib/components/questions/datetime/datetime_question_input.svelte';
	import NumberQuestionInput from '$lib/components/questions/number/number_question_input.svelte';
	import SingleTextSelectQuestionInput from '$lib/components/questions/radio_group/radio_group_question_input.svelte';
	import TextQuestionInput from '$lib/components/questions/text/text_question_input.svelte';
	import TextareaQuestionInput from '$lib/components/questions/textarea/textarea_question_input.svelte';
	import TimeQuestionInput from '$lib/components/questions/time/time_question_input.svelte';
	import SelectQuestionInput from '$lib/components/questions/select/select_question_input.svelte';
	import TimezoneQuestionInput from '../questions/timezone/timezone_question_input.svelte';
</script>

<div class="question">
	{#if $$props.type === QuestionType.BOOLEAN}
		<BooleanQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.TEXT}
		<TextQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.RADIO_GROUP}
		<SingleTextSelectQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.NUMBER}
		<NumberQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.COLOR}
		<ColorQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.TEXTAREA}
		<TextareaQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.DATE}
		<DateQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.AVAILABILITY}
		<AvailabilityQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.DATETIME}
		<DatetimeQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.TIME}
		<TimeQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.SELECT}
		<SelectQuestionInput {...$$props} />
	{:else if $$props.type === QuestionType.TIMEZONE}
		<TimezoneQuestionInput {...$$props} />
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
