<script lang="ts">
	import type { AvailabilityQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import AvailabilityQuestionInput from './availability_question_input.svelte';

	export var data = $$props as AvailabilityQuestion;
</script>

<BaseEditor bind:data>
	<!-- Copied from datetime_question_input.svelte -->
	<fieldset>
		<legend>Enter Min Start Date Time</legend>
		<input
			name="form[questions][data][{data.position}][minStartDatetime]"
			type="datetime-local"
			bind:value={data.minStartDatetime}
			max={data.maxEndDatetime}
		/>
	</fieldset>
	<!-- Copied from datetime_question_input.svelte -->
	<fieldset>
		<legend>Enter Max End Date Time</legend>
		<input
			name="form[questions][data][{data.position}][maxEndDatetime]"
			type="datetime-local"
			bind:value={data.maxEndDatetime}
			min={data.minStartDatetime}
		/>
	</fieldset>
	<!-- Copied from number_question_input.svelte -->
	<fieldset>
		<legend>Enter Max Date Ranges</legend>
		<input
			name="form[questions][data][{data.position}][maxDatetimeRanges]"
			type="number"
			bind:value={data.maxDatetimeRanges}
		/>
	</fieldset>
	<!-- TODO: Make the avaibilityQuestion Input here be the default value for the sample -->
	<!-- <AvailabilityQuestionInput bind:data /> -->
	{#each Array.from({ length: data.maxDatetimeRanges ?? 1 }, (_, i) => i) as i}
		<!-- {@const { startValue, endValue } = {
		startValue: data.value?.[i][0],
		endValue: data.value?.[i][1]
	}} -->
		<!-- TODO: Fix reactivity -->
		<div class="datetime-range-input">
			<input
				type="datetime-local"
				name="form[questions][data][{data.position}][value][{i}]"
				min={data.minStartDatetime}
				max={data.maxEndDatetime}
				value={data.value?.[i][0]}
			/>
			<!-- TODO: Convert break to hr tag. -->
			<p>----</p>
			<input
				type="datetime-local"
				name="form[questions][data][{data.position}][value][{i}]"
				min={data.minStartDatetime}
				max={data.maxEndDatetime}
				value={data.value?.[i][1]}
			/>
		</div>
	{/each}
	<svelte:fragment slot="preview">
		<AvailabilityQuestionInput {data} />
	</svelte:fragment>
</BaseEditor>

<style>
	.datetime-range {
		display: flex;
		flex-direction: column;
	}

	.datetime-range-input {
		display: flex;
		flex-direction: row;
		padding: 2px 0px;
	}
</style>
