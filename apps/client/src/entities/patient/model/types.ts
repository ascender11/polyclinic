import type { z } from 'zod';

import type {
  CreatePatientSchema,
  DeletePatientResponseSchema,
  FindPatientsQuerySchema,
  GenderSchema,
  PaginationMetaSchema,
  PatientExistsSchema,
  PatientSchema,
  UpdatePatientSchema,
} from './contracts';

export type Gender = z.infer<typeof GenderSchema>;

export type Patient = z.infer<typeof PatientSchema>;

export type CreatePatientInput = z.infer<typeof CreatePatientSchema>;

export type UpdatePatientInput = z.infer<typeof UpdatePatientSchema>;

export type FindPatientsQuery = z.infer<typeof FindPatientsQuerySchema>;

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PatientExists = z.infer<typeof PatientExistsSchema>;

export type DeletePatientResponse = z.infer<typeof DeletePatientResponseSchema>;
