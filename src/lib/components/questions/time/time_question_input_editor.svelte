<script lang="ts">
	import type { TimeQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import TimeQuestionInput from './time_question_input.svelte';

	export let data = $$props as TimeQuestion;
</script>

<!-- TODO: Fix time, Its min and max are just not working right now -->
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
		<input type="time" bind:value={data.value} min={data.min} max={data.max} />
	</fieldset>
	<details>
		<summary>Sample</summary>
		<div class="question">
			<TimeQuestionInput bind:data />
		</div>
	</details>
</BaseEditor>
