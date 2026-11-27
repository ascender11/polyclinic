import type { Gender } from '@/entities/patient';
import { isGender } from '@/entities/patient';

import { useListParams } from '@/shared/lib/hooks';

export const usePatientsParams = () => {
  const { searchParams, update, ...listParams } = useListParams();

  const genderParam = searchParams.get('gender');
  const gender: Gender | '' = isGender(genderParam) ? genderParam : '';

  return {
    ...listParams,
    gender,
    updateGender: (value: Gender | '') => update({ gender: value }, { resetPage: true }),
  };
};
