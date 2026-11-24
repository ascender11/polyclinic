import { z } from 'zod';

export const DatabaseConfigSchema = z.object({
  databaseUrl: z.url('Valid database URL is required'),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
