<script lang="ts">
	import type { SelectQuestion } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import SelectQuestionInput from './select_question_input.svelte';
	import ListInput from '$lib/components/list_input/list_input.svelte';
	import TextQuestionInput from '../text/text_question_input.svelte';
	import SelectAddItem from './select_add_item.svelte';
	import DeleteItem from '$lib/components/form_editor/question_list_editor/delete_item.svelte';
	import BaseEditor from '../base/base_editor.svelte';
	import TextQuestionInputEditor from '../text/text_question_input_editor.svelte';
	import { AuditLogOptionsType } from 'discord-api-types/v10';
	import ChoiceEditor from '../base/choice_editor.svelte';

	export var data = $$props as SelectQuestion;
</script>

<!-- <input type="text" bind:value={newOption} /><button on:click|preventDefault={addOptions}>➕</button>

{#each data.options as option (option.content)}
	<button on:click={() => removeOption(option)}>🗑️</button><input
		name={option.value}
		bind:value={option.content}
	/> <br />
{/each} -->
<BaseEditor bind:data>
	<!-- For the time being the Item is using BaseEditor 
		   as it has two text inputs that can be for 
			 data.options.content and data.options.value 
					
	-->
	<h4>Edit Choices</h4>
	<ListInput
		bind:value={data.options}
		components={{
			item: ChoiceEditor,
			addItem: SelectAddItem,
			deleteItem: DeleteItem
		}}
	/>
	<svelte:fragment slot="preview">
		<div class="question">
			<SelectQuestionInput {data} />
		</div>
	</svelte:fragment>
</BaseEditor>
