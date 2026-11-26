import { createZodDto } from 'nestjs-zod';

import { createDiagnosisSchema } from './create-diagnosis.dto';

export const updateDiagnosisSchema = createDiagnosisSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: 'At least one field must be provided',
});

export class UpdateDiagnosisDto extends createZodDto(updateDiagnosisSchema) {}
