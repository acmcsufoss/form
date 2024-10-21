<script lang="ts">
	/**
	 * I created choice Editor with the intention of helping questions
	 * such as radio group and select question edit their content value pairs
	 */
	// this might be deleted or moved file locations sadge
	import type { QuestionBase } from '$lib/form';

	export let data = $$props as QuestionBase;
</script>

<fieldset>
	<legend>Choice Content</legend>
	<input type="text" bind:value={data.content} placeholder="Question Title" />
</fieldset>

<fieldset>
	<legend>Choice internal value</legend>
	<input type="text" bind:value={data.name} placeholder="Internal Question Name" />
</fieldset>
