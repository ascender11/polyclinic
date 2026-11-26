import { useState } from 'react';

import type { DoctorCategory } from '@/entities/doctor';

export const useDoctorsParams = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DoctorCategory | ''>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateCategory = (value: DoctorCategory | '') => {
    setCategory(value);
    setPage(1);
  };

  const updateLimit = (value: number) => {
    setLimit(value);
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
