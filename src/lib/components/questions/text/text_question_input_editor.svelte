<script lang="ts">
	import BaseEditor from '../base/base_editor.svelte';
	import type { TextQuestion } from '$lib/form';
	import TextQuestionInput from './text_question_input.svelte';

	export var data = $$props as TextQuestion;
	/*var data: TextQuestion = {
		type: QuestionType.TEXT, //NA
		required: false, //base
		name: '', //base
		content: '', // base
		minLength: 0,
		maxLength: 100,
		value: '', //
		placeholder: '',
		pattern: '',
		choices: ['sample', 'default', 'should appear']
	};*/
</script>

<BaseEditor bind:data>
	<!-- Copied from BaseEditor -->
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
	<fieldset>
		<legend>Regex Pattern</legend>
		<input
			name="form[questions][data][{data.position}][pattern]"
			type="text"
			bind:value={data.pattern}
		/>
	</fieldset>
	<fieldset>
		<legend>Choices (COMMING SOON)</legend>
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<TextQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
