import type { Action } from 'svelte/action';

/**
 * adjustableTextareaHeight is a progressive enhancement for adjusting height
 * of textarea.
 *
 * @see https://svelte.dev/docs/svelte-action
 */
export const adjustableTextareaHeight: Action = (node) => {
	function handleInput() {
		node.style.height = 'auto';
		node.style.height = node.scrollHeight + 'px';
	}

	node.addEventListener('input', handleInput);

	return {
		destroy() {
			node.removeEventListener('input', handleInput);
		}
	};
};
