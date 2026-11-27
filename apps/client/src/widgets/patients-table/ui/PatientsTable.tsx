import type { Patient } from '@/entities/patient';
import { genderLabels } from '@/entities/patient';
import { DeletePatientButton } from '@/features/delete-patient';

import type { DataTableColumn } from '@/shared/ui/data-table';
import { DataTable } from '@/shared/ui/data-table';

interface PatientsTableProps {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  deletingId: number | null;
  onRetry: () => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

const formatDate = (value: Date) => new Intl.DateTimeFormat('ru-RU').format(value);

export const PatientsTable = ({
  patients,
  isLoading,
  error,
  deletingId,
  onRetry,
  onEdit,
  onDelete,
}: PatientsTableProps) => {
  const columns: DataTableColumn<Patient>[] = [
    {
      key: 'medicalCardNumber',
      header: 'Медицинская карта',
      cell: (patient) => patient.medicalCardNumber,
      cellClassName: 'font-medium text-slate-900',
    },
    {
      key: 'fullName',
      header: 'Пациент',
      cell: (patient) => patient.fullName,
      cellClassName: 'font-medium text-slate-900',
    },
    {
      key: 'birthDate',
      header: 'Дата рождения',
      cell: (patient) => formatDate(patient.birthDate),
    },
    {
      key: 'address',
      header: 'Адрес',
      cell: (patient) => patient.address,
      wrap: true,
    },
    {
      key: 'gender',
      header: 'Пол',
      cell: (patient) => genderLabels[patient.gender],
    },
    {
      key: 'discount',
      header: 'Скидка',
      cell: (patient) => `${patient.discount}%`,
    },
    {
      key: 'actions',
      header: 'Действия',
      cell: (patient) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(patient)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Изменить
          </button>

          <DeletePatientButton isDeleting={deletingId === patient.id} onDelete={() => onDelete(patient)} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={patients}
      getRowKey={(patient) => patient.id}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      loadingText="Загрузка пациентов..."
      emptyText="Пациенты не найдены"
    />
  );
};
