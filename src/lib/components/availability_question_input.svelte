<script lang="ts">
	import type { AvailablityQuestion } from '$lib/form/form';
	import { QuestionType } from '$lib/form/form';

	export let data: AvailablityQuestion = {
		type: QuestionType.AVAILABILITY,

		name: 'Availability Question',

		required: false,

		content: 'choose',

		minStartDatetime: 0,

		maxDateRanges: 5,

		maxEndDatetime: 0
	};
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<div class="datetime-range">
	{#each Array(data.maxDateRanges) as _, i}
		<div class="datetime-range-input">
			<input
				type="datetime-local"
				name={'start' + i}
				min={data.minStartDatetime}
				max={data.maxEndDatetime}
			/>
			<p>----</p>
			<input
				type="datetime-local"
				name={'end' + i}
				min={data.minStartDatetime}
				max={data.maxEndDatetime}
			/>
		</div>
	{/each}
</div>

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
