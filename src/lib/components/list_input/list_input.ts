import type { ComponentType, SvelteComponent } from 'svelte';
import type { Question } from '$lib/form/form';

/**
 * Note from AP:
 * Record<PropertyKey, unknown> basically states that the object can have any key and any value.
 * This is a very generic type and can be used for any object which is very useful for adaptability.
 * But this will get a type error for passing in a type that doesnt state that they can have any key and any value.
 * for ex. QuestionBase has strict types for its properties so it will not work.
 * You will get a type error for trying to type QuestionBase.randomProp because it doesnt exist.
 * But for Record<PropertyKey, unknown> if you did ItemProps.randomProp it would not throw a type error.
 * Since the Two shapes do not match Lint will complain about it.
 * So by unioning the two types we can pass in either type and Lint no longer complains.
 * This does not feel like a good solution probably would have to change Lint rules to allow for this.
 * Or find some other workaround where we can keep type safety.
 */
export type ItemProps = Record<PropertyKey, unknown> | Question;

export interface AddItemProps {
	addAction(item: ItemProps): void;
}

export interface DeleteItemProps {
	deleteAction(): void;
}

export type ItemComponent = SvelteComponent;
export type AddItemComponent = SvelteComponent<AddItemProps>;
export type DeleteItemComponent = SvelteComponent<DeleteItemProps>;

export interface Components {
	item: ComponentType<ItemComponent>;
	addItem: ComponentType<AddItemComponent>;
	deleteItem: ComponentType<DeleteItemComponent>;
	emptySection?: ComponentType<SvelteComponent>;
}
