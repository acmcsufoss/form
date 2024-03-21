<script lang="ts">
	import type { User, Form } from '$lib/store';
	import QuestionInput from '$lib/components/question_input/question_input.svelte';

	export let action = '';
	export let method = 'POST';
	export let data: Form;
	export let user: User | undefined = undefined;

	if (data.questions.shuffled) {
		data.questions.data = data.questions.data.sort(() => Math.random() - 0.5);
	}
</script>

<form {action} {method}>
	<div class="form-header">
		<h1>{data.title}</h1>
		<p class="form-description">{data.description}</p>
		<hr />
		<div class="form-information">
			<p>
				Account:
				{#if user}
					{user.discordUsername}
				{:else}
					Unauthenticated
				{/if}
			</p>

			{#if data.startDate}
				<p>Opened at: {data.startDate}</p>
			{/if}
			{#if data?.endDate}
				<p>Opened until: {data?.endDate}</p>
			{/if}
		</div>
	</div>
	{#each data.questions.data as question}
		<QuestionInput {...question} />
	{/each}

	<button type="submit">Submit</button>
</form>

<style>
	/* TODO: Fix. Reference: https://github.com/acmcsufoss/form/blob/71e0b113927c8e064229e63931f964a98f6e3f1d/src/lib/components/form.svelte */

	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
	/* uncomment the global to see css components */

	/* :global(*) {
        border-style: dotted;
        border-color: red;
    } */

	:global(*) {
		font-family: 'Poppins';
		font-size: 11px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		max-width: 400px;
	}

	hr {
		margin: 0;
		margin-left: -15px;
		width: 100%;
		padding: 0px 15px;
	}

	:global(fieldset) {
		border: none;
		min-width: 0;
		margin: 0px;
		padding: 0px;
		max-width: 100%;
		width: 100%;
		display: block;
	}
	:global(legend) {
		font-size: 13px;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: 'Poppins';
	}

	.form-header {
		padding: 15px 15px;
		width: calc(100% - 30px);
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		border-top: 7px solid #04a2ff;
	}

	.form-description {
		padding-bottom: 7px;
	}

	.form-information {
		padding-top: 7px;
	}

	h1 {
		margin: 0;
		text-align: left;
		font-size: 28px;
		font-weight: 600;
	}

	p {
		margin: 0;
		text-align: left;
		font-size: 11px;
		font-weight: 400;
	}

	:global(.Question-Header) {
		font-size: 13px;
		font-weight: bold;
		margin-bottom: 10px;
		font-family: 'Poppins';
	}

	:global(.question) {
		padding: 20px 15px;
		width: calc(100% - 30px);
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		border-color: #c5c8c9;
		border-width: 0;
		border-style: solid;
	}

	:global(label) {
		display: flex;
	}

	:global(input) {
		display: flex;
	}
</style>
