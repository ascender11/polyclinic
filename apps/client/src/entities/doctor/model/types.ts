import type { z } from 'zod';

import type {
  CreateDoctorSchema,
  DeleteDoctorResponseSchema,
  DoctorCategorySchema,
  DoctorExistsSchema,
  DoctorSchema,
  FindDoctorsQuerySchema,
  PaginationMetaSchema,
  UpdateDoctorSchema,
} from './contracts';

export type DoctorCategory = z.infer<typeof DoctorCategorySchema>;

export type Doctor = z.infer<typeof DoctorSchema>;

export type CreateDoctorInput = z.input<typeof CreateDoctorSchema>;

export type UpdateDoctorInput = z.input<typeof UpdateDoctorSchema>;

export type FindDoctorsQuery = z.input<typeof FindDoctorsQuerySchema>;

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type DoctorExists = z.infer<typeof DoctorExistsSchema>;

export type DeleteDoctorResponse = z.infer<typeof DeleteDoctorResponseSchema>;
