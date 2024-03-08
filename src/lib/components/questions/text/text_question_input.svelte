<script lang="ts">
	import type { TextQuestion } from '$lib/form';

	const data = $$props as TextQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input
		name={data.name}
		type="text"
		max={data.maxLength}
		min={data.minLength}
		placeholder={data.placeholder}
		bind:value={data.value}
		pattern={data.pattern}
	/>
</fieldset>

<style>
	input {
		padding: 5px 10px;
		background-color: #ddd8d8;
		border-radius: 10px;
		border-width: 0;
		font-size: 11px;
	}
	input::placeholder {
		font-style: italic;
		color: #1f2024;
		opacity: 0.9;
		font-size: 11px;
	}
	input:focus {
		outline-width: 1px;
		outline-color: chocolate;
	}
</style>
