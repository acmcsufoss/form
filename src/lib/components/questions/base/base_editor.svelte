<script lang="ts">
	import type { QuestionBase } from '$lib/form';

	/*  type: QuestionType;
	    name: string;
      content: string;
      required?: boolean; */
	export let data = $$props as QuestionBase;
</script>

<!-- Copied From TextQuestionInput -->
<div class="tabs">
	<!-- TODO: Fix Issue where if radio inputs have the same name they are part of the same group and cannot be selected
						 This means that if two questions have the same name then only one of the tabs can be selected at a time.
					   -->
	<input
		type="radio"
		name="tabs-{data.name}:{data.type}-{data.position}"
		id="tab-01-{data.name}:{data.type}-{data.position}"
		checked={true}
	/>
	<label for="tab-01-{data.name}:{data.type}-{data.position}">Editor</label>
	<div class="tab-content">
		<input type="hidden" name="form[questions][data][{data.position}][type]" value={data.type} />
		<input
			type="hidden"
			name="form[questions][data][{data.position}][position]"
			value={data.position}
		/>
		<fieldset>
			<legend>Question ID</legend>
			<input
				name="form[questions][data][{data.position}][name]"
				type="text"
				bind:value={data.name}
				placeholder="Question ID"
			/>
		</fieldset>

		<fieldset>
			<legend>Question Content</legend>
			<input
				name="form[questions][data][{data.position}][content]"
				type="text"
				bind:value={data.content}
				placeholder="Question Title"
			/>
		</fieldset>

		<fieldset>
			<legend>Question Required</legend>
			<input
				name="form[questions][data][{data.position}][required]"
				type="checkbox"
				bind:value={data.required}
				placeholder="Question Required"
			/>
		</fieldset>

		<!-- 	<slot name="additionalFields" /> -->
		<slot />
	</div>

	<input
		type="radio"
		name="tabs-{data.name}:{data.type}-{data.position}"
		id="tab-02-{data.name}:{data.type}-{data.position}"
	/>
	<label for="tab-02-{data.name}:{data.type}-{data.position}">Preview</label>
	<div class="tab-content">
		<slot name="preview" />
	</div>
</div>

<style>
	div {
		background-color: #ffffff;
		/* border: blue 10px solid; */
		border-radius: 20px;
	}
	input {
		padding: 5px 10px;
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
	:global(details) {
		padding: 20px 15px;
		width: calc(100% - 30px);
		margin: 10px auto;
		background-color: #ffffff;
		border-radius: 10px;
		border-color: #c5c8c9;
		border-width: 0;
		border-style: solid;
	}
	:global(details .sort-buttons) {
		position: absolute;
		transform: translateX(-140%) translateY(-50%);
		display: flex;
		flex-direction: column;
	}

	:root {
		--primary-text-color: #222;
		--secondary-text-color: #fff;
		--primary-bg-color: #222;
		--secondary-bg-color: #88cdd8;
		--tertiary-bg-color: #ddd;
	}

	/* body {
		background-color: var(--tertiary-bg-color);
		color: var(--primary-text-color);
		font-family: 'Rubik', serif;
		font-size: 1.2rem;
		line-height: 1.6;
	} */

	.tabs {
		display: flex;
		flex-wrap: wrap;
		max-width: 70ch;
	}

	.tabs label {
		background: var(--primary-bg-color);
		color: var(--secondary-text-color);
		cursor: pointer;
		display: block;
		font-weight: 600;
		margin-right: 0.3rem;
		order: initial;
		padding: 1rem 2rem;
		transition: background ease 0.3s;
		width: 100%;
		transform: translateX(10%);
	}

	.tabs .tab-content {
		display: none;
		flex-grow: 1;
		width: 100%;
	}

	.tabs input[type='radio'] {
		display: none;
	}

	.tabs input[type='radio']:checked + label {
		background: var(--secondary-bg-color);
		color: var(--primary-text-color);
	}

	.tabs input[type='radio']:checked + label + .tab-content {
		display: block;
	}

	@media (min-width: 10em) {
		.tabs .tab-content {
			order: 99;
		}

		.tabs label {
			order: 1;
		}

		.tabs label {
			margin-right: 0.3rem;
			margin-top: 0;
			width: auto;
		}
	}
</style>
