import { useListParams } from '@/shared/lib/hooks';

export const useAppointmentsParams = () => {
  const { searchParams, update, ...listParams } = useListParams();

  const dateFrom = searchParams.get('dateFrom') ?? '';
  const dateTo = searchParams.get('dateTo') ?? '';

  return {
    ...listParams,
    dateFrom,
    dateTo,
    updateDateFrom: (value: string) => update({ dateFrom: value }, { resetPage: true }),
    updateDateTo: (value: string) => update({ dateTo: value }, { resetPage: true }),
  };
};
