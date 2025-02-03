<script lang="ts">
	import type { ItemProps, Components } from './list_input';
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

	function handleMove(i: number, direction: number): void {
		const newIndex = i + direction;
		if (newIndex < 0 || newIndex >= value.length) {
			return;
		}

		const item = value[i];
		value[i] = value[newIndex];
		value[newIndex] = item;
	}
</script>

{#if value.length > 0}
	<ul bind:this={ref}>
		{#each value as item, i}
			<li class="item">
				<details>
					<summary>
						<span class="sort-buttons">
							<button type="button" disabled={i === 0} on:click={() => handleMove(i, -1)}>Up</button
							>
							<button
								type="button"
								disabled={i === value.length - 1}
								on:click={() => handleMove(i, 1)}>Down</button
							>
						</span>

						<span class="item-content">
							{#if item.content}
								{item.content}
							{:else}
								<em>Untitled</em>
							{/if}
							<!-- Remove item.value display after testing -->
							{#if item.value}
								{item.value}
							{:else}
								<em>No value found</em>
							{/if}
						</span>
						<span class="item-type">{item.type}</span>
					</summary>
					<svelte:component this={components.item} bind:data={item} />
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
	/* li {
		outline: 2px solid red;
	} */
	summary {
		margin: 15px 0px;
		padding: 10px;
		border-radius: 5px;
		background-color: #ffffff;
	}
	details {
		padding: 0;
	}
	li {
		list-style-type: none;
	}
	ul {
		margin: 0px;
		padding: 0px;
	}
</style>
