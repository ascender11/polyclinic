import { registerAs } from '@nestjs/config';

import { validateConfig } from '@/shared/utils/config-validation.util';

import { DatabaseConfigSchema } from './database.config.schema';

export default registerAs('database', () => {
  const config = {
    databaseUrl: process.env.DATABASE_URL,
  };

  const validatedConfig = validateConfig('Database', config, DatabaseConfigSchema);

  return validatedConfig;
});
