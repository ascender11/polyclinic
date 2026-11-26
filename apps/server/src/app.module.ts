import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from '@/core/core.module';
import { DoctorsModule } from '@/modules/doctors/doctors.module';
import { PatientsModule } from '@/modules/patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    DoctorsModule,
    PatientsModule,
  ],
})
export class AppModule {}
