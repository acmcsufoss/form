<script lang="ts">
	import type { AvailablityQuestion, AvailabilityQuestionValue } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';

	export let data: AvailablityQuestion = {
		type: QuestionType.AVAILABILITY,

		name: 'Availability Question',

		required: false,

		content: 'choose',

		maxDateRanges: 5,

		maxEndDatetime: 0
	};

	let startTimes = Array(data.maxDateRanges).fill('');
	let endTimes = Array(data.maxDateRanges).fill('');
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
					max={endTimes[i] !== '' ? endTimes[i] : data.maxEndDatetime}
					bind:value={startTimes[i]}
				/>
				<p>----</p>
				<input
					type="datetime-local"
					name={'end' + i}
					min={startTimes[i] !== '' ? startTimes[i] : data.minStartDatetime}
					max={data.maxEndDatetime}
					bind:value={endTimes[i]}
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
