import { GenderSchema } from './contracts';
import type { Gender } from './types';

export const genderLabels = {
  MALE: 'Мужской',
  FEMALE: 'Женский',
} satisfies Record<Gender, string>;

export const genders = GenderSchema.options;

export const isGender = (value: unknown): value is Gender => GenderSchema.safeParse(value).success;
