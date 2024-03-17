<script lang="ts">
	import DemoForm from './demo_form.svelte';
	import BooleanQuestionInputEditor from '$lib/components/questions/boolean/boolean_question_input_editor.svelte';
	import { QuestionType, type BooleanQuestion } from '$lib/form';
	var data: BooleanQuestion = {
		type: QuestionType.BOOLEAN,
		name: 'internal name',
		content: 'Are you 18 years old?',
		required: true,
		style: 'checkbox',
		value: false
	};
</script>

<BooleanQuestionInputEditor {...data} />
<!-- svelte-ignore empty-block -->
{#if data.value}
	<p>the value is TRUE</p>
{/if}
<DemoForm />
