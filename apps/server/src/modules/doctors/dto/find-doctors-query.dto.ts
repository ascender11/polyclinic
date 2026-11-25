import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const findDoctorsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(['id', 'fullName', 'specialty', 'category']).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  fullName: z.string().trim().optional(),
  specialty: z.string().trim().optional(),
  category: z.enum(['FIRST', 'SECOND', 'THIRD']).optional(),
  search: z.string().trim().optional(),
});

export class FindDoctorsQueryDto extends createZodDto(findDoctorsQuerySchema) {}
