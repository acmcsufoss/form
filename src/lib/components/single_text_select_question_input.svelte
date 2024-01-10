<script lang="ts">
	import type { SingleTextSelectQuestion } from '$lib/form';

	export let data: SingleTextSelectQuestion;
</script>

<label class="Question-Header" id={data.name} for={data.name}>{data.content}</label>
<!-- TODO: Create functionality for default choice and custom choice -->
{#each data.choices as choice}
	<div class="choice">
		<input type="radio" required={data.required} name={data.name} id={choice} />
		<label for={choice}>{choice}</label>
	</div>
{/each}

<style>
	.choice {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10px;
	}
	.choice input {
		margin-right: 5px;
		appearance: none;
		background-color: #ddd8d8;
		border-radius: 50%;
		width: 17px;
		height: 17px;
	}
	.choice input:checked {
		background-color: #1f2024;
		border-radius: 50%;
		border: 3px solid #04a2ff;
	}
	.choice label {
		margin: 0;
		font-size: 11px;
	}
</style>
