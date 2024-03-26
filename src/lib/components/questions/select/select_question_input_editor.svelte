<script lang="ts">
	import type { SelectQuestion } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import BooleanQuestionInput from '../boolean/boolean_question_input.svelte';
	import TextQuestionInput from '../text/text_question_input.svelte';
	import SelectQuestionInput from './select_question_input.svelte';

	var newOption: string = '';

	export var data = $$props as SelectQuestion;

	// let other: TextQuestion = {
	// 	type: QuestionType.TEXT,
	// 	name: 'OOP',
	// 	content: newOption
	// };

	function removeOption(option: unknown) {
		var index = (data.options as unknown[]).indexOf(option);
		if (index > -1) {
			data.options.splice(index, 1);
			data.options = data.options;
		}
	}

	function addOptions() {
		if (/^.+$/.test(newOption)) {
			if (data.options.includes({ value: newOption, content: newOption })) {
				console.log('Key / value already exists for this value!');
				return;
			} else {
				// KV does not exist
				data.options.push({ value: newOption, content: newOption });
				data.options = data.options;
				newOption = '';
			}
		}
	}
</script>

<input bind:value={data.content}/>
<TextQuestionInput value={data.content} content="Question Title" placeholder="Question Title" />
<TextQuestionInput
	content="Internal Question Name"
	value={data.name}
	placeholder="Internal Question Name"
/>
<BooleanQuestionInput value={data.required} content="Required" />
<form on:submit|preventDefault={addOptions}>
	<input type="text" bind:value={newOption} /><button type="submit">➕</button>
</form>

{#each data.options as option (option.content)}
	<p><button on:click={() => removeOption(option)}>🗑️</button>{option.content}</p>
{/each}

<SelectQuestionInput data={data} />


