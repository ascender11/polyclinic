import { z } from 'zod';

export const PaginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const PaginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
  });

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
