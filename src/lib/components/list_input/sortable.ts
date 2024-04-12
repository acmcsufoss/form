import Sortable from 'sortablejs';

/**
 * initSortable initializes the Sortable.js library on the given element.
 */
export function initSortable(element: HTMLElement) {
	return new Sortable(element, { direction: 'vertical' });
}
