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
  birthDate: z.coerce.date(),
  address: z.string().trim().min(2).max(255),
  gender: GenderSchema,
  discount: z.number().min(0).max(100),
});

export const UpdatePatientSchema = CreatePatientSchema.partial();

export const FindPatientsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(['id', 'medicalCardNumber', 'fullName', 'birthDate', 'address', 'gender', 'discount']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  medicalCardNumber: z.string().optional(),
  fullName: z.string().optional(),
  address: z.string().optional(),
  gender: GenderSchema.optional(),
  search: z.string().optional(),
});

export const PaginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const PaginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    meta: PaginationMetaSchema,
  });

export const PatientExistsSchema = z.object({
  exists: z.boolean(),
});

export const DeletePatientResponseSchema = PatientSchema;
