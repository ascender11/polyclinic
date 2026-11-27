import { Link } from 'react-router';

import { HOME_SECTIONS } from '../model/constants';

export const Home = () => (
  <div className="space-y-8">
    <section className="overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 to-blue-500 px-6 py-10 text-white sm:px-10">
      <p className="text-sm font-medium text-blue-100">ИНФОРМАЦИОННАЯ СИСТЕМА</p>

      <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">Управление поликлиникой</h2>

      <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
        Единое пространство для управления врачами, пациентами, медицинскими приёмами и диагнозами.
      </p>
    </section>

    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Разделы системы</h2>
        <p className="mt-1 text-sm text-slate-500">Выберите раздел для продолжения работы</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {HOME_SECTIONS.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              {section.icon}
            </div>

            <h3 className="mt-5 font-semibold text-slate-900">{section.title}</h3>

            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{section.description}</p>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600">
              Перейти
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">О системе</h2>

      <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500">
        Система предназначена для автоматизации работы поликлиники. Она позволяет вести учёт врачей и пациентов,
        регистрировать посещения по талонам, хранить диагнозы и информацию о стоимости медицинских услуг.
      </p>
    </section>
  </div>
);
