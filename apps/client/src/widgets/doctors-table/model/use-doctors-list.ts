import { useEffect, useState } from 'react';

import type { Doctor, FindDoctorsQuery } from '@/entities/doctor';
import { doctorService } from '@/entities/doctor';

interface DoctorsListState {
  doctors: Doctor[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: DoctorsListState = {
  doctors: [],
  total: 0,
  totalPages: 0,
  isLoading: true,
  error: null,
};

export const useDoctorsList = (params: FindDoctorsQuery) => {
  const [state, setState] = useState(initialState);
  const [refreshKey, setRefreshKey] = useState(0);

  const { page, limit, search, category } = params;

  useEffect(() => {
    const controller = new AbortController();

    const fetchDoctors = async () => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const response = await doctorService.getAll({ page, limit, search, category }, controller.signal);

        setState({
          doctors: response.data,
          total: response.meta.total,
          totalPages: response.meta.totalPages,
          isLoading: false,
          error: null,
        });
      } catch {
        if (controller.signal.aborted) return;

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Не удалось загрузить список врачей',
        }));
      }
    };

    fetchDoctors();

    return () => controller.abort();
  }, [page, limit, search, category, refreshKey]);

  const retry = () => {
    setRefreshKey((value) => value + 1);
  };

  return {
    ...state,
    retry,
  };
};
