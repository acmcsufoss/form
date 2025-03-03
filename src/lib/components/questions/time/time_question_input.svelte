<script lang="ts">
	import type { TimeQuestion } from '$lib/form';

	export let data = $$props as TimeQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="time"
		required={data.required}
		bind:value={data.value}
		min={data.min}
		max={data.max}
		disabled={data.disabled}
	/>
</fieldset>
