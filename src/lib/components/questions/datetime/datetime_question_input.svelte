<script lang="ts">
	import type { DatetimeQuestion } from '$lib/form';

	export let data = $$props as DatetimeQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="datetime-local"
		required={data.required}
		bind:value={data.value}
		min={data.min}
		max={data.max}
		disabled={data.disabled}
	/>
</fieldset>
