import { z } from 'zod';

export const appConfigSchema = z.object({
  PORT: z.coerce.number().positive().default(3000),
  FRONTEND_URL: z.url('Valid frontend URL is required'),
  NODE_ENV: z
    .enum([
      'development',
      'production',
      'test',
    ])
    .default('development'),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
