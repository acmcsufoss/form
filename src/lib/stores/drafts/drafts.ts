import { writable } from 'svelte/store';
import type { Form } from '$lib/form';

export const drafts = writable<Map<string, Form>>(new Map());

// TODO: Dream about the solution
