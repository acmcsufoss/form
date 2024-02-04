<script lang="ts">
	import type { AvailablityQuestion, AvailabilityQuestionValue } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';
	import type { Timestamp } from '$lib/form/form';
	export let data: AvailablityQuestion = {
		type: QuestionType.AVAILABILITY,

		name: 'Availability Question',

		required: false,

		content: 'choose',

		maxDateRanges: 5,

		maxEndDatetime: 0
	};
	let input_value: AvailabilityQuestionValue = {
		name: data.name,

		type: QuestionType.AVAILABILITY,
		
		value: data.default || Array.from({ length: data.maxDateRanges }, () => [0, 0])
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<div class="datetime-range">
		{#each Array(data.maxDateRanges) as _, i}
			<div class="datetime-range-input">
				<input
					type="datetime-local"
					name={'start' + i}
					min={data.minStartDatetime}
					max={input_value.value[i][1] !== undefined ? input_value.value[i][1] : data.maxEndDatetime}
					bind:value={input_value.value[i][0]}
				/>
				<p>----</p>
				<input
					type="datetime-local"
					name={'end' + i}
					min={input_value.value[i][0] !== undefined ? input_value.value[i][0] : data.minStartDatetime}
					max={data.maxEndDatetime}
					bind:value={input_value.value[i][1]}
				/>
			</div>
		{/each}
	</div>
</fieldset>

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
