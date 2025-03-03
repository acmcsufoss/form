<script lang="ts">
	import type { ColorQuestion } from '$lib/form';
	import ColorQuestionInput from './color_question_input.svelte';
	import BaseEditor from '../base/base_editor.svelte';
	export let data = $$props as ColorQuestion;
</script>

<BaseEditor bind:data>
	<!-- Copied From ColorQuestionInput  -->
	<fieldset>
		<legend>Default Color</legend>
		<input type="color" name="value" bind:value={data.value} />
	</fieldset>
	<svelte:fragment slot="preview">
		<div class="question">
			<ColorQuestionInput bind:data />
		</div>
	</svelte:fragment>
</BaseEditor>
