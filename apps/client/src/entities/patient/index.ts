export { patientService } from './api/api';
export {
  CreatePatientSchema,
  DeletePatientResponseSchema,
  FindPatientsQuerySchema,
  GenderSchema,
  PaginatedResponseSchema,
  PaginationMetaSchema,
  PatientExistsSchema,
  PatientSchema,
  UpdatePatientSchema,
} from './model/contracts';
export type {
  CreatePatientInput,
  DeletePatientResponse,
  FindPatientsQuery,
  Gender,
  PaginatedResponse,
  PaginationMeta,
  Patient,
  PatientExists,
  UpdatePatientInput,
} from './model/types';
