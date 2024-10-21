<script lang="ts">
	import type { SelectQuestion } from '$lib/form';

	export var data = $$props as SelectQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<select name={data.name} required={data.required} bind:value={data.value}>
		{#each data.options as option}
			<option value={option.value}>{option.content}</option>
		{/each}
	</select>
</fieldset>
