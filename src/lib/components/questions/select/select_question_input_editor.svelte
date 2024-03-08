<script lang="ts">
	import type { SelectQuestion } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import SelectQuestionInput from './select_question_input.svelte';

	var newOption: string = '';

	let data: SelectQuestion = {
		type: QuestionType.SELECT,
		options: [
			{ value: '55', content: 'Apple' },
			{ value: '66', content: 'Bananna' }
		],
		name: '',
		content: ''
	};

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

<form on:submit|preventDefault={addOptions}>
	<input type="text" bind:value={newOption} /><button type="submit">➕</button>
</form>

{#each data.options as option (option.content)}
	<p><button on:click={() => removeOption(option)}>🗑️</button>{option.content}</p>
{/each}

<SelectQuestionInput {data} />
