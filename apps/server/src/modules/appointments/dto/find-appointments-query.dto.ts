import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const findAppointmentsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z
    .enum(['id', 'ticketNumber', 'visitDate', 'purpose', 'cost', 'doctorId', 'patientId', 'diagnosisId'])
    .default('visitDate'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  ticketNumber: z.coerce.number().int().positive().optional(),
  purpose: z.string().trim().optional(),
  doctorId: z.coerce.number().int().positive().optional(),
  patientId: z.coerce.number().int().positive().optional(),
  diagnosisId: z.coerce.number().int().positive().optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  search: z.string().trim().optional(),
});

export class FindAppointmentsQueryDto extends createZodDto(findAppointmentsQuerySchema) {}
