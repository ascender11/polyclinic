import { PatientsTableWidget } from '@/widgets/patients-table';

export const PatientsPage = () => (
  <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-col gap-2">
        <span className="text-sm font-medium text-blue-600">ПОЛИКЛИНИКА</span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Пациенты</h1>
        <p className="text-sm text-slate-500">Управление списком пациентов поликлиники</p>
      </header>

      <PatientsTableWidget />
    </div>
  </main>
);
