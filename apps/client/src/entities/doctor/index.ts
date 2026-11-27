export { doctorService } from './api/api';
export {
  doctorCategories,
  doctorCategoryConfig,
  isDoctorCategory,
} from './model/category';
export {
  CreateDoctorSchema,
  DoctorSchema,
} from './model/contracts';
export type {
  CreateDoctorInput,
  Doctor,
  DoctorCategory,
  FindDoctorsQuery,
} from './model/types';
export { DoctorCategoryBadge } from './ui/DoctorCategoryBadge';
export { DoctorCategorySelect } from './ui/DoctorCategorySelect';
