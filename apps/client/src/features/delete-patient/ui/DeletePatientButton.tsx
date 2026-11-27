interface DeletePatientButtonProps {
  isDeleting: boolean;
  onDelete: () => void;
}

export const DeletePatientButton = ({ isDeleting, onDelete }: DeletePatientButtonProps) => (
  <button
    type="button"
    onClick={onDelete}
    disabled={isDeleting}
    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isDeleting ? 'Удаление...' : 'Удалить'}
  </button>
);
