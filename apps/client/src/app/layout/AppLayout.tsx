import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';

import { Sidebar } from '@/widgets/sidebar';

import { routes } from '@/shared/config';

export const PAGE_TITLES: Record<string, string> = {
  [routes.home]: 'Главная',
  [routes.doctors]: 'Врачи',
  [routes.patients]: 'Пациенты',
  [routes.appointments]: 'Приёмы',
  [routes.diagnoses]: 'Диагнозы',
};

export const AppLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Поликлиника';

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Открыть меню"
              className="flex size-10 items-center justify-center rounded-lg text-xl text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              ☰
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
              <p className="hidden text-xs text-slate-500 sm:block">Система управления поликлиникой</p>
            </div>
          </div>

          <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
            П
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white px-8 py-4">
          <p className="text-center text-xs text-slate-400">Система управления поликлиникой</p>
        </footer>
      </div>
    </div>
  );
};
