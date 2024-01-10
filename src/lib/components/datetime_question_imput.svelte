<script lang="ts">
	import type { DatetimeQuestion } from '$lib/form';

	export let data: DatetimeQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	name={data.name}
	type="datetime-local"
	required={data.required}
	value={data.default}
	min={data.min}
	max={data.max}
/>
