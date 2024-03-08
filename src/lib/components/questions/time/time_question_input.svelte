<script lang="ts">
	import type { TimeQuestion } from '$lib/form';

	const data = $$props as TimeQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="time"
		required={data.required}
		value={data.value}
		min={data.min}
		max={data.max}
	/>
</fieldset>
