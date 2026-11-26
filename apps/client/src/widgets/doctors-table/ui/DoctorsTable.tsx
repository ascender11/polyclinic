import type { Doctor } from '@/entities/doctor';

interface DoctorsTableProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const categoryStyles = {
  FIRST: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  SECOND: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  THIRD: 'bg-amber-50 text-amber-700 ring-amber-600/20',
};

const categoryLabels = {
  FIRST: 'Первая',
  SECOND: 'Вторая',
  THIRD: 'Третья',
};

export const DoctorsTable = ({ doctors, isLoading, error, onRetry }: DoctorsTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">Врач</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Специальность</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Категория</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-6 py-16 text-center">
                  <div className="flex items-center justify-center gap-3 text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                    Загрузка врачей...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="px-6 py-16 text-center">
                  <p className="font-medium text-red-600">{error}</p>
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Попробовать снова
                  </button>
                </td>
              </tr>
            ) : doctors.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-16 text-center text-slate-500">
                  Врачи не найдены
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">{doctor.fullName}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{doctor.specialty}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${categoryStyles[doctor.category]}`}
                    >
                      {categoryLabels[doctor.category]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
