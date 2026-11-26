import { useState } from 'react';

import type { Gender } from '@/entities/patient';

import { usePagination } from '@/shared/lib/hooks';

export const usePatientsParams = () => {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');

  const { page, limit, setPage, updateLimit } = usePagination();

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateGender = (value: Gender | '') => {
    setGender(value);
    setPage(1);
  };

  return {
    search,
    gender,
    page,
    limit,
    updateSearch,
    updateGender,
    updateLimit,
    setPage,
  };
};
