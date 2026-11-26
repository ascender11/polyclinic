interface TableStateProps {
  colSpan: number;
  isLoading: boolean;
  error: string | null;
  loadingMessage: string;
  emptyMessage: string;
  onRetry: () => void;
}

export const TableState = ({ colSpan, isLoading, error, loadingMessage, emptyMessage, onRetry }: TableStateProps) => {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-16 text-center">
        {isLoading ? (
          <div className="flex items-center justify-center gap-3 text-slate-500">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
            {loadingMessage}
          </div>
        ) : error ? (
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
        ) : (
          <p className="text-slate-500">{emptyMessage}</p>
        )}
      </td>
    </tr>
  );
};
