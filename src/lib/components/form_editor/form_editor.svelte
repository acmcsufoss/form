<script lang="ts">
	import type { Form } from '$lib/store';
	import { QuestionType } from '$lib/form';
	import QuestionInput from '$lib/components/form/question_input/question_input.svelte';

	export let action: string;
	export let method: string;
	export let data: Form;

	// TODO: Add discord data: channels, threads, guilds, roles.
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

	<!-- TODO: Replace camelCase names with snake_case. -->
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

	<!-- Discord message schedule -->

	<!-- <QuestionInput
		data={{
			type: QuestionType.SELECT,
			name: 'message.channelID',
			content: 'Discord channel ID',
			options: data.channels.map((channel) => ({
				value: channel.id,
				content: channel.name
			}))
		}}
	/> -->

	<!-- TODO: Make editor inputs for each type of question. -->

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
