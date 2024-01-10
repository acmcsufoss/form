<script lang="ts">
	import type { TimeQuestion } from '$lib/form';

	export let data: TimeQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	name={data.name}
	type="time"
	required={data.required}
	value={data.default}
	min={data.min}
	max={data.max}
/>
