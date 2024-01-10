<script lang="ts">
	import type { Form } from '$lib/store';
	import { QuestionType } from '$lib/form';
	import QuestionInput from './question_input.svelte';

	export let action: string;
	export let method: string;
	export let data: Form;
</script>

<form {action} {method}>
	<div class="form-header">
		<h1>Form editor</h1>
		<p class="form-description">Edit a form!</p>
		<hr />
		<div class="form-information">
			<p>Form ID: {data.id}</p>
		</div>
	</div>
	<QuestionInput
		data={{
			type: QuestionType.TEXT,
			name: 'title',
			content: 'Title'
		}}
	/>

	<QuestionInput
		data={{
			type: QuestionType.TEXTAREA,
			name: 'description',
			content: 'Description'
		}}
	/>

	<QuestionInput
		data={{
			type: QuestionType.TEXT,
			name: 'schedule.startDatetime',
			content: 'Start date'
		}}
	/>

	<QuestionInput
		data={{
			type: QuestionType.TEXT,
			name: 'schedule.endDatetime',
			content: 'End date'
		}}
	/>

	<QuestionInput
		data={{
			type: QuestionType.TIMEZONE,
			name: 'schedule.timezone',
			content: 'Timezone (default: UTC/GMT)'
		}}
	/>

	<QuestionInput
		data={{
			type: QuestionType.BOOLEAN,
			name: 'anonymized',
			content: 'Anonymized'
		}}
	/>

	<QuestionInput
		data={{
			type: QuestionType.BOOLEAN,
			name: 'allowsMultipleSubmissions',
			content: 'Allows multiple submissions'
		}}
	/>

	<!-- Message -->

	/** * id is the ID of the Discord message that the form is linked to (if any). */ id?: ID; /** *
	channelID is the ID of the Discord channel that the message is in. */ channelID: ID; /** *
	threadID is the ID of the Discord thread that the message is in. */ threadID?: ID;

	<!-- Questions -->

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
