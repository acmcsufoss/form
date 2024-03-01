<script lang="ts">
	import type { AvailablityQuestion } from '$lib/form';

	export let data: AvailablityQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<div class="datetime-range">
		{#each Array.from({ length: data.maxDatetimeRanges ?? 1 }, (_, i) => i) as i}
			<div class="datetime-range-input">
				<input
					type="datetime-local"
					name="{data.name}-{i}-start"
					min={data.minStartDatetime}
					max={data.maxEndDatetime}
					value={data.value?.[i][0]}
				/>
				<!-- TODO: Convert break to hr tag. -->
				<p>----</p>
				<input
					type="datetime-local"
					name="{data.name}-{i}-end"
					min={data.minStartDatetime}
					max={data.maxEndDatetime}
					value={data.value?.[i][1]}
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
