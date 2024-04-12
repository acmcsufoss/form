<script lang="ts">
	import { onMount } from 'svelte';
	import type { ItemProps, Components } from './list_input';
	import { initSortable } from './sortable';

	export let components: Components;
	export let value: ItemProps[] = [];

	let ref: HTMLElement;

	function deleteItem(i: number): void {
		value = value.filter((_, index) => index !== i);
	}

	function addItem(item: ItemProps): void {
		value = [...value, item];
	}

	onMount(() => {
		if (ref) {
			initSortable(ref);
		}
	});
</script>

{#if value.length > 0}
	<ul bind:this={ref}>
		{#each value as item, i}
			<li>
				<svelte:component this={components.item} {...item} />
				<svelte:component this={components.deleteItem} deleteAction={() => deleteItem(i)} />
			</li>
		{/each}
	</ul>
{:else if components.emptySection}
	<svelte:component this={components.emptySection} />
{/if}

<svelte:component this={components.addItem} addAction={(item) => addItem(item)} />
