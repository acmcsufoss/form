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
		<input name="form[questions][data][{data.position}][min]" type="number" bind:value={data.min} />
	</fieldset>
	<fieldset>
		<legend>max</legend>
		<input name="form[questions][data][{data.position}][max]" type="number" bind:value={data.max} />
	</fieldset>

	<fieldset>
		<legend>step</legend>
		<input
			name="form[questions][data][{data.position}][step]"
			type="number"
			bind:value={data.step}
		/>
	</fieldset>

	<fieldset>
		<legend>Defualt value</legend>
		<input
			name="form[questions][data][{data.position}][value]"
			type="number"
			bind:value={data.value}
		/>
	</fieldset>
	<fieldset>
		<legend>placeholder</legend>
		<input
			name="form[questions][data][{data.position}][placeholder]"
			type="text"
			bind:value={data.placeholder}
		/>
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<NumberQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
