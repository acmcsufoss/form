<script lang="ts">
	/**
	 * Choice Editor is for editing the choices of a question.
	 */
	type Choice = {
		value?: string;
		content?: string;
	};

	export let data: Choice[];
	export let prefix: string;

	function addChoice() {
		data = [...data, { content: '', value: '' }];
	}

	function deleteChoice(index: number) {
		data = data.filter((_, i) => i !== index);
	}

	function handleMove(i: number, direction: number) {
		let temp = data[i];
		let newPos = i + direction;

		data[i] = data[newPos];
		data[newPos] = temp;
	}
</script>

{#each data as choice, i}
	<span class="sort-buttons">
		<button type="button" disabled={i === 0} on:click={() => handleMove(i, -1)}>Up</button>
		<button type="button" disabled={i === data.length - 1} on:click={() => handleMove(i, 1)}
			>Down</button
		>
		<button type="button" on:click={() => deleteChoice(i)}>Delete</button>
	</span>
	<fieldset>
		<legend>Choice {i + 1}</legend>
		<input
			name="{prefix}[{i}][content]"
			type="text"
			bind:value={choice.content}
			placeholder="Choice Content"
		/>
		<input
			name="{prefix}[{i}][value]"
			type="text"
			bind:value={choice.value}
			placeholder="Choice Value"
		/>
	</fieldset>
{/each}

<button type="button" on:click={() => addChoice()}> Add Choice </button>
