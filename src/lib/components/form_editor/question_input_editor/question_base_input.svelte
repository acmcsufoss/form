<script lang="ts">
	import type { QuestionBase } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import QuestionInput from '$lib/components/question_input/question_input.svelte';

	export let value: QuestionBase;
</script>

<input type="hidden" name="type" value={value.type} />

<QuestionInput
	type={QuestionType.TEXT}
	name="name"
	content="The unique identifier for the question."
	bind:value={value.name}
/>

<QuestionInput
	type={QuestionType.TEXTAREA}
	name="content"
	content="The markdown question content for the form field."
	bind:value={value.content}
/>

<QuestionInput
	type={QuestionType.BOOLEAN}
	name="required"
	content="Whether or not the form field is required."
	bind:value={value.required}
/>
