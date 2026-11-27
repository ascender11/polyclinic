import type { DoctorCategory } from '@/entities/doctor';
import { isDoctorCategory } from '@/entities/doctor';

import { useListParams } from '@/shared/lib/hooks';

export const useDoctorsParams = () => {
  const { searchParams, update, ...listParams } = useListParams();

  const categoryParam = searchParams.get('category');
  const category: DoctorCategory | '' = isDoctorCategory(categoryParam) ? categoryParam : '';

  return {
    ...listParams,
    category,
    updateCategory: (value: DoctorCategory | '') => update({ category: value }, { resetPage: true }),
  };
};
