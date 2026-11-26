import { z } from 'zod';

export const DoctorCategorySchema = z.enum(['FIRST', 'SECOND', 'THIRD']);

export const DoctorSchema = z.object({
  id: z.number().int().positive(),
  fullName: z.string().min(1),
  specialty: z.string().min(1),
  category: DoctorCategorySchema,
});

export const CreateDoctorSchema = z.object({
  fullName: z.string().min(1),
  specialty: z.string().min(1),
  category: DoctorCategorySchema,
});

export const UpdateDoctorSchema = CreateDoctorSchema.partial();

export const FindDoctorsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sortBy: z.enum(['id', 'fullName', 'specialty', 'category']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  fullName: z.string().optional(),
  specialty: z.string().optional(),
  category: DoctorCategorySchema.optional(),
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

export const DoctorExistsSchema = z.object({
  exists: z.boolean(),
});

export const DeleteDoctorResponseSchema = z.object({
  message: z.string(),
});
