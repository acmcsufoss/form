<script lang="ts">
	import type { RadioGroupQuestion } from '$lib/form';

	const data = $$props as RadioGroupQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	{#each data.choices as choice, i}
		<div class="choice">
			<input
				type="radio"
				required={data.required}
				name={data.name}
				id={choice}
				checked={data.choiceIndex !== undefined && i === data.choiceIndex}
			/>
			<label for={choice}>{choice}</label>
		</div>
	{/each}
	{#if data.allowCustomChoice}
		<div class="choice">
			<input
				type="radio"
				required={data.required}
				name={data.name}
				id="custom"
				checked={data.choiceIndex === -1}
			/>
			<label for="custom">
				<input name={data.name} id="custom-choice" type="text" value={data.customChoice} />
			</label>
		</div>
	{/if}
</fieldset>

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

	#custom-choice {
		padding: 5px 10px;
		margin: 0px;
		width: 100%;
		background-color: #ddd8d8;
		border-radius: 10px;
		border-width: 0;
		font-size: 11px;
		max-width: 100%;
	}
</style>
