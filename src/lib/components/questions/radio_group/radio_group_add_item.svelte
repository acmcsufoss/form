<script lang="ts">
	import { QuestionType } from '$lib/form';
	import type { AddItemProps } from '$lib/components/list_input/list_input';

	export let addAction: AddItemProps['addAction'];

	function add(e: MouseEvent) {
		e.preventDefault();
		addAction({
			content: '',
			value: ''
		});
	}

	// function makeDefault(type: QuestionType): Question {
	// 	switch...
	// }
</script>

<button on:click={add}>Add</button>
