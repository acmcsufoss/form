<script lang="ts">
	import type { PageData } from './$types';
	import { makeFormNewURL } from '$lib/urls';
	import FormPreviewList from './form_preview_list.svelte';

	export let data: PageData;
</script>

<h1>Forms</h1>

<FormPreviewList data={data.forms} />

<a href={makeFormNewURL()}>Create a form</a>
