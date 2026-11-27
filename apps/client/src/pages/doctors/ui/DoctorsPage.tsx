import { DoctorsTableWidget } from '@/widgets/doctors-table';

export const DoctorsPage = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Врачи</h2>

      <p className="mt-1 text-sm text-slate-500">Управление врачами поликлиники</p>
    </div>

    <DoctorsTableWidget />
  </div>
);
