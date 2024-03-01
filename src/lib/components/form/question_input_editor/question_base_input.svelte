<script lang="ts">
	import type { QuestionBase } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import QuestionInput from '$lib/components/form/question_input/question_input.svelte';

	export let value: QuestionBase;
</script>

<input type="hidden" name="type" value={value.type} />

<QuestionInput
	data={{
		type: QuestionType.TEXT,
		name: 'Name',
		content: 'The unique identifier for the question.',
		value: value.name
	}}
/>

<QuestionInput
	data={{
		type: QuestionType.TEXTAREA,
		name: 'Content',
		content: 'The markdown question content for the form field.',
		value: value.content
	}}
/>

<QuestionInput
	data={{
		type: QuestionType.BOOLEAN,
		name: 'Required',
		content: 'Whether or not the form field is required.',
		value: value.required
	}}
/>
