import Sortable from 'sortablejs';

export function initSortable(element: HTMLElement) {
	return new Sortable(element, {
		direction: 'vertical',

		setData: function (/** DataTransfer */ dataTransfer, /** HTMLElement*/ dragEl) {
			if (!dragEl.textContent) {
				return;
			}

			dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
		},

		// Element is chosen
		onChoose: function (/**Event*/ evt) {
			evt.oldIndex; // element index within parent
		},

		// Element is unchosen
		onUnchoose: function (/**Event*/ evt) {
			// same properties as onEnd
		},

		// Element dragging started
		onStart: function (/**Event*/ evt) {
			evt.oldIndex; // element index within parent
		},

		// Element dragging ended
		onEnd: function (/**Event*/ evt) {
			var itemEl = evt.item; // dragged HTMLElement
			evt.to; // target list
			evt.from; // previous list
			evt.oldIndex; // element's old index within old parent
			evt.newIndex; // element's new index within new parent
			evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
			evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
			evt.clone; // the clone element
			evt.pullMode; // when item is in another sortable: `"clone"` if cloning, `true` if moving
		},

		// Element is dropped into the list from another list
		onAdd: function (/**Event*/ evt) {
			// same properties as onEnd
		},

		// Changed sorting within list
		onUpdate: function (/**Event*/ evt) {
			// same properties as onEnd
		},

		// Called by any change to the list (add / update / remove)
		onSort: function (/**Event*/ evt) {
			// same properties as onEnd
		},

		// Element is removed from the list into another list
		onRemove: function (/**Event*/ evt) {
			// same properties as onEnd
		},

		// Attempt to drag a filtered element
		onFilter: function (/**Event*/ evt) {
			var itemEl = evt.item; // HTMLElement receiving the `mousedown|tapstart` event.
		},

		// Event when you move an item in the list or between lists
		onMove: function (/**Event*/ evt, /**Event*/ originalEvent) {
			// Example: https://jsbin.com/nawahef/edit?js,output
			evt.dragged; // dragged HTMLElement
			evt.draggedRect; // DOMRect {left, top, right, bottom}
			evt.related; // HTMLElement on which have guided
			evt.relatedRect; // DOMRect
			evt.willInsertAfter; // Boolean that is true if Sortable will insert drag element after target by default
			originalEvent.clientY; // mouse position
			// return false; — for cancel
			// return -1; — insert before target
			// return 1; — insert after target
			// return true; — keep default insertion point based on the direction
			// return void; — keep default insertion point based on the direction
		},

		// Called when creating a clone of element
		onClone: function (/**Event*/ evt) {
			var origEl = evt.item;
			var cloneEl = evt.clone;
		},

		// Called when dragging element changes position
		onChange: function (/**Event*/ evt) {
			evt.newIndex; // most likely why this event is used is to get the dragging element's current index
			// same properties as onEnd
		}
	});
}
