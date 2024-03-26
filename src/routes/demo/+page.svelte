<script lang="ts">
	import DemoForm from './demo_form.svelte';
	import BooleanQuestionInputEditor from '$lib/components/questions/boolean/boolean_question_input_editor.svelte';
	import { QuestionType, type BooleanQuestion, type SelectQuestion } from '$lib/form';
	import SelectQuestionInputEditor from '$lib/components/questions/select/select_question_input_editor.svelte';
	import SelectQuestionInput from '$lib/components/questions/select/select_question_input.svelte';
	var data: BooleanQuestion = {
		type: QuestionType.BOOLEAN,
		name: 'internal name',
		content: 'Are you 18 years old?',
		required: true,
		style: 'checkbox',
		value: false
	};

	var mySelectQuestion: SelectQuestion = {
		type: QuestionType.SELECT,
		options: [
			{ value: 'vanilla', content: 'vanilla' },
			{ value: 'chocolate', content: 'chocolate' }
		],
		name: 'ice cream',
		content: 'Pick your favorite ice cream'
	};

	var myList = [mySelectQuestion]


	
</script>
<form>
	<div style="background-color: yellow;">
		<BooleanQuestionInputEditor {...data} />
	</div>
	<div style="background-color: green;">
		<h1>content: {myList[0].content}</h1>

		
		<svelte:component this={SelectQuestionInputEditor} bind:data={myList[0]}/>


		<button on:click={() => console.log(myList[0])}>DEBUG VALUES</button>
		<!-- Just allows you to print the values at the top level for debugging purposes. -->
	</div>
	<button type="submit" on:click={(e) => {
		e.preventDefault();
		console.log(e)
	}}>Submit</button>
</form>


<DemoForm />
