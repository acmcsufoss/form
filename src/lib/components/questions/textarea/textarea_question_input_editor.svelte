<script lang="ts">
	import type { TextareaQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import TextareaQuestionInput from './textarea_question_input.svelte';

	export var data = $$props as TextareaQuestion;
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>Min Length</legend>
		<input
			name="form[questions][data][{data.position}][minLength]"
			type="number"
			bind:value={data.minLength}
		/>
	</fieldset>
	<fieldset>
		<legend>Max Length</legend>
		<input
			name="form[questions][data][{data.position}][maxLength]"
			type="number"
			bind:value={data.maxLength}
		/>
	</fieldset>
	<fieldset>
		<legend>Default Value</legend>
		<input
			name="form[questions][data][{data.position}][value]"
			type="text"
			bind:value={data.value}
		/>
	</fieldset>
	<fieldset>
		<legend>Placeholder</legend>
		<input
			name="form[questions][data][{data.position}][placeholder]"
			type="text"
			bind:value={data.placeholder}
		/>
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<TextareaQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
