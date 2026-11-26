import type { Patient } from '@/entities/patient';

import { TableState } from '@/shared/ui/table-state';

interface PatientsTableProps {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

const genderLabels = {
  MALE: 'Мужской',
  FEMALE: 'Женский',
};

const formatDate = (value: Date) => new Intl.DateTimeFormat('ru-RU').format(value);

export const PatientsTable = ({ patients, isLoading, error, onRetry }: PatientsTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">Медицинская карта</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Пациент</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Дата рождения</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Адрес</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Пол</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Скидка</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading || error || patients.length === 0 ? (
              <TableState
                colSpan={6}
                isLoading={isLoading}
                error={error}
                loadingMessage="Загрузка пациентов..."
                emptyMessage="Пациенты не найдены"
                onRetry={onRetry}
              />
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">
                    {patient.medicalCardNumber}
                  </td>

                  <td className="px-6 py-4 font-medium whitespace-nowrap text-slate-900">{patient.fullName}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{formatDate(patient.birthDate)}</td>

                  <td className="px-6 py-4 text-slate-600">{patient.address}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{genderLabels[patient.gender]}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">{patient.discount}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
