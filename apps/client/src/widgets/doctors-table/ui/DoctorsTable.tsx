import type { Doctor } from '@/entities/doctor';

import { TableState } from '@/shared/ui/table-state';

interface DoctorsTableProps {
  doctors: Doctor[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

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
            {isLoading || error || doctors.length === 0 ? (
              <TableState
                colSpan={3}
                isLoading={isLoading}
                error={error}
                loadingMessage="Загрузка врачей..."
                emptyMessage="Врачи не найдены"
                onRetry={onRetry}
              />
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">{doctor.fullName}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{doctor.specialty}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{categoryLabels[doctor.category]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
