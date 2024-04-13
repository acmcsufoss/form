<script lang="ts">
	import { onMount } from 'svelte';
	import type { ItemProps, Components } from './list_input';
	import { initSortable } from './sortable';
	import type { QuestionList } from '$lib/form';

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
			<li class="item">
				<details>
					<summary>
						<span class="my-handle">☰</span>
						<span class="item-content">
							{#if item.content}
								<!-- TODO: Make the content reactive. -->
								{item.content}
							{:else}
								<em>Untitled</em>
							{/if}
						</span>
						<span class="item-type">{item.type}</span>
					</summary>
					<!-- 
						<svelte:component> isnt reactive because of {...item}
						it is possible to bind it if you can find a way to do bind:data={item}
						that would allow it to be reactive hopefully
					-->
					<svelte:component this={components.item} {...item} />
					<svelte:component this={components.deleteItem} deleteAction={() => deleteItem(i)} />
				</details>
			</li>
		{/each}
	</ul>
{:else if components.emptySection}
	<svelte:component this={components.emptySection} />
{/if}

<svelte:component this={components.addItem} addAction={(item) => addItem(item)} />

<style>
	li {
		/* outline: 2px solid red; */
	}
	summary {
		margin-top: 10px;
		padding: 2px;
		border-radius: 5px;
		background-color: #ffffff;
	}
</style>
