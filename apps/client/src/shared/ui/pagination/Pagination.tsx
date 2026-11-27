interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

const buttonClass =
  'rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40';

export const Pagination = ({ page, totalPages, total, isLoading = false, onPageChange }: PaginationProps) => (
  <footer className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <p className="text-sm text-slate-500">
      Всего записей: <span className="font-semibold text-slate-900">{total}</span>
    </p>

    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={isLoading || page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={buttonClass}
      >
        Назад
      </button>

      <span className="min-w-28 text-center text-sm text-slate-500">
        {totalPages === 0 ? 0 : page} из {totalPages}
      </span>

      <button
        type="button"
        disabled={isLoading || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={buttonClass}
      >
        Далее
      </button>
    </div>
  </footer>
);
