<script lang="ts">
	import type { TextQuestion } from '../form/form.js';
	import { QuestionType } from '../form/form.js';
	export let data: TextQuestion = {
		type: QuestionType.TEXT,

		name: 'TextQuestion Question',

		content: 'Text?',

		required: false,

		minLength: 0,

		maxLength: 100,

		default: '',

		placeholder: 'type here',

		pattern: ''
	};
</script>


<fieldset>
	<legend>{data.content}</legend>
<input
	name={data.name}
	type="text"
	max={data.maxLength}
	min={data.minLength}
	placeholder={data.placeholder}
	bind:value={data.default}
	pattern={data.pattern}
/>
</fieldset>
<style>
	input {
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
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
