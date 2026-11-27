import { z } from 'zod';

export const DiagnosisSchema = z.object({
  id: z.number().int().positive(),
  code: z.string(),
  name: z.string(),
});

export const FindDiagnosesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(100),
  sortBy: z.enum(['id', 'code', 'name']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  search: z.string().trim().optional(),
});
