import type { Appointment } from '@/entities/appointment';
import { DeleteAppointmentButton } from '@/features/delete-appointment';

import type { DataTableColumn } from '@/shared/ui/data-table';
import { DataTable } from '@/shared/ui/data-table';

interface AppointmentsTableProps {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  deletingId: number | null;
  onRetry: () => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);

export const AppointmentsTable = ({
  appointments,
  isLoading,
  error,
  deletingId,
  onRetry,
  onEdit,
  onDelete,
}: AppointmentsTableProps) => {
  const columns: DataTableColumn<Appointment>[] = [
    {
      key: 'ticketNumber',
      header: 'Талон',
      cell: (appointment) => `№ ${appointment.ticketNumber}`,
      cellClassName: 'font-medium text-slate-900',
    },
    {
      key: 'visitDate',
      header: 'Дата посещения',
      cell: (appointment) => formatDate(appointment.visitDate),
    },
    {
      key: 'patient',
      header: 'Пациент',
      cell: (appointment) => appointment.patient.fullName,
    },
    {
      key: 'doctor',
      header: 'Врач',
      cell: (appointment) => (
        <div>
          <p>{appointment.doctor.fullName}</p>
          <p className="text-xs text-slate-400">{appointment.doctor.specialty}</p>
        </div>
      ),
      wrap: true,
    },
    {
      key: 'diagnosis',
      header: 'Диагноз',
      cell: (appointment) => (
        <div>
          <p>{appointment.diagnosis.name}</p>
          <p className="text-xs text-slate-400">{appointment.diagnosis.code}</p>
        </div>
      ),
      wrap: true,
    },
    {
      key: 'purpose',
      header: 'Цель посещения',
      cell: (appointment) => appointment.purpose,
      wrap: true,
    },
    {
      key: 'cost',
      header: 'Стоимость',
      cell: (appointment) => `${appointment.cost.toLocaleString('ru-RU')} ₽`,
    },
    {
      key: 'actions',
      header: 'Действия',
      cell: (appointment) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(appointment)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Изменить
          </button>

          <DeleteAppointmentButton isDeleting={deletingId === appointment.id} onDelete={() => onDelete(appointment)} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={appointments}
      getRowKey={(appointment) => appointment.id}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      loadingText="Загрузка приёмов..."
      emptyText="Приёмы не найдены"
    />
  );
};
