<script lang="ts">
	import type { NumberQuestion } from '$lib/form';

	const data = $$props as NumberQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="number"
		required={data.required}
		min={data.min}
		max={data.max}
		bind:value={data.value}
		placeholder={data.placeholder}
		step={data.step}
	/>
</fieldset>
