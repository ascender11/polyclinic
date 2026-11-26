import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createDiagnosisSchema = z.object({
  code: z.string().trim().min(1).max(30),
  name: z.string().trim().min(2).max(160),
});

export class CreateDiagnosisDto extends createZodDto(createDiagnosisSchema) {}
