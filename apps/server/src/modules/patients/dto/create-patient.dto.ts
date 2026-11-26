import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { Gender } from '@/generated/client';

export const createPatientSchema = z.object({
  medicalCardNumber: z.string().trim().min(1).max(30),
  fullName: z.string().trim().min(2).max(120),
  birthDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: 'Birth date cannot be in the future',
  }),
  address: z.string().trim().min(2).max(255),
  gender: z.enum(Gender),
  discount: z.number().min(0).max(100).default(0),
});

export class CreatePatientDto extends createZodDto(createPatientSchema) {}
