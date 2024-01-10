<script lang="ts">
	import type { DateQuestion } from '$lib/form';

	export let data: DateQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	name={data.name}
	type="date"
	required={data.required}
	min={data.min}
	max={data.max}
	value={data.default}
/>
