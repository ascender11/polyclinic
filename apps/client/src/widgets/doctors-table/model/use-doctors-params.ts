import { useState } from 'react';

import type { DoctorCategory } from '@/entities/doctor';

import { usePagination } from '@/shared/lib/hooks';

export const useDoctorsParams = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DoctorCategory | ''>('');

  const { page, limit, setPage, updateLimit } = usePagination();

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateCategory = (value: DoctorCategory | '') => {
    setCategory(value);
    setPage(1);
  };

  return {
    search,
    category,
    page,
    limit,
    updateSearch,
    updateCategory,
    updateLimit,
    setPage,
  };
};
