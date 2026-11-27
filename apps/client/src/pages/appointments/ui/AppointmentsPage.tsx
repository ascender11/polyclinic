import { useState } from 'react';

import type { Appointment } from '@/entities/appointment';
import { useDeleteAppointment } from '@/features/delete-appointment';
import { SaveAppointmentDialog } from '@/features/save-appointment';
import { AppointmentsTableWidget } from '@/widgets/appointments-table';

export const AppointmentsPage = () => {
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { deletingId, remove } = useDeleteAppointment({
    onSuccess: setNotification,
    onError: setNotification,
  });

  const openCreateDialog = () => {
    setEditingAppointment(null);
    setIsSaveDialogOpen(true);
  };

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsSaveDialogOpen(true);
  };

  const closeSaveDialog = () => {
    setIsSaveDialogOpen(false);
    setEditingAppointment(null);
  };

  const handleSaved = (message: string) => {
    setNotification(message);
    setRefreshKey((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Приёмы</h2>

          <p className="mt-1 text-sm text-slate-500">Управление талонами и посещениями пациентов</p>
        </div>

        <button
          type="button"
          onClick={openCreateDialog}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Добавить приём
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

      <AppointmentsTableWidget
        key={refreshKey}
        deletingId={deletingId}
        onEditAppointment={openEditDialog}
        onDeleteAppointment={remove}
      />

      {isSaveDialogOpen && (
        <SaveAppointmentDialog appointment={editingAppointment} onClose={closeSaveDialog} onSaved={handleSaved} />
      )}
    </div>
  );
};
