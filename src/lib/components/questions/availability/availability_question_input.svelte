<script lang="ts">
	import type { AvailabilityQuestion } from '$lib/form';

	export let data = $$props as AvailabilityQuestion;
	// Computed Logic to precompute data ranges array.
</script>

<fieldset>
	<legend>{data.content}</legend>
	<div class="datetime-range">
		{#each Array.from({ length: data.maxDatetimeRanges ?? 1 }, (_, i) => i) as i}
			<!-- {@const { startValue, endValue } = {
				startValue: data.value?.[i][0],
				endValue: data.value?.[i][1]
			}} -->
			<div class="datetime-range-input">
				<input
					type="datetime-local"
					name="datetime-range{i}[]"
					min={data.minStartDatetime}
					max={data.maxEndDatetime}
					value={data.value?.[i][0]}
					disabled={data.disabled}
				/>
				<!-- TODO: Convert break to hr tag. -->
				<p>----</p>
				<input
					type="datetime-local"
					name="datetime-range{i}[]"
					min={data.minStartDatetime}
					max={data.maxEndDatetime}
					value={data.value?.[i][1]}
					disabled={data.disabled}
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
