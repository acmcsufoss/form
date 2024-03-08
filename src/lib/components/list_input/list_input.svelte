<script lang="ts">
	import type { ItemProps, Components } from './list_input.ts';

	export let components: Components;
	export let value: ItemProps[] = [];

	function deleteItem(i: number): void {
		value.splice(i, 1);
	}

	function addItem(item: ItemProps): void {
		value.push(item);
	}

	// TODO: Make sortable items.
</script>

<div>
	{#each value as item, i}
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
