<script lang="ts">
	import type { BooleanQuestion } from '$lib/form';

	export var data = $$props as BooleanQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	{#if data.style === 'radio'}
		<input
			name={data.name}
			type="radio"
			required={data.required}
			value={data.value}
			disabled={data.disabled}
		/>
	{:else}
		<input
			name={data.name}
			type="checkbox"
			required={data.required}
			bind:checked={data.value}
			value={data.value ? 'true' : 'false'}
			disabled={data.disabled}
		/>
	{/if}
</fieldset>
