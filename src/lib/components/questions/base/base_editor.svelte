<script lang="ts">
	import type { QuestionBase } from '$lib/form';
	import BooleanQuestionInput from '../boolean/boolean_question_input.svelte';
	/*  type: QuestionType;
	    name: string;
      content: string;
      required?: boolean; */
	export let data = $$props as QuestionBase;
</script>

<input type="text" bind:value={data.content} placeholder="Question Title" />
<input type="text" bind:value={data.name} placeholder="Internal Question Name" />
<input type="checkbox" bind:value={data.required} placeholder="Question Required" />
<slot />
