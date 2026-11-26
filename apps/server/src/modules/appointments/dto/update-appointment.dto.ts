import { createZodDto } from 'nestjs-zod';

import { createAppointmentSchema } from './create-appointment.dto';

export const updateAppointmentSchema = createAppointmentSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'At least one field must be provided' });

export class UpdateAppointmentDto extends createZodDto(updateAppointmentSchema) {}
