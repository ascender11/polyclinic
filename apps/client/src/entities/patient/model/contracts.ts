import { z } from 'zod';

export const GenderSchema = z.enum(['MALE', 'FEMALE']);

export const PatientSchema = z.object({
  id: z.number().int().positive(),
  medicalCardNumber: z.string(),
  fullName: z.string(),
  birthDate: z.coerce.date(),
  address: z.string(),
  gender: GenderSchema,
  discount: z.coerce.number(),
});

export const CreatePatientSchema = z.object({
  medicalCardNumber: z.string().trim().min(1).max(30),
  fullName: z.string().trim().min(2).max(120),
  birthDate: z.coerce.date().refine((date) => date <= new Date(), {
    message: 'Birth date cannot be in the future',
  }),
  address: z.string().trim().min(2).max(255),
  gender: GenderSchema,
  discount: z.number().min(0).max(100).default(0),
});

export const UpdatePatientSchema = CreatePatientSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export const FindPatientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['id', 'medicalCardNumber', 'fullName', 'birthDate', 'address', 'gender', 'discount']).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  medicalCardNumber: z.string().trim().optional(),
  fullName: z.string().trim().optional(),
  address: z.string().trim().optional(),
  gender: GenderSchema.optional(),
  search: z.string().trim().optional(),
});

export const PatientExistsSchema = z.object({
  exists: z.boolean(),
});

export const DeletePatientResponseSchema = PatientSchema;
