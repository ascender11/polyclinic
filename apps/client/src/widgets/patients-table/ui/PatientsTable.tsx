import type { Patient } from '@/entities/patient';
import { genderLabels } from '@/entities/patient';

import type { DataTableColumn } from '@/shared/ui/data-table';
import { DataTable } from '@/shared/ui/data-table';

interface PatientsTableProps {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const formatDate = (value: Date) => new Intl.DateTimeFormat('ru-RU').format(value);

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
  { key: 'birthDate', header: 'Дата рождения', cell: (patient) => formatDate(patient.birthDate) },
  { key: 'address', header: 'Адрес', cell: (patient) => patient.address, wrap: true },
  { key: 'gender', header: 'Пол', cell: (patient) => genderLabels[patient.gender] },
  { key: 'discount', header: 'Скидка', cell: (patient) => `${patient.discount}%` },
];

export const PatientsTable = ({ patients, isLoading, error, onRetry }: PatientsTableProps) => (
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
