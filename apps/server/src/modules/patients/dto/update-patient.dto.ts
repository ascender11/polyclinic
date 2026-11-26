import { createZodDto } from 'nestjs-zod';

import { createPatientSchema } from './create-patient.dto';

export const updatePatientSchema = createPatientSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export class UpdatePatientDto extends createZodDto(updatePatientSchema) {}
