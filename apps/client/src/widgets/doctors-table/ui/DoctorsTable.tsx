import type { Doctor } from '@/entities/doctor';
import { DoctorCategoryBadge } from '@/entities/doctor';

import type { DataTableColumn } from '@/shared/ui/data-table';
import { DataTable } from '@/shared/ui/data-table';

interface DoctorsTableProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const columns: DataTableColumn<Doctor>[] = [
  { key: 'fullName', header: 'Врач', cell: (doctor) => doctor.fullName, cellClassName: 'font-medium text-slate-900' },
  { key: 'specialty', header: 'Специальность', cell: (doctor) => doctor.specialty },
  { key: 'category', header: 'Категория', cell: (doctor) => <DoctorCategoryBadge category={doctor.category} /> },
];

export const DoctorsTable = ({ doctors, isLoading, error, onRetry }: DoctorsTableProps) => (
  <DataTable
    columns={columns}
    rows={doctors}
    getRowKey={(doctor) => doctor.id}
    isLoading={isLoading}
    error={error}
    onRetry={onRetry}
    loadingText="Загрузка врачей..."
    emptyText="Врачи не найдены"
  />
);
