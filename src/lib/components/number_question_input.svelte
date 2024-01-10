<script lang="ts">
	import type { NumberQuestion } from '$lib/form';

	export let data: NumberQuestion;
</script>

<label class="Question-Header" for={data.name}> {data.content} </label>
<input
	name={data.name}
	type="number"
	required={data.required}
	min={data.min}
	max={data.max}
	value={data.default}
	placeholder={data.placeholder}
	step={data.step}
/>
