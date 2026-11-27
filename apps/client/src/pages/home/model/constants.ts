import { routes } from '@/shared/config';

export const HOME_SECTIONS = [
  {
    title: 'Врачи',
    description: 'Управление врачами, специальностями и категориями.',
    path: routes.doctors,
    icon: '✚',
  },
  {
    title: 'Пациенты',
    description: 'Медицинские карты и информация о пациентах.',
    path: routes.patients,
    icon: '♙',
  },
  {
    title: 'Приёмы',
    description: 'Талоны, посещения и история приёмов.',
    path: routes.appointments,
    icon: '▤',
  },
  {
    title: 'Диагнозы',
    description: 'Справочник диагнозов и их наименований.',
    path: routes.diagnoses,
    icon: '▦',
  },
];
