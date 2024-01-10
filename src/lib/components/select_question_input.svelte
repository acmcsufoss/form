<script lang="ts">
	import type { SelectQuestion } from '$lib/form';

	export let data: SelectQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<select name={data.name} required={data.required} value={data.default}>
	{#each data.options as option}
		<option value={option.value}>{option.content}</option>
	{/each}
</select>
