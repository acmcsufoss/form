<script lang="ts">
	import type { NumberQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import NumberQuestionInput from './number_question_input.svelte';
	export var data = $$props as NumberQuestion;
</script>

<BaseEditor bind:data>
	<input type="number" bind:value={data.min} />
	<input type="number" bind:value={data.max} />
	<input type="number" bind:value={data.step} />
	<input type="number" bind:value={data.value} />
	<input type="text" bind:value={data.placeholder} />
	<details>
		<summary>Sample</summary>
		<NumberQuestionInput bind:data />
	</details>
</BaseEditor>
