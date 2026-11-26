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

export type CreatePatientInput = z.input<typeof CreatePatientSchema>;

export type UpdatePatientInput = z.input<typeof UpdatePatientSchema>;

export type FindPatientsQuery = z.input<typeof FindPatientsQuerySchema>;

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type PatientExists = z.infer<typeof PatientExistsSchema>;

export type DeletePatientResponse = z.infer<typeof DeletePatientResponseSchema>;
