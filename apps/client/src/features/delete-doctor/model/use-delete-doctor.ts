import { isAxiosError } from 'axios';
import { useState } from 'react';

import type { Doctor } from '@/entities/doctor';
import { doctorService } from '@/entities/doctor';

interface UseDeleteDoctorOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const useDeleteDoctor = ({ onSuccess, onError }: UseDeleteDoctorOptions) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const remove = async (doctor: Doctor): Promise<boolean> => {
    const confirmed = window.confirm(`Удалить врача «${doctor.fullName}»?`);

    if (!confirmed) {
      return false;
    }

    setDeletingId(doctor.id);

    try {
      await doctorService.delete(doctor.id);

      onSuccess(`Врач «${doctor.fullName}» успешно удалён`);

      return true;
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.status === 409
          ? 'Нельзя удалить врача, у которого есть приёмы.'
          : (error.response?.data?.message ?? 'Не удалось удалить врача.')
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
