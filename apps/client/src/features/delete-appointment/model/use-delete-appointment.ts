import { isAxiosError } from 'axios';
import { useState } from 'react';

import type { Appointment } from '@/entities/appointment';
import { appointmentService } from '@/entities/appointment';

interface UseDeleteAppointmentOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const useDeleteAppointment = ({ onSuccess, onError }: UseDeleteAppointmentOptions) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const remove = async (appointment: Appointment): Promise<boolean> => {
    const confirmed = window.confirm(`Удалить талон №${appointment.ticketNumber}?`);

    if (!confirmed) {
      return false;
    }

    setDeletingId(appointment.id);

    try {
      await appointmentService.delete(appointment.id);

      onSuccess(`Приём №${appointment.ticketNumber} успешно удалён`);

      return true;
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ?? 'Не удалось удалить приём.')
        : 'Произошла непредвиденная ошибка.';

      onError(message);

      return false;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    deletingId,
    remove,
  };
};
