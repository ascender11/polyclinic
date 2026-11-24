import type { z } from 'zod';

export class ConfigValidationError extends Error {
  constructor(configName: string, error: Error) {
    super(`${configName} validation failed: ${error.message}`);
    this.name = 'ConfigValidationError';
  }
}

export function validateConfig<T>(configName: string, config: Record<string, unknown>, schema: z.ZodType<T>): T {
  const result = schema.safeParse(config);

  if (!result.success) {
    throw new ConfigValidationError(configName, result.error);
  }

  return result.data;
}
