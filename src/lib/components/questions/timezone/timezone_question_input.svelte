<script lang="ts">
	import type { TimezoneQuestion } from '$lib/form';
	import { TIMEZONES } from '$lib/timezones';

	export let data = $$props as TimezoneQuestion;

	let localTimezoneID = '';
	if (Intl.DateTimeFormat) {
		localTimezoneID = Intl.DateTimeFormat().resolvedOptions().timeZone;
	}
</script>

<fieldset>
	<legend>{data.content}</legend>
	<select name={data.name} required={data.required} value={data.value || localTimezoneID}>
		{#each TIMEZONES as choice}
			<option value={choice.id}>{choice.text}</option>
		{/each}
	</select>
</fieldset>
