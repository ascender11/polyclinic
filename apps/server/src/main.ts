import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { appConfigSchema } from '@/shared/config/application/app.config.schema';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rawConfig = {
    PORT: configService.get('PORT'),
    FRONTEND_URL: configService.get('FRONTEND_URL'),
  };

  const config = appConfigSchema.parse(rawConfig);

  app.enableCors({
    origin: config.FRONTEND_URL,
    credentials: true,
  });

  app.useGlobalPipes(new ZodValidationPipe());

  await app.listen(config.PORT, '0.0.0.0');
}

bootstrap();
