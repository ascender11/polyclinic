import { useState } from 'react';

import type { Doctor } from '@/entities/doctor';
import { useDeleteDoctor } from '@/features/delete-doctor';
import { SaveDoctorDialog } from '@/features/save-doctor';
import { DoctorsTableWidget } from '@/widgets/doctors-table';

export const DoctorsPage = () => {
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { deletingId, remove } = useDeleteDoctor({
    onSuccess: setNotification,
    onError: setNotification,
  });

  const openCreateDialog = () => {
    setEditingDoctor(null);
    setIsSaveDialogOpen(true);
  };

  const openEditDialog = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsSaveDialogOpen(true);
  };

  const closeSaveDialog = () => {
    setIsSaveDialogOpen(false);
    setEditingDoctor(null);
  };

  const handleSaved = (message: string) => {
    setNotification(message);
    setRefreshKey((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Врачи</h2>

          <p className="mt-1 text-sm text-slate-500">Управление врачами поликлиники</p>
        </div>

        <button
          type="button"
          onClick={openCreateDialog}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Добавить врача
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

      <DoctorsTableWidget
        key={refreshKey}
        deletingId={deletingId}
        onEditDoctor={openEditDialog}
        onDeleteDoctor={remove}
      />

      {isSaveDialogOpen && <SaveDoctorDialog doctor={editingDoctor} onClose={closeSaveDialog} onSaved={handleSaved} />}
    </div>
  );
};
