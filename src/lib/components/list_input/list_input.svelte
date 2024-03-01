<script lang="ts">
	import type { ItemProps, Components } from './list_input.ts';

	export let data: ItemProps[] = [];
	export let components: Components;

	function deleteItem(i: number): void {
		data.splice(i, 1);
		// data = [...data];
	}

	function addItem(item: ItemProps): void {
		data.push(item);
	}
</script>

<div>
	{#each data as item, i}
		<div>
			<svelte:component this={components.item} {...item} />
			<svelte:component this={components.deleteItem} deleteAction={() => deleteItem(i)} />
		</div>
	{:else}
		{#if components.emptySection}
			<svelte:component this={components.emptySection} />
		{/if}
	{/each}
	<svelte:component this={components.addItem} addAction={(item) => addItem(item)} />
</div>
