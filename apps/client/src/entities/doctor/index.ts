export { doctorService } from './api/api';
export {
  CreateDoctorSchema,
  DeleteDoctorResponseSchema,
  DoctorCategorySchema,
  DoctorExistsSchema,
  DoctorSchema,
  FindDoctorsQuerySchema,
  PaginatedResponseSchema,
  PaginationMetaSchema,
  UpdateDoctorSchema,
} from './model/contracts';
export type {
  CreateDoctorInput,
  Doctor,
  DoctorCategory,
  FindDoctorsQuery,
  PaginatedResponse,
  PaginationMeta,
  UpdateDoctorInput,
} from './model/types';
