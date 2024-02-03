<script lang="ts">
	import type { SingleTextSelectQuestion } from '../form/form.js';
	import { QuestionType } from '../form/form.js';
	export let data: SingleTextSelectQuestion = {
		type: QuestionType.SINGLE_TEXT_SELECT,

		name: 'SingleTextSelect Question',

		content: 'Select One',

		required: false,

		choices: ['red', 'green', 'blue'],

		customChoice: true,

		defaultChoiceIndex: 0,

		defaultCustomChoice: ''
	};
</script>

<fieldset>
	<legend>{data.content}</legend>
	<!-- TODO: Create functionality for defualt choice and custom choice -->
	{#each data.choices as choice}
		<div class="choice">
			<input type="radio" required={data.required} name={data.name} id={choice} />
			<label for={choice}>{choice}</label>
		</div>
	{/each}
</fieldset>

<style>
	.choice {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10px;
	}
	.choice input {
		margin-right: 5px;
		appearance: none;
		background-color: #ddd8d8;
		border-radius: 50%;
		width: 17px;
		height: 17px;
	}
	.choice input:checked {
		background-color: #1f2024;
		border-radius: 50%;
		border: 3px solid #04a2ff;
	}
	.choice label {
		margin: 0;
		font-size: 11px;
	}
</style>
