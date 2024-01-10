<script lang="ts">
	import type { ColorQuestion } from '$lib/form';

	export let data: ColorQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input name={data.name} type="color" required={data.required} value={data.default} />
