import { createZodDto } from 'nestjs-zod';

import { createDoctorSchema } from './create-doctor.dto';

export const updateDoctorSchema = createDoctorSchema.partial().refine((data) => Object.keys(data).length > 0);

export class UpdateDoctorDto extends createZodDto(updateDoctorSchema) {}
