import { IDSchema } from './id';
import { z } from 'zod';

// TODO: Convert this to a zod schema.
/**
 * UserIDs is a map of user IDs to empty objects to use as a set for
 * fast lookups.
 */
export const UserIDsSchema = z.record(IDSchema, z.null());
export type UserIDs = z.infer<typeof UserIDsSchema>;

/**
 * FORM_PERMISSION_TYPES is a list of form permission types.
 */
export const FORM_PERMISSION_TYPES = ['edit', 'view'] as const;
export const FORM_PERMISSION_TYPES_SCHEMA = z.enum(FORM_PERMISSION_TYPES);

/**
 * Permissions is a map of permission types to a set of user IDs.
 */
export const PermissionsSchema = z.record(FORM_PERMISSION_TYPES_SCHEMA, UserIDsSchema);
export type Permissions = z.infer<typeof PermissionsSchema>;

/**
 * FormPermissionType is a union type of the supported form permission types.
 */
export type FormPermissionType = z.infer<typeof FORM_PERMISSION_TYPES_SCHEMA>;
// export type FormPermissionType = (typeof FORM_PERMISSION_TYPES)[number];

/**
 * FormPermissions represents the permissions for a form.
 */
export const FormPermissionsSchema = PermissionsSchema;
export type FormPermissions = z.infer<typeof FormPermissionsSchema>;
