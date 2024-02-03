<script lang="ts">
	import type { TextareaQuestion } from '../form/form.js';
	import { QuestionType } from '../form/form.js';
	/**
	 * funct for adjusting height of text area
	 */
	let textarea_: HTMLTextAreaElement;
	const textAreaAdjustHeight = (): void => {
		textarea_.style.height = 'auto';
		textarea_.style.height = textarea_.scrollHeight + 'px';
	};

	// DEFUALT VALUES
	export let data: TextareaQuestion = {
		type: QuestionType.TEXTAREA,

		name: 'Text Area Question',

		content: 'text area?',

		required: false,

		minLength: 0,

		maxLength: 1000,

		placeholder: 'type here',

		default: ''
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<textarea
		bind:this={textarea_}
		on:input={textAreaAdjustHeight}
		name={data.name}
		maxlength={data.maxLength}
		minlength={data.minLength}
		placeholder={data.placeholder}
		required={data.required}
		bind:value={data.default}
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
