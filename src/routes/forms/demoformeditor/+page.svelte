<script lang="ts">
	// Currently not used yet so commented this out.
	// import type { PageData } from './$types';
	import FormEditor from '$lib/components/form_editor/form_editor.svelte';
	import { demoForm } from './demo_form_editor';
</script>

<FormEditor action={''} method={''} value={demoForm} />
