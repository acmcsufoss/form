<script lang="ts">
	import type { TextareaQuestion } from '$lib/form';
	import { adjustableTextareaHeight } from './adjustable_textarea_height';

	export let data = $$props as TextareaQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<textarea
		use:adjustableTextareaHeight
		name={data.name}
		maxlength={data.maxLength}
		minlength={data.minLength}
		placeholder={data.placeholder}
		required={data.required}
		value={data.value}
	/>
</fieldset>

<style>
	textarea {
		max-width: 100%;
		width: 100%;
		box-sizing: border-box;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #ddd8d8;
		border-radius: 10px;
		border-width: 0;
		font-size: 11px;
	}
	textarea::placeholder {
		font-style: italic;
		color: #1f2024;
		font-size: 11px;
	}
	textarea:focus {
		outline-width: 1px;
		outline-color: chocolate;
	}
</style>
