import { useState } from 'react';

import type { Gender } from '@/entities/patient';

export const usePatientsParams = () => {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateGender = (value: Gender | '') => {
    setGender(value);
    setPage(1);
  };

  const updateLimit = (value: number) => {
    setLimit(value);
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
