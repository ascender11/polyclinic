import { useEffect, useState } from 'react';

import type { FindPatientsQuery, Patient } from '@/entities/patient';
import { patientService } from '@/entities/patient';

interface PatientsListState {
  patients: Patient[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientsListState = {
  patients: [],
  total: 0,
  totalPages: 0,
  isLoading: true,
  error: null,
};

export const usePatientsList = (params: FindPatientsQuery) => {
  const [state, setState] = useState(initialState);
  const [refreshKey, setRefreshKey] = useState(0);

  const { page, limit, search, gender } = params;

  useEffect(() => {
    const controller = new AbortController();

    const fetchPatients = async () => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const response = await patientService.getAll({ page, limit, search, gender }, controller.signal);

        setState({
          patients: response.data,
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
          error: 'Не удалось загрузить список пациентов',
        }));
      }
    };

    fetchPatients();

    return () => controller.abort();
  }, [page, limit, search, gender, refreshKey]);

  const retry = () => {
    setRefreshKey((value) => value + 1);
  };

  return {
    ...state,
    retry,
  };
};
