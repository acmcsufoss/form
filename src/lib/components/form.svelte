<script lang="ts">
	import type { User, Form } from '$lib/store';
	import QuestionInput from './question_input.svelte';

	export let action: string;
	export let method: string;
	export let data: Form;
	export let user: User;

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
			<p>Account: {user.discordUsername}</p>
			{#if data.schedule?.startDate}
				<p>Opened at: {data.schedule?.startDate}</p>
			{/if}
			{#if data.schedule?.endDate}
				<p>Opened until: {data.schedule?.endDate}</p>
			{/if}
		</div>
	</div>
	{#each data.questions.data as question}
		<QuestionInput data={question} />
	{/each}

	<button type="submit">Submit</button>
</form>

<style>
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

	:global(label) {
		display: flex;
	}

	:global(input) {
		display: flex;
	}
</style>
