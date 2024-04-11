<script lang="ts">
	import type { NumberQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import NumberQuestionInput from './number_question_input.svelte';
	export var data = $$props as NumberQuestion;
</script>

<BaseEditor bind:data>
	<!--Copied from number_question_input -->
	<fieldset>
		<legend>min</legend>
		<input type="number" bind:value={data.min} />
	</fieldset>
	<fieldset>
		<legend>max</legend>
		<input type="number" bind:value={data.max} />
	</fieldset>

	<fieldset>
		<legend>step</legend>
		<input type="number" bind:value={data.step} />
	</fieldset>

	<fieldset>
		<legend>Defualt value</legend>
		<input type="number" bind:value={data.value} />
	</fieldset>
	<fieldset>
		<legend>placeholder</legend>
		<input type="text" bind:value={data.placeholder} />
	</fieldset>
	<details>
		<summary>Sample</summary>
		<NumberQuestionInput bind:data />
	</details>
</BaseEditor>
