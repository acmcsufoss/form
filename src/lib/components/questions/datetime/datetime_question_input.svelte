<script lang="ts">
	import type { DatetimeQuestion } from '$lib/form';

	const data = $$props as DatetimeQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="datetime-local"
		required={data.required}
		value={data.value}
		min={data.min}
		max={data.max}
	/>
</fieldset>
