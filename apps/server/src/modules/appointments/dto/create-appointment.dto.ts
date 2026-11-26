import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  ticketNumber: z.number().int().positive(),
  visitDate: z.coerce.date(),
  purpose: z.string().trim().min(2).max(500),
  cost: z.number().nonnegative(),
  doctorId: z.number().int().positive(),
  patientId: z.number().int().positive(),
  diagnosisId: z.number().int().positive(),
});

export class CreateAppointmentDto extends createZodDto(createAppointmentSchema) {}
