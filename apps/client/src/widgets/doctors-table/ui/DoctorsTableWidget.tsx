import { FilterDoctors } from '@/features/filter-doctors';
import { SearchDoctors } from '@/features/search-doctors';

import { useDoctorsList } from '../model/use-doctors-list';
import { useDoctorsParams } from '../model/use-doctors-params';
import { DoctorsTable } from './DoctorsTable';

export const DoctorsTableWidget = () => {
  const { search, category, page, limit, updateSearch, updateCategory, updateLimit, setPage } = useDoctorsParams();

  const { doctors, total, totalPages, isLoading, error, retry } = useDoctorsList({
    page,
    limit,
    search: search || undefined,
    category: category || undefined,
  });

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-slate-900">Список врачей</h2>
          <p className="mt-1 text-sm text-slate-500">Поиск и фильтрация медицинского персонала</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchDoctors value={search} onChange={updateSearch} />

          <FilterDoctors value={category} onChange={updateCategory} />

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

      <DoctorsTable doctors={doctors} isLoading={isLoading} error={error} onRetry={retry} />

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
    </section>
  );
};
