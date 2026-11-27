import type { ReactNode } from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  cellClassName?: string;
  wrap?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  loadingText?: string;
  emptyText?: string;
}

export const DataTable = <T,>({
  columns,
  rows,
  getRowKey,
  isLoading,
  error,
  onRetry,
  loadingText = 'Загрузка...',
  emptyText = 'Ничего не найдено',
}: DataTableProps<T>) => {
  const renderStatus = (content: ReactNode) => (
    <tr>
      <td colSpan={columns.length} className="px-6 py-16 text-center">
        {content}
      </td>
    </tr>
  );

  const renderBody = () => {
    if (isLoading) {
      return renderStatus(
        <div className="flex items-center justify-center gap-3 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
          {loadingText}
        </div>
      );
    }

    if (error) {
      return renderStatus(
        <>
          <p className="font-medium text-red-600">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Попробовать снова
          </button>
        </>
      );
    }

    if (rows.length === 0) {
      return renderStatus(<span className="text-slate-500">{emptyText}</span>);
    }

    return rows.map((row) => (
      <tr key={getRowKey(row)} className="transition-colors hover:bg-slate-50/80">
        {columns.map((column) => (
          <td
            key={column.key}
            className={`px-6 py-4 ${column.wrap ? '' : 'whitespace-nowrap'} ${column.cellClassName ?? 'text-slate-600'}`}
          >
            {column.cell(row)}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 font-semibold text-slate-600">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">{renderBody()}</tbody>
        </table>
      </div>
    </div>
  );
};
