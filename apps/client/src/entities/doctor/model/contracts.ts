import { z } from 'zod';

export const DoctorCategorySchema = z.enum(['FIRST', 'SECOND', 'THIRD']);

export const DoctorSchema = z.object({
  id: z.number().int().positive(),
  fullName: z.string().min(1),
  specialty: z.string().min(1),
  category: DoctorCategorySchema,
});

export const CreateDoctorSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  specialty: z.string().trim().min(2).max(100),
  category: DoctorCategorySchema,
});

export const UpdateDoctorSchema = CreateDoctorSchema.partial().refine((data) => Object.keys(data).length > 0);

export const FindDoctorsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.enum(['id', 'fullName', 'specialty', 'category']).default('id'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  fullName: z.string().trim().optional(),
  specialty: z.string().trim().optional(),
  category: DoctorCategorySchema.optional(),
  search: z.string().trim().optional(),
});

export const DoctorExistsSchema = z.object({
  exists: z.boolean(),
});

export const DeleteDoctorResponseSchema = z.object({
  message: z.string(),
});
