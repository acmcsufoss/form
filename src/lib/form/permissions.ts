import type { ID } from './id';

// TODO: Convert this to a zod schema.
/**
 * UserIDs is a map of user IDs to empty objects to use as a set for
 * fast lookups.
 */
export type UserIDs = Record<ID, never>;

/**
 * Permissions is a map of permission types to a set of user IDs.
 */
export type Permissions<T extends string> = Record<T, UserIDs>;

/**
 * FORM_PERMISSION_TYPES is a list of form permission types.
 */
export const FORM_PERMISSION_TYPES = ['edit', 'view'] as const;

/**
 * FormPermissionType is a union type of the supported form permission types.
 */
export type FormPermissionType = (typeof FORM_PERMISSION_TYPES)[number];

/**
 * FormPermissions represents the permissions for a form.
 */
export type FormPermissions = Permissions<FormPermissionType>;
