import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { DoctorCategory } from '@/generated/client';

export const createDoctorSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  specialty: z.string().trim().min(2).max(100),
  category: z.enum(DoctorCategory),
});

export class CreateDoctorDto extends createZodDto(createDoctorSchema) {}
