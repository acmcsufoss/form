import type { ComponentType, SvelteComponent } from 'svelte';

export type ItemProps = Record<string, unknown>;

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
