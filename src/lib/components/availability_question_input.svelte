<script lang="ts">
	import type { AvailablityQuestion } from '$lib/form';

	export let data: AvailablityQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<div class="datetime-range">
	{#each Array(data.maxDateRanges) as _, i}
		<div class="datetime-range-input">
			<input
				type="datetime-local"
				name={'start' + i}
				min={data.minStartDate}
				max={data.maxEndDate}
			/>
			<p>----</p>
			<input type="datetime-local" name={'end' + i} min={data.minStartDate} max={data.maxEndDate} />
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
