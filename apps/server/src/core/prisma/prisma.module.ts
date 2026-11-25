import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '@/shared/config/database/database.config';

import { PrismaService } from './prisma.service.js';

@Global()
@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
