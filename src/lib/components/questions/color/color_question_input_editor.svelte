<script lang="ts">
	import type { QuestionType, ColorQuestion, SelectQuestion } from '$lib/form';
	import ColorQuestionInput from './color_question_input.svelte';
	import input from '../text/text_question_input.svelte';
	import TextQuestionInput from '../text/text_question_input.svelte';
	import { drafts } from '$lib/stores/drafts/drafts';
	import BaseEditor from '../base/base_editor.svelte';
	import TextareaQuestionInput from '../textarea/textarea_question_input.svelte';
	export let data = $$props as ColorQuestion;
</script>

<BaseEditor bind:data>
	<input type="color" name="color-" bind:value={data.value} />
	<details>
		<summary>Sample</summary>
		<div class="question">
			<ColorQuestionInput bind:data />
		</div>
	</details>
</BaseEditor>
