import { Inject, Injectable } from '@nestjs/common';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/generated/client';
import databaseConfig from '@/shared/config/database/database.config';
import type { DatabaseConfig } from '@/shared/config/database/database.config.schema';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(@Inject(databaseConfig.KEY) dbConfig: DatabaseConfig) {
    const adapter = new PrismaPg({
      connectionString: dbConfig.databaseUrl,
    });

    super({
      adapter,
    });
  }
}
