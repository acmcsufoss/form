<script lang="ts">
	import type { RadioGroupQuestion } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import RadioGroupQuestionInput from './radio_group_question_input.svelte';
	import ListInput from '$lib/components/list_input/list_input.svelte';
	import DeleteItem from '$lib/components/form_editor/question_list_editor/delete_item.svelte';
	import BaseEditor from '../base/base_editor.svelte';
	import TextQuestionInputEditor from '../text/text_question_input_editor.svelte';
	import RadioGroupAddItem from './radio_group_add_item.svelte';
	import ChoiceEditor from '../base/choice_editor.svelte';
	// import { AuditLogOptionsType } from 'discord-api-types/v10';

	export var data = $$props as RadioGroupQuestion;
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>allow custom choice</legend>
		<input type="checkbox" bind:value={data.allowCustomChoice} />
	</fieldset>
	<fieldset>
		<legend>default choice index</legend>
		<input type="number" bind:value={data.choiceIndex} />
	</fieldset>
	<fieldset>
		<legend>defualt custom choice string</legend>
		<input type="text" bind:value={data.customChoice} />
	</fieldset>
	<fieldset>
		<legend>defualt value</legend>
		<input type="text" bind:value={data.value} />
	</fieldset>
	<h4>Edit Choices</h4>
	<ListInput
		bind:value={data.choices}
		components={{
			item: ChoiceEditor,
			addItem: RadioGroupAddItem,
			deleteItem: DeleteItem
		}}
	/>
	<svelte:fragment slot="preview">
		<div class="question">
			<RadioGroupQuestionInput {data} />
		</div>
	</svelte:fragment>
</BaseEditor>
