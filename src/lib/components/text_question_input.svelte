<script lang="ts">
	import type { TextQuestion } from '$lib/form';

	export let data: TextQuestion;
</script>

<label class="Question-Header" for={data.name}>{data.content}</label>
<input
	name={data.name}
	type="text"
	max={data.maxLength}
	min={data.minLength}
	placeholder={data.placeholder}
	value={data.default}
	pattern={data.pattern}
/>

<style>
	input {
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #ddd8d8;
		border-radius: 10px;
		border-width: 0;
		font-size: 11px;
	}
	input::placeholder {
		font-style: italic;
		color: #1f2024;
		opacity: 0.9;
		font-size: 11px;
	}
	input:focus {
		outline-width: 1px;
		outline-color: chocolate;
	}
</style>
