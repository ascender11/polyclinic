import { GenderSelect } from '@/entities/patient';

import { PAGE_SIZES } from '@/shared/lib/hooks';
import { PageSizeSelect, Pagination } from '@/shared/ui/pagination';
import { SearchInput } from '@/shared/ui/search-input';

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
          <SearchInput value={search} onChange={updateSearch} placeholder="Поиск по ФИО, номеру карты или адресу..." />

          <GenderSelect value={gender} onChange={updateGender} />

          <PageSizeSelect value={limit} options={PAGE_SIZES} onChange={updateLimit} />
        </div>
      </div>

      <PatientsTable patients={patients} isLoading={isLoading} error={error} onRetry={retry} />

      <Pagination page={page} totalPages={totalPages} total={total} isLoading={isLoading} onPageChange={setPage} />
    </section>
  );
};
