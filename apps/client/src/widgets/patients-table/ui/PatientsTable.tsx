import type { Patient } from '@/entities/patient';

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
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="flex items-center justify-center gap-3 text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                    Загрузка пациентов...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
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
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                  Пациенты не найдены
                </td>
              </tr>
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
