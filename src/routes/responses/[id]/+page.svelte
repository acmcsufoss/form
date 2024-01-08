<script lang="ts">
	import type { PageData } from './$types';
	import Form from '$lib/components/form.svelte';

	export let data: PageData;
</script>

<!-- <h1>Form List Page</h1> -->
{data.user.discordUsername}

<Form />
