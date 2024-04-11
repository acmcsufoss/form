<script lang="ts">
	import type { NumberQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import NumberQuestionInput from './number_question_input.svelte';
	export var data = $$props as NumberQuestion;
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>Min</legend>
		<input type="number" bind:value={data.min} />
	</fieldset>
	<fieldset>
		<legend>Max</legend>
		<input type="number" bind:value={data.max} />
	</fieldset>
	<fieldset>
		<legend>Step by</legend>
		<input type="number" bind:value={data.step} />
	</fieldset>
	<fieldset>
		<legend>Default Value</legend>
		<input type="number" bind:value={data.value} />
	</fieldset>
	<fieldset>
		<legend>Placeholder</legend>
		<input type="number" bind:value={data.placeholder} />
	</fieldset>
	<details>
		<summary>Sample</summary>
		<NumberQuestionInput bind:data />
	</details>
</BaseEditor>
