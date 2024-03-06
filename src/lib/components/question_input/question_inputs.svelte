<script lang="ts">
	import type { Question } from '$lib/form';
	import QuestionInput from './question_input.svelte';

	export const data: Question[] = [];
</script>

{#each data as question (question.name)}
	<QuestionInput {...question} />
{:else}
	<slot />
{/each}
