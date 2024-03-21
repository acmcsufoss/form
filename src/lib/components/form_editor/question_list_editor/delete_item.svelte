<script lang="ts">
	import type { DeleteItemProps } from '$lib/components/list_input/list_input';

	export let deleteAction: DeleteItemProps['deleteAction'];
</script>

<button on:click={() => deleteAction()}>Delete</button>
