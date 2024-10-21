<script lang="ts">
	import type { BooleanQuestion } from '$lib/form';

	export var data = $$props as BooleanQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	{#if data.style === 'radio'}
		<input name={data.name} type="radio" required={data.required} value={data.value} />
	{:else}
		<input name={data.name} type="checkbox" required={data.required} value={data.value} />
	{/if}
</fieldset>
