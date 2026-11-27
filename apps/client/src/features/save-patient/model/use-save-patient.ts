import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type { Gender, Patient } from '@/entities/patient';
import { CreatePatientSchema, patientService } from '@/entities/patient';

interface UseSavePatientOptions {
  patient: Patient | null;
  onSaved: (message: string) => void;
}

interface PatientFormValues {
  medicalCardNumber: string;
  fullName: string;
  birthDate: string;
  address: string;
  gender: Gender;
  discount: number;
}

type PatientFormErrors = Partial<Record<keyof PatientFormValues, string>>;

const getInitialValues = (patient: Patient | null): PatientFormValues => ({
  medicalCardNumber: patient?.medicalCardNumber ?? '',
  fullName: patient?.fullName ?? '',
  birthDate: patient ? patient.birthDate.toISOString().slice(0, 10) : '',
  address: patient?.address ?? '',
  gender: patient?.gender ?? 'MALE',
  discount: patient?.discount ?? 0,
});

export const useSavePatient = ({ patient, onSaved }: UseSavePatientOptions) => {
  const [values, setValues] = useState<PatientFormValues>(() => getInitialValues(patient));
  const [errors, setErrors] = useState<PatientFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(getInitialValues(patient));
    setErrors({});
    setSubmitError(null);
  }, [patient]);

  const updateField = <K extends keyof PatientFormValues>(field: K, value: PatientFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(null);
  };

  const submit = async (): Promise<boolean> => {
    const result = CreatePatientSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: PatientFormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === 'string' && field in values && !nextErrors[field as keyof PatientFormValues]) {
          nextErrors[field as keyof PatientFormValues] = issue.message;
        }
      }

      setErrors(nextErrors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      if (patient) {
        await patientService.update(patient.id, result.data);
        onSaved('Данные пациента успешно обновлены');
      } else {
        await patientService.create(result.data);
        onSaved('Пациент успешно добавлен');
      }

      return true;
    } catch (error) {
      setSubmitError(
        isAxiosError<{ message?: string }>(error)
          ? (error.response?.data?.message ?? 'Не удалось сохранить данные пациента.')
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
