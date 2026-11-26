import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const findDiagnosesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(['id', 'code', 'name']).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  code: z.string().trim().optional(),
  name: z.string().trim().optional(),
  search: z.string().trim().optional(),
});

export class FindDiagnosesQueryDto extends createZodDto(findDiagnosesQuerySchema) {}
