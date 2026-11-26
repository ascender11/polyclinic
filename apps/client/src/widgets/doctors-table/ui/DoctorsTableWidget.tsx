import { FilterDoctors } from '@/features/filter-doctors';
import { SearchDoctors } from '@/features/search-doctors';

import { PageSizeSelect, Pagination } from '@/shared/ui/pagination';

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

          <PageSizeSelect value={limit} onChange={updateLimit} />
        </div>
      </div>

      <DoctorsTable doctors={doctors} isLoading={isLoading} error={error} onRetry={retry} />

      <footer className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          Всего записей: <span className="font-semibold text-slate-900">{total}</span>
        </p>

        <Pagination page={page} totalPages={totalPages} isLoading={isLoading} onPageChange={setPage} />
      </footer>
    </section>
  );
};
