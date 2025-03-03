<script lang="ts">
	import type { DateQuestion } from '$lib/form';

	export let data = $$props as DateQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="date"
		required={data.required}
		min={data.min}
		max={data.max}
		bind:value={data.value}
		disabled={data.disabled}
	/>
</fieldset>
