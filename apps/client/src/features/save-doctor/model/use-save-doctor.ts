import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type { Doctor, DoctorCategory } from '@/entities/doctor';
import { CreateDoctorSchema, doctorService } from '@/entities/doctor';

interface UseSaveDoctorOptions {
  doctor: Doctor | null;
  onSaved: (message: string) => void;
}

interface DoctorFormValues {
  fullName: string;
  specialty: string;
  category: DoctorCategory;
}

type DoctorFormErrors = Partial<Record<keyof DoctorFormValues, string>>;

const getInitialValues = (doctor: Doctor | null): DoctorFormValues => ({
  fullName: doctor?.fullName ?? '',
  specialty: doctor?.specialty ?? '',
  category: doctor?.category ?? 'THIRD',
});

export const useSaveDoctor = ({ doctor, onSaved }: UseSaveDoctorOptions) => {
  const [values, setValues] = useState<DoctorFormValues>(() => getInitialValues(doctor));
  const [errors, setErrors] = useState<DoctorFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(getInitialValues(doctor));
    setErrors({});
    setSubmitError(null);
  }, [doctor]);

  const updateField = <K extends keyof DoctorFormValues>(field: K, value: DoctorFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(null);
  };

  const submit = async (): Promise<boolean> => {
    const result = CreateDoctorSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: DoctorFormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === 'string' && field in values && !nextErrors[field as keyof DoctorFormValues]) {
          nextErrors[field as keyof DoctorFormValues] = issue.message;
        }
      }

      setErrors(nextErrors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      if (doctor) {
        await doctorService.update(doctor.id, result.data);
        onSaved('Данные врача успешно обновлены');
      } else {
        await doctorService.create(result.data);
        onSaved('Врач успешно добавлен');
      }

      return true;
    } catch (error) {
      setSubmitError(
        isAxiosError<{ message?: string }>(error)
          ? (error.response?.data?.message ?? 'Не удалось сохранить данные врача.')
          : 'Произошла непредвиденная ошибка.'
      );

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    submitError,
    isSubmitting,
    updateField,
    submit,
  };
};
