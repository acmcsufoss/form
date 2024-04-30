<script lang="ts">
	import type { DeleteItemProps } from '$lib/components/list_input/list_input';

	export let deleteAction: DeleteItemProps['deleteAction'];
</script>

<!-- TODO: stop this button from firing when the user hits the enter key -->
<!-- With the enter key still inactive its very easy to accidentally delete a question. -->
<!-- Some inputs may also use an enter such as text area if the user writes mutliple paragraphs -->
<button on:click={() => deleteAction()}>Delete</button>

<style>
	button {
		position: absolute;
		transform: translateX(-140%) translateY(-80%);
	}
</style>
