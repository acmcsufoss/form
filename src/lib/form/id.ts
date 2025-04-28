import { z } from 'zod';
/**
 * ID is a unique identifier.
 */
export type ID = z.infer<typeof IDSchema>;

export const IDSchema = z.string();
