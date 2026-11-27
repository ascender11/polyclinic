import { useEffect, useState } from 'react';

import type { Appointment, FindAppointmentsQuery } from '@/entities/appointment';
import { appointmentService } from '@/entities/appointment';

interface AppointmentsListState {
  appointments: Appointment[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppointmentsListState = {
  appointments: [],
  total: 0,
  totalPages: 0,
  isLoading: true,
  error: null,
};

export const useAppointmentsList = (params: FindAppointmentsQuery) => {
  const [state, setState] = useState(initialState);
  const [refreshKey, setRefreshKey] = useState(0);

  const { page, limit, search, dateFrom, dateTo } = params;

  useEffect(() => {
    const controller = new AbortController();

    const fetchAppointments = async () => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const response = await appointmentService.getAll({ page, limit, search, dateFrom, dateTo }, controller.signal);

        setState({
          appointments: response.data,
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
          error: 'Не удалось загрузить список приёмов',
        }));
      }
    };

    void fetchAppointments();

    return () => controller.abort();
  }, [page, limit, search, dateFrom, dateTo, refreshKey]);

  const retry = () => {
    setRefreshKey((value) => value + 1);
  };

  return {
    ...state,
    retry,
  };
};
