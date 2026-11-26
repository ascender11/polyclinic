import { useState } from 'react';

export const usePagination = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const updateLimit = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  return {
    page,
    limit,
    setPage,
    updateLimit,
  };
};
