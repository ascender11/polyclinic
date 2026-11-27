import { useEffect, useState } from 'react';

import { useDebouncedValue } from '@/shared/lib/hooks';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
}

export const SearchInput = ({ value, onChange, placeholder = 'Поиск...', delay = 300 }: SearchInputProps) => {
  const [search, setSearch] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const debounced = useDebouncedValue(search.trim(), delay);

  if (value !== prevValue) {
    setPrevValue(value);
    setSearch(value);
  }

  useEffect(() => {
    if (debounced !== value) {
      onChange(debounced);
    }
  }, [debounced]);

  return (
    <div className="relative min-w-0 flex-1">
      <svg
        className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-11 text-sm text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};
