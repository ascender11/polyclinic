import { DoctorCategorySchema } from './contracts';
import type { DoctorCategory } from './types';

export const doctorCategoryConfig = {
  FIRST: {
    label: 'Первая категория',
    shortLabel: 'Первая',
    badgeClass: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  },
  SECOND: {
    label: 'Вторая категория',
    shortLabel: 'Вторая',
    badgeClass: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  },
  THIRD: {
    label: 'Третья категория',
    shortLabel: 'Третья',
    badgeClass: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  },
} satisfies Record<DoctorCategory, { label: string; shortLabel: string; badgeClass: string }>;

export const doctorCategories = DoctorCategorySchema.options;

export const isDoctorCategory = (value: unknown): value is DoctorCategory =>
  DoctorCategorySchema.safeParse(value).success;
