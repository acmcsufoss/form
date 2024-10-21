<script lang="ts">
	import type { TimezoneQuestion } from '$lib/form';
	import { TIMEZONES } from '$lib/timezones';
	import BaseEditor from '../base/base_editor.svelte';
	import TimezoneQuestionInput from './timezone_question_input.svelte';
	export let data = $$props as TimezoneQuestion;
</script>

<BaseEditor bind:data>
	<fieldset>
		<legend>Defualt Timezone ID</legend>
		<input type="text" bind:value={data.value} />
	</fieldset>
	<svelte:fragment slot="preview">
		<TimezoneQuestionInput bind:data />
	</svelte:fragment>
</BaseEditor>
