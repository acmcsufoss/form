<script lang="ts">
	/**
	 * I created choice Editor with the intention of helping questions
	 * such as radio group and select question edit their content value pairs
	 */
	// this might be deleted or moved file locations sadge
	import type { QuestionBase } from '$lib/form';

	type Choice = {
		content: string;
		value: string;
	};
	export let data = $$props as Choice;
</script>

<fieldset>
	<legend>Choice Content</legend>
	<input name="content" type="text" bind:value={data.content} placeholder="Choice Content" />
</fieldset>

<fieldset>
	<legend>Choice internal value</legend>
	<input name="value" type="text" bind:value={data.value} placeholder="Choice Value" />
</fieldset>
