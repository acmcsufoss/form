<script lang="ts">
	import type { Form } from '$lib/store';
	import { QuestionType } from '$lib/form';
	import QuestionInput from '$lib/components/question_input/question_input.svelte';
	import QuestionListEditor from './question_list_editor/question_list_editor.svelte';

	export let action: string;
	export let method: string;
	export let value: Form;

	// TODO: Add discord data: channels, threads, guilds, roles.
</script>

<form {action} {method}>
	<div class="form-header">
		<h1>Form editor</h1>
		<p class="form-description">Edit a form!</p>
		<hr />
		<div class="form-information">
			<p>Form ID: {value.id}</p>
		</div>
	</div>

	<QuestionInput type={QuestionType.TEXT} name="title" content="Title" bind:value={value.title} />

	<QuestionInput
		type={QuestionType.TEXTAREA}
		name="description"
		content="Description"
		bind:value={value.description}
	/>

	<QuestionInput
		type={QuestionType.DATETIME}
		name="startDate"
		content="Start date"
		bind:value={value.startDate}
	/>

	<QuestionInput
		type={QuestionType.DATETIME}
		name="endDate"
		content="End date"
		bind:value={value.endDate}
	/>

	<QuestionInput
		type={QuestionType.TIMEZONE}
		name="timezone"
		content="Timezone (default: UTC/GMT)"
		bind:value={value.timezone}
	/>

	<QuestionInput
		type={QuestionType.BOOLEAN}
		name="anonymized"
		content="Anonymized"
		bind:value={value.anonymized}
	/>

	<QuestionInput
		type={QuestionType.BOOLEAN}
		name="shuffled"
		content="Shuffled"
		bind:value={value.questions.shuffled}
	/>

	<QuestionListEditor bind:value={value.questions} />

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
</style>
