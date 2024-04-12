<script lang="ts">
	import type { TimeQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import TimeQuestionInput from './time_question_input.svelte';

	export let data = $$props as TimeQuestion;
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>Min Time</legend>
		<input type="time" bind:value={data.min} />
	</fieldset>
	<fieldset>
		<legend>Max Time</legend>
		<input type="time" bind:value={data.max} />
	</fieldset>
	<fieldset>
		<legend>Default Time</legend>
		<input type="time" bind:value={data.value} />
	</fieldset>
	<details>
		<summary>Sample</summary>
		<div class="question">
			<TimeQuestionInput bind:data />
		</div>
	</details>
</BaseEditor>
