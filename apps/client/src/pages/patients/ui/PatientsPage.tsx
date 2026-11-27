import { useState } from 'react';

import type { Patient } from '@/entities/patient';
import { useDeletePatient } from '@/features/delete-patient';
import { SavePatientDialog } from '@/features/save-patient';
import { PatientsTableWidget } from '@/widgets/patients-table';

export const PatientsPage = () => {
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { deletingId, remove } = useDeletePatient({
    onSuccess: setNotification,
    onError: setNotification,
  });

  const openCreateDialog = () => {
    setEditingPatient(null);
    setIsSaveDialogOpen(true);
  };

  const openEditDialog = (patient: Patient) => {
    setEditingPatient(patient);
    setIsSaveDialogOpen(true);
  };

  const closeSaveDialog = () => {
    setIsSaveDialogOpen(false);
    setEditingPatient(null);
  };

  const handleSaved = (message: string) => {
    setNotification(message);
    setRefreshKey((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Пациенты</h2>

          <p className="mt-1 text-sm text-slate-500">Управление пациентами и медицинскими картами</p>
        </div>

        <button
          type="button"
          onClick={openCreateDialog}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Добавить пациента
        </button>
      </div>

      {notification && (
        <div
          role="status"
          className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
        >
          <span>{notification}</span>

          <button
            type="button"
            onClick={() => setNotification(null)}
            className="font-medium text-slate-500 hover:text-slate-900"
          >
            Закрыть
          </button>
        </div>
      )}

      <PatientsTableWidget
        key={refreshKey}
        deletingId={deletingId}
        onEditPatient={openEditDialog}
        onDeletePatient={remove}
      />

      {isSaveDialogOpen && (
        <SavePatientDialog patient={editingPatient} onClose={closeSaveDialog} onSaved={handleSaved} />
      )}
    </div>
  );
};
