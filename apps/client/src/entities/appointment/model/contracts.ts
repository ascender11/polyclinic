import { z } from 'zod';

import { DiagnosisSchema } from '@/entities/diagnosis/@x/appointment';
import { DoctorSchema } from '@/entities/doctor/@x/appointment';
import { PatientSchema } from '@/entities/patient/@x/appointment';

export const AppointmentSchema = z.object({
  id: z.number().int().positive(),
  ticketNumber: z.number().int().positive(),
  visitDate: z.coerce.date(),
  purpose: z.string(),
  cost: z.coerce.number().nonnegative(),
  doctorId: z.number().int().positive(),
  patientId: z.number().int().positive(),
  diagnosisId: z.number().int().positive(),
  doctor: DoctorSchema,
  patient: PatientSchema,
  diagnosis: DiagnosisSchema,
});

export const CreateAppointmentSchema = z.object({
  ticketNumber: z.number().int().positive(),
  visitDate: z.coerce.date(),
  purpose: z.string().trim().min(2).max(500),
  cost: z.number().nonnegative(),
  doctorId: z.number().int().positive(),
  patientId: z.number().int().positive(),
  diagnosisId: z.number().int().positive(),
});

export const UpdateAppointmentSchema = CreateAppointmentSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided' }
);

export const FindAppointmentsQuerySchema = z.object({
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

export const AppointmentExistsSchema = z.object({
  exists: z.boolean(),
});
