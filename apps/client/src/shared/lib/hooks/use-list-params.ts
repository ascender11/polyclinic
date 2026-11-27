import { useSearchParams } from 'react-router';

export const PAGE_SIZES = [10, 20, 50] as const;

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = PAGE_SIZES[0];

const parsePositiveInt = (value: string | null, fallback: number) => {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

type ParamChanges = Record<string, string | number | null>;

export const useListParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
  const limitParam = parsePositiveInt(searchParams.get('limit'), DEFAULT_LIMIT);
  const limit = PAGE_SIZES.some((size) => size === limitParam) ? limitParam : DEFAULT_LIMIT;

  const update = (changes: ParamChanges, options?: { resetPage?: boolean }) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        const entries = options?.resetPage ? { ...changes, page: null } : changes;

        for (const [key, value] of Object.entries(entries)) {
          if (value === null || value === '' || (key === 'page' && value === DEFAULT_PAGE)) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        }

        return next;
      },
      { replace: true }
    );
  };

  return {
    searchParams,
    search,
    page,
    limit,
    update,
    updateSearch: (value: string) => update({ search: value }, { resetPage: true }),
    updateLimit: (value: number) => update({ limit: value === DEFAULT_LIMIT ? null : value }, { resetPage: true }),
    setPage: (value: number) => update({ page: value }),
  };
};
