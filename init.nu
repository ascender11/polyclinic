
[
  "apps/client/src/features/manage-patient/ui"
] | each { |path| mkdir $path }


```
import { useState } from 'react';

import { CreatePatientSchema } from '@/entities/patient';
import type { CreatePatientInput, Patient } from '@/entities/patient';

interface PatientFormProps {
  patient: Patient | null;
  isSubmitting: boolean;
  onSubmit: (input: CreatePatientInput) => Promise<void>;
  onCancel: () => void;
}
const getDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const PatientForm = ({ patient, isSubmitting, onSubmit, onCancel }: PatientFormProps) => {
  const [medicalCardNumber, setMedicalCardNumber] = useState(patient?.medicalCardNumber ?? '');
  const [fullName, setFullName] = useState(patient?.fullName ?? '');
  const [birthDate, setBirthDate] = useState(patient ? getDateValue(patient.birthDate) : '');
  const [address, setAddress] = useState(patient?.address ?? '');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>(patient?.gender ?? 'MALE');
  const [discount, setDiscount] = useState(String(patient?.discount ?? 0));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = CreatePatientSchema.safeParse({
      medicalCardNumber,
      fullName,
      birthDate: new Date(`${birthDate}T00:00:00`),
      address,
      gender,
      discount: Number(discount),
    });

    if (!result.success) {
      const nextErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});
    await onSubmit(result.data);
  };

  const inputClassName =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

  const renderError = (field: string) =>
    errors[field] ? <p className="mt-1 text-xs text-red-600">{errors[field]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="medicalCardNumber" className="mb-1.5 block text-sm font-medium text-slate-700">
          Номер медицинской карты
        </label>
        <input
          id="medicalCardNumber"
          value={medicalCardNumber}
          onChange={(event) => setMedicalCardNumber(event.target.value)}
          className={inputClassName}
          maxLength={30}
          required
        />
        {renderError('medicalCardNumber')}
      </div>

      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
          ФИО
        </label>
        <input
          id="fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className={inputClassName}
          maxLength={120}
          required
        />
        {renderError('fullName')}
      </div>

      <div>
        <label htmlFor="birthDate" className="mb-1.5 block text-sm font-medium text-slate-700">
          Дата рождения
        </label>
        <input
          id="birthDate"
          type="date"
          value={birthDate}
          max={getDateValue(new Date())}
          onChange={(event) => setBirthDate(event.target.value)}
          className={inputClassName}
          required
        />
        {renderError('birthDate')}
      </div>

      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-slate-700">
          Адрес
        </label>
        <input
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className={inputClassName}
          maxLength={255}
          required
        />
        {renderError('address')}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-slate-700">
            Пол
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value as 'MALE' | 'FEMALE')}
            className={inputClassName}
          >
            <option value="MALE">Мужской</option>
            <option value="FEMALE">Женский</option>
          </select>
        </div>

        <div>
          <label htmlFor="discount" className="mb-1.5 block text-sm font-medium text-slate-700">
            Скидка, %
          </label>
          <input
            id="discount"
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            className={inputClassName}
            required
          />
          {renderError('discount')}
        </div>
      </div>

      <div className="flex flex-col-reverse justify-end gap-3 pt-3 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Отмена
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Сохранение...' : patient ? 'Сохранить изменения' : 'Создать пациента'}
        </button>
      </div>
    </form>
  );
};
'@ | save -f "apps/client/src/features/manage-patient/ui/PatientForm.tsx"

@'
export { PatientForm } from './ui/PatientForm';
'@ | save -f "apps/client/src/features/manage-patient/index.ts"

@'
import type { Patient } from '@/entities/patient';

interface PatientsTableProps {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  deletingId: number | null;
}

const genderLabels = {
  MALE: 'Мужской',
  FEMALE: 'Женский',
};

const formatDate = (value: Date) => new Intl.DateTimeFormat('ru-RU').format(value);

export const PatientsTable = ({
  patients,
  isLoading,
  error,
  onRetry,
  onEdit,
  onDelete,
  deletingId,
}: PatientsTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">Медицинская карта</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Пациент</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Дата рождения</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Адрес</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Пол</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Скидка</th>
              <th className="px-6 py-4 text-right font-semibold text-slate-600">Действия</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex items-center justify-center gap-3 text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                    Загрузка пациентов...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <p className="font-medium text-red-600">{error}</p>
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Попробовать снова
                  </button>
                </td>
              </tr>
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                  Пациенты не найдены
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">
                    {patient.medicalCardNumber}
                  </td>

                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">
                    {patient.fullName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {formatDate(patient.birthDate)}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{patient.address}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {genderLabels[patient.gender]}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {patient.discount}%
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(patient)}
                        disabled={deletingId !== null}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                      >
                        Изменить
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(patient)}
                        disabled={deletingId !== null}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === patient.id ? 'Удаление...' : 'Удалить'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
'@ | save -f "apps/client/src/widgets/patients-table/ui/PatientsTable.tsx"

@'
import { isAxiosError } from 'axios';
import { useState } from 'react';

import { patientService } from '@/entities/patient';
import type { CreatePatientInput, Patient } from '@/entities/patient';
import { PatientForm } from '@/features/manage-patient';

import { usePatientsList } from '../model/use-patients-list';
import { usePatientsParams } from '../model/use-patients-params';
import { PatientsTable } from './PatientsTable';

const getErrorMessage = (error: unknown) => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string') {
      return message;
    }

    if (error.response?.status === 409) {
      return 'Невозможно выполнить операцию: запись связана с другими данными.';
    }
  }

  return error instanceof Error ? error.message : 'Произошла непредвиденная ошибка.';
};

export const PatientsTableWidget = () => {
  const {
    search,
    gender,
    page,
    limit,
    updateSearch,
    updateGender,
    updateLimit,
    setPage,
  } = usePatientsParams();

  const { patients, total, totalPages, isLoading, error, retry } = usePatientsList({
    page,
    limit,
    search: search || undefined,
    gender: gender || undefined,
  });

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const openCreateForm = () => {
    setSelectedPatient(null);
    setNotification(null);
    setIsFormOpen(true);
  };

  const openEditForm = (patient: Patient) => {
    setSelectedPatient(patient);
    setNotification(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (isSubmitting) return;

    setIsFormOpen(false);
    setSelectedPatient(null);
  };

  const handleSubmit = async (input: CreatePatientInput) => {
    setIsSubmitting(true);
    setNotification(null);

    try {
      if (selectedPatient) {
        await patientService.update(selectedPatient.id, input);
        setNotification('Данные пациента успешно обновлены.');
      } else {
        await patientService.create(input);
        setNotification('Пациент успешно добавлен.');
      }

      setIsFormOpen(false);
      setSelectedPatient(null);
      retry();
    } catch (submitError) {
      setNotification(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (patient: Patient) => {
    const confirmed = window.confirm(
      `Удалить пациента «${patient.fullName}»? Это действие нельзя отменить.`,
    );

    if (!confirmed) return;

    setDeletingId(patient.id);
    setNotification(null);

    try {
      await patientService.delete(patient.id);
      setNotification(`Пациент «${patient.fullName}» удалён.`);
      retry();
    } catch (deleteError) {
      setNotification(getErrorMessage(deleteError));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">Список пациентов</h2>
            <p className="mt-1 text-sm text-slate-500">
              Поиск и фильтрация пациентов поликлиники
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Добавить пациента
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchPatients value={search} onChange={updateSearch} />

          <FilterPatients value={gender} onChange={updateGender} />

          <select
            value={limit}
            onChange={(event) => updateLimit(Number(event.target.value))}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            <option value={10}>10 записей</option>
            <option value={20}>20 записей</option>
            <option value={50}>50 записей</option>
          </select>
        </div>
      </div>

      {notification && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
        >
          <p>{notification}</p>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 transition hover:text-slate-700"
            aria-label="Закрыть уведомление"
          >
            ×
          </button>
        </div>
      )}

      <PatientsTable
        patients={patients}
        isLoading={isLoading}
        error={error}
        onRetry={retry}
        onEdit={openEditForm}
        onDelete={handleDelete}
        deletingId={deletingId}
      />

      <footer className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          Всего записей: <span className="font-semibold text-slate-900">{total}</span>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isLoading || page <= 1}
            onClick={() => setPage((value) => value - 1)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Назад
          </button>

          <span className="min-w-28 text-center text-sm text-slate-500">
            {totalPages === 0 ? 0 : page} из {totalPages}
          </span>

          <button
            type="button"
            disabled={isLoading || page >= totalPages}
            onClick={() => setPage((value) => value + 1)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Далее
          </button>
        </div>
      </footer>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="patient-form-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-6">
              <h2 id="patient-form-title" className="text-lg font-semibold text-slate-900">
                {selectedPatient ? 'Редактирование пациента' : 'Новый пациент'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Заполните информацию о пациенте.
              </p>
            </div>

            <PatientForm
              patient={selectedPatient}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
    </section>
  );
};
``` | save -f "apps/client/src/widgets/patients-table/ui/PatientsTableWidget.tsx"
