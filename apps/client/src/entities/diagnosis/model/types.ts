import type { z } from 'zod';

import type { DiagnosisSchema, FindDiagnosesQuerySchema } from './contracts';

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export type FindDiagnosesQuery = z.input<typeof FindDiagnosesQuerySchema>;
