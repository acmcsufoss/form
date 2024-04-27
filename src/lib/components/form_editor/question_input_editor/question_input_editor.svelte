<script lang="ts">
	import { QuestionType } from '$lib/form';
	import AvailabilityQuestionInputEditor from '$lib/components/questions/availability/availability_question_input_editor.svelte';
	import BooleanQuestionInputEditor from '$lib/components/questions/boolean/boolean_question_input_editor.svelte';
	import ColorQuestionInputEditor from '$lib/components/questions/color/color_question_input_editor.svelte';
	import DateQuestionInputEditor from '$lib/components/questions/date/date_question_input_editor.svelte';
	import DatetimeQuestionInputEditor from '$lib/components/questions/datetime/datetime_question_input_editor.svelte';
	import NumberQuestionInputEditor from '$lib/components/questions/number/number_question_input_editor.svelte';
	import RadioGroupQuestionInputEditor from '$lib/components/questions/radio_group/radio_group_question_input_editor.svelte';
	import SelectQuestionInputEditor from '$lib/components/questions/select/select_question_input_editor.svelte';
	import TextQuestionInputEditor from '$lib/components/questions/text/text_question_input_editor.svelte';
	import TextareaQuestionInputEditor from '$lib/components/questions/textarea/textarea_question_input_editor.svelte';
	import TimeQuestionInputEditor from '$lib/components/questions/time/time_question_input_editor.svelte';
	import BooleanQuestionInput from '$lib/components/questions/boolean/boolean_question_input.svelte';

	export var data: any;
</script>

<!-- TODO: Reconcile changes made in
https://github.com/acmcsufoss/form/pull/new/question-input-editor -->

<!-- TODO: Make a new PR out of this current branch. -->

<!-- Uncomment finished questions to see if it renders -->
<div>
	{#if data.type === QuestionType.BOOLEAN}
		<BooleanQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.COLOR}
		<ColorQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.NUMBER}
		<NumberQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.TEXT}
		<TextQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.TEXTAREA}
		<TextareaQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.DATE}
		<DateQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.DATETIME}
		<DatetimeQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.TIME}
		<TimeQuestionInputEditor bind:data />
		<!-- 
	{:else if data.type === QuestionType.RADIO_GROUP}
		<RadioGroupQuestionInputEditor bind:data />
	 -->
	{:else if data.type === QuestionType.AVAILABILITY}
		<AvailabilityQuestionInputEditor bind:data />
	{:else if data.type === QuestionType.SELECT}
		<SelectQuestionInputEditor bind:data />
	{/if}
</div>

<style>
</style>
