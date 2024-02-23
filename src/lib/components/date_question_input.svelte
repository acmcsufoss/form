<script lang="ts">
	import type { DateQuestion } from '$lib/form';

	export let data: DateQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="date"
		required={data.required}
		min={data.min}
		max={data.max}
		value={data.value}
	/>
</fieldset>
