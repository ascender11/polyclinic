import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Gender } from '@/generated/client';

export const findPatientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['id', 'medicalCardNumber', 'fullName', 'birthDate', 'address', 'gender', 'discount']).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  medicalCardNumber: z.string().trim().optional(),
  fullName: z.string().trim().optional(),
  address: z.string().trim().optional(),
  gender: z.enum(Gender).optional(),
  search: z.string().trim().optional(),
});

export class FindPatientsQueryDto extends createZodDto(findPatientsQuerySchema) {}
