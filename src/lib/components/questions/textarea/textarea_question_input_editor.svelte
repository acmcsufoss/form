<script lang="ts">
	import type { TextareaQuestion } from '$lib/form';
	import BaseEditor from '../base/base_editor.svelte';
	import TextareaQuestionInput from './textarea_question_input.svelte';

	export var data = $$props as TextareaQuestion;
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>Min Length</legend>
		<input type="number" bind:value={data.minLength} />
	</fieldset>
	<fieldset>
		<legend>Max Length</legend>
		<input type="number" bind:value={data.maxLength} />
	</fieldset>
	<fieldset>
		<legend>Default Value</legend>
		<input type="text" bind:value={data.value} />
	</fieldset>
	<fieldset>
		<legend>Placeholder</legend>
		<input type="text" bind:value={data.placeholder} />
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<TextareaQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
