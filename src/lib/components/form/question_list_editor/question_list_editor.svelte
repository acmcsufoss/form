<script lang="ts">
	import type { QuestionList } from '$lib/form';
	import { QuestionType } from '$lib/form';
	import ListInput from '$lib/components/list_input/list_input.svelte';
	import QuestionInput from '$lib/components/form/question_input/question_input.svelte';
	import QuestionInputEditor from '$lib/components/form/question_input_editor/question_input_editor.svelte';
	import AddItem from './add_item.svelte';
	import DeleteItem from './delete_item.svelte';

	export let value: QuestionList;
</script>

<QuestionInput
	data={{
		type: QuestionType.BOOLEAN,
		name: 'shuffled',
		content: 'Shuffled',
		value: value.shuffled
	}}
/>

<!-- TODO: Figure out how to handle indexed names for the items in the list if needed. -->

<ListInput
	components={{
		item: QuestionInputEditor,
		addItem: AddItem,
		deleteItem: DeleteItem
	}}
/>
