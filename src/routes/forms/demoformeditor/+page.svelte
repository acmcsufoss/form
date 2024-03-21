<script lang="ts">
	import type { PageData } from './$types';
	import FormEditor from '$lib/components/form_editor/form_editor.svelte';
	import { demoForm } from './demo_form_editor';
</script>

<FormEditor action={''} method={''} value={demoForm} />
