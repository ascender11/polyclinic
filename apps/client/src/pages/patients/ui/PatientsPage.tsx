import { PatientsTableWidget } from '@/widgets/patients-table';

export const PatientsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Пациенты</h2>

      <p className="mt-1 text-sm text-slate-500">Управление пациентами и медицинскими картами</p>
    </div>

    <PatientsTableWidget />
  </div>
);
