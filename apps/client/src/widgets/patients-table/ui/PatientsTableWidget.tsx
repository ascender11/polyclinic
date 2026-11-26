import { FilterPatients } from '@/features/filter-patients';
import { SearchPatients } from '@/features/search-patients';

import { PageSizeSelect, Pagination } from '@/shared/ui/pagination';

import { usePatientsList } from '../model/use-patients-list';
import { usePatientsParams } from '../model/use-patients-params';
import { PatientsTable } from './PatientsTable';

export const PatientsTableWidget = () => {
  const { search, gender, page, limit, updateSearch, updateGender, updateLimit, setPage } = usePatientsParams();

  const { patients, total, totalPages, isLoading, error, retry } = usePatientsList({
    page,
    limit,
    search: search || undefined,
    gender: gender || undefined,
  });

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-slate-900">Список пациентов</h2>
          <p className="mt-1 text-sm text-slate-500">Поиск и фильтрация пациентов поликлиники</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchPatients value={search} onChange={updateSearch} />

          <FilterPatients value={gender} onChange={updateGender} />

          <PageSizeSelect value={limit} onChange={updateLimit} />
        </div>
      </div>

      <PatientsTable patients={patients} isLoading={isLoading} error={error} onRetry={retry} />

      <footer className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          Всего записей: <span className="font-semibold text-slate-900">{total}</span>
        </p>

        <Pagination page={page} totalPages={totalPages} isLoading={isLoading} onPageChange={setPage} />
      </footer>
    </section>
  );
};
