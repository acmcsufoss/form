<script lang="ts">
	import type { ColorQuestion } from '$lib/form';

	export let data = $$props as ColorQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="color"
		required={data.required}
		bind:value={data.value}
		disabled={data.disabled}
	/>
</fieldset>
