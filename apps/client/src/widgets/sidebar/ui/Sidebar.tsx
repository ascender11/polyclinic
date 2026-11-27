import { NavLink } from 'react-router';

import { SIDEBAR_NAVIGATION } from '../model/constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarContent = ({ onNavigate }: { onNavigate: () => void }) => (
  <>
    <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
        +
      </div>

      <div>
        <p className="text-base font-bold tracking-tight text-slate-900">Поликлиника</p>
        <p className="text-xs text-slate-500">Панель управления</p>
      </div>
    </div>

    <nav className="flex-1 space-y-1 px-3 py-6">
      <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">Меню</p>

      {SIDEBAR_NAVIGATION.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
              isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            ].join(' ')
          }
        >
          <span className="flex size-7 items-center justify-center text-lg">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="border-t border-slate-200 p-5">
      <p className="text-xs text-slate-400">Система управления</p>
      <p className="mt-1 text-sm font-medium text-slate-600">Поликлиника</p>
    </div>
  </>
);

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => (
  <>
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <SidebarContent onNavigate={() => undefined} />
    </aside>

    {isOpen && (
      <div className="fixed inset-0 z-50 flex lg:hidden">
        <button
          type="button"
          aria-label="Закрыть меню"
          className="absolute inset-0 bg-slate-950/40"
          onClick={onClose}
        />

        <aside className="relative flex w-72 max-w-[85vw] flex-col bg-white shadow-xl">
          <SidebarContent onNavigate={onClose} />
        </aside>
      </div>
    )}
  </>
);
