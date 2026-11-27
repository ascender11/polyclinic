import type { Appointment } from '@/entities/appointment';

import { PAGE_SIZES } from '@/shared/lib/hooks';
import { PageSizeSelect, Pagination } from '@/shared/ui/pagination';
import { SearchInput } from '@/shared/ui/search-input';

import { useAppointmentsList } from '../model/use-appointments-list';
import { useAppointmentsParams } from '../model/use-appointments-params';
import { AppointmentsTable } from './AppointmentsTable';

interface AppointmentsTableWidgetProps {
  deletingId: number | null;
  onEditAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (appointment: Appointment) => Promise<boolean>;
}

export const AppointmentsTableWidget = ({
  deletingId,
  onEditAppointment,
  onDeleteAppointment,
}: AppointmentsTableWidgetProps) => {
  const { search, dateFrom, dateTo, page, limit, updateSearch, updateDateFrom, updateDateTo, updateLimit, setPage } =
    useAppointmentsParams();

  const { appointments, total, totalPages, isLoading, error, retry } = useAppointmentsList({
    page,
    limit,
    search: search || undefined,
    dateFrom: dateFrom ? `${dateFrom}T00:00:00` : undefined,
    dateTo: dateTo ? `${dateTo}T23:59:59.999` : undefined,
  });

  const handleDelete = async (appointment: Appointment) => {
    const deleted = await onDeleteAppointment(appointment);

    if (deleted) {
      retry();
    }
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-slate-900">Список приёмов</h2>

          <p className="mt-1 text-sm text-slate-500">Поиск и фильтрация талонов и посещений пациентов</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <SearchInput
              value={search}
              onChange={updateSearch}
              placeholder="Поиск по талону, пациенту, врачу или диагнозу..."
            />
          </div>

          <input
            aria-label="Дата посещения от"
            type="date"
            value={dateFrom}
            onChange={(event) => updateDateFrom(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <input
            aria-label="Дата посещения до"
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={(event) => updateDateTo(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <div className="sm:col-span-2 lg:col-span-4">
            <PageSizeSelect value={limit} options={PAGE_SIZES} onChange={updateLimit} />
          </div>
        </div>
      </div>

      <AppointmentsTable
        appointments={appointments}
        isLoading={isLoading}
        error={error}
        deletingId={deletingId}
        onRetry={retry}
        onEdit={onEditAppointment}
        onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} total={total} isLoading={isLoading} onPageChange={setPage} />
    </section>
  );
};
