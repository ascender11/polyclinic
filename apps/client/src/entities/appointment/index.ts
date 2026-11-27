export { appointmentService } from './api/api';
export {
  AppointmentExistsSchema,
  AppointmentSchema,
  CreateAppointmentSchema,
  FindAppointmentsQuerySchema,
  UpdateAppointmentSchema,
} from './model/contracts';
export type {
  Appointment,
  AppointmentExists,
  CreateAppointmentInput,
  FindAppointmentsQuery,
  UpdateAppointmentInput,
} from './model/types';
