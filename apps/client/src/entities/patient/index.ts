export { patientService } from './api/api';
export {
  CreatePatientSchema,
  PatientSchema,
  UpdatePatientSchema,
} from './model/contracts';
export { genderLabels, genders, isGender } from './model/gender';
export type {
  CreatePatientInput,
  FindPatientsQuery,
  Gender,
  Patient,
  UpdatePatientInput,
} from './model/types';
export { GenderSelect } from './ui/GenderSelect';
