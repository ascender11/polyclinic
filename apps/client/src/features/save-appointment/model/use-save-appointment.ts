import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import type { Appointment } from '@/entities/appointment';
import { appointmentService, CreateAppointmentSchema } from '@/entities/appointment';
import type { Diagnosis } from '@/entities/diagnosis';
import { diagnosisService } from '@/entities/diagnosis';
import type { Doctor } from '@/entities/doctor';
import { doctorService } from '@/entities/doctor';
import type { Patient } from '@/entities/patient';
import { patientService } from '@/entities/patient';

interface UseSaveAppointmentOptions {
  appointment: Appointment | null;
  onSaved: (message: string) => void;
}

interface AppointmentFormValues {
  ticketNumber: string;
  visitDate: string;
  purpose: string;
  cost: string;
  doctorId: string;
  patientId: string;
  diagnosisId: string;
}

type AppointmentFormErrors = Partial<Record<keyof AppointmentFormValues, string>>;

interface References {
  doctors: Doctor[];
  patients: Patient[];
  diagnoses: Diagnosis[];
}

const toLocalDateTime = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const getInitialValues = (appointment: Appointment | null): AppointmentFormValues => ({
  ticketNumber: appointment ? String(appointment.ticketNumber) : '',
  visitDate: appointment ? toLocalDateTime(appointment.visitDate) : '',
  purpose: appointment?.purpose ?? '',
  cost: appointment ? String(appointment.cost) : '0',
  doctorId: appointment ? String(appointment.doctorId) : '',
  patientId: appointment ? String(appointment.patientId) : '',
  diagnosisId: appointment ? String(appointment.diagnosisId) : '',
});

export const useSaveAppointment = ({ appointment, onSaved }: UseSaveAppointmentOptions) => {
  const [values, setValues] = useState<AppointmentFormValues>(() => getInitialValues(appointment));
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReferences, setIsLoadingReferences] = useState(true);
  const [references, setReferences] = useState<References>({
    doctors: [],
    patients: [],
    diagnoses: [],
  });

  useEffect(() => {
    setValues(getInitialValues(appointment));
    setErrors({});
    setSubmitError(null);
  }, [appointment]);

  useEffect(() => {
    const controller = new AbortController();

    const loadReferences = async () => {
      setIsLoadingReferences(true);

      try {
        const [doctors, patients, diagnoses] = await Promise.all([
          doctorService.getAll({ page: 1, limit: 100 }, controller.signal),
          patientService.getAll({ page: 1, limit: 100 }, controller.signal),
          diagnosisService.getAll({ page: 1, limit: 100 }, controller.signal),
        ]);

        setReferences({
          doctors: doctors.data,
          patients: patients.data,
          diagnoses: diagnoses.data,
        });
      } catch {
        if (!controller.signal.aborted) {
          setSubmitError('Не удалось загрузить справочники. Попробуйте закрыть и открыть форму снова.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingReferences(false);
        }
      }
    };

    void loadReferences();

    return () => controller.abort();
  }, []);

  const updateField = <K extends keyof AppointmentFormValues>(field: K, value: AppointmentFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(null);
  };

  const submit = async (): Promise<boolean> => {
    const result = CreateAppointmentSchema.safeParse({
      ticketNumber: Number(values.ticketNumber),
      visitDate: values.visitDate,
      purpose: values.purpose,
      cost: Number(values.cost),
      doctorId: Number(values.doctorId),
      patientId: Number(values.patientId),
      diagnosisId: Number(values.diagnosisId),
    });

    if (!result.success) {
      const nextErrors: AppointmentFormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === 'string' && field in values && !nextErrors[field as keyof AppointmentFormValues]) {
          nextErrors[field as keyof AppointmentFormValues] = issue.message;
        }
      }

      setErrors(nextErrors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      if (appointment) {
        await appointmentService.update(appointment.id, result.data);
        onSaved('Данные приёма успешно обновлены');
      } else {
        await appointmentService.create(result.data);
        onSaved('Приём успешно добавлен');
      }

      return true;
    } catch (error) {
      setSubmitError(
        isAxiosError<{ message?: string }>(error)
          ? (error.response?.data?.message ?? 'Не удалось сохранить приём.')
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
    isLoadingReferences,
    references,
    updateField,
    submit,
  };
};
