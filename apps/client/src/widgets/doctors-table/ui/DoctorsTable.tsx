import type { Doctor } from '@/entities/doctor';
import { DoctorCategoryBadge } from '@/entities/doctor';
import { DeleteDoctorButton } from '@/features/delete-doctor';

import type { DataTableColumn } from '@/shared/ui/data-table';
import { DataTable } from '@/shared/ui/data-table';

interface DoctorsTableProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  deletingId: number | null;
  onRetry: () => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
}

export const DoctorsTable = ({
  doctors,
  isLoading,
  error,
  deletingId,
  onRetry,
  onEdit,
  onDelete,
}: DoctorsTableProps) => {
  const columns: DataTableColumn<Doctor>[] = [
    {
      key: 'fullName',
      header: 'Врач',
      cell: (doctor) => doctor.fullName,
      cellClassName: 'font-medium text-slate-900',
    },
    {
      key: 'specialty',
      header: 'Специальность',
      cell: (doctor) => doctor.specialty,
    },
    {
      key: 'category',
      header: 'Категория',
      cell: (doctor) => <DoctorCategoryBadge category={doctor.category} />,
    },
    {
      key: 'actions',
      header: 'Действия',
      cell: (doctor) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(doctor)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Изменить
          </button>

          <DeleteDoctorButton isDeleting={deletingId === doctor.id} onDelete={() => onDelete(doctor)} />
        </div>
      ),
    },
  ];

  return (
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
};
