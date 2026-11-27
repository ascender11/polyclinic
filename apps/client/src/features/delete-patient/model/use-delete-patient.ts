import { isAxiosError } from 'axios';
import { useState } from 'react';

import type { Patient } from '@/entities/patient';
import { patientService } from '@/entities/patient';

interface UseDeletePatientOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const useDeletePatient = ({ onSuccess, onError }: UseDeletePatientOptions) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const remove = async (patient: Patient): Promise<boolean> => {
    const confirmed = window.confirm(`Удалить пациента «${patient.fullName}»?`);

    if (!confirmed) {
      return false;
    }

    setDeletingId(patient.id);

    try {
      await patientService.delete(patient.id);

      onSuccess(`Пациент «${patient.fullName}» успешно удалён`);

      return true;
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.status === 409
          ? 'Нельзя удалить пациента, у которого есть приёмы.'
          : (error.response?.data?.message ?? 'Не удалось удалить пациента.')
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
