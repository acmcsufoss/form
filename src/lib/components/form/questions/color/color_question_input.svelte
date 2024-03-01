<script lang="ts">
	import type { ColorQuestion } from '$lib/form';
	export let data: ColorQuestion;
</script>

<fieldset>
	<legend>{data.content}</legend>
	<input name={data.name} type="color" required={data.required} value={data.value} />
</fieldset>
