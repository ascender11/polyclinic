import type { z } from 'zod';

import type {
  AppointmentExistsSchema,
  AppointmentSchema,
  CreateAppointmentSchema,
  FindAppointmentsQuerySchema,
  UpdateAppointmentSchema,
} from './contracts';

export type Appointment = z.infer<typeof AppointmentSchema>;

export type CreateAppointmentInput = z.input<typeof CreateAppointmentSchema>;

export type UpdateAppointmentInput = z.input<typeof UpdateAppointmentSchema>;

export type FindAppointmentsQuery = z.input<typeof FindAppointmentsQuerySchema>;

export type AppointmentExists = z.infer<typeof AppointmentExistsSchema>;
