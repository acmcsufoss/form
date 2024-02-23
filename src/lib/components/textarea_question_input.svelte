<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { TextareaQuestion } from '$lib/form';

	export let data: TextareaQuestion;

	// Progressive enhancement for adjusting height of textarea.
	// https://svelte.dev/docs/svelte-action
	const adjustTextareaHeight: Action = (node: HTMLElement) => {
		function handleInput() {
			node.style.height = 'auto';
			node.style.height = node.scrollHeight + 'px';
		}

		node.addEventListener('input', handleInput);

		return {
			destroy() {
				node.removeEventListener('input', handleInput);
			}
		};
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<textarea
		use:adjustTextareaHeight
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
