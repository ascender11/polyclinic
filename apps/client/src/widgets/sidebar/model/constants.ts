import { routes } from '@/shared/config';

export const SIDEBAR_NAVIGATION = [
  { label: 'Главная', path: routes.home, icon: '⌂' },
  { label: 'Врачи', path: routes.doctors, icon: '✚' },
  { label: 'Пациенты', path: routes.patients, icon: '♙' },
  { label: 'Приёмы', path: routes.appointments, icon: '▤' },
  { label: 'Диагнозы', path: routes.diagnoses, icon: '▦' },
];
