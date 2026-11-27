import type { Appointment } from '@/entities/appointment';

import { APPOINTMENT_FORM_LABELS } from '../model/constants';
import { useSaveAppointment } from '../model/use-save-appointment';

interface SaveAppointmentDialogProps {
  appointment: Appointment | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

export const SaveAppointmentDialog = ({ appointment, onClose, onSaved }: SaveAppointmentDialogProps) => {
  const { values, errors, submitError, isSubmitting, isLoadingReferences, references, updateField, submit } =
    useSaveAppointment({ appointment, onSaved });

  const isEditing = appointment !== null;

  const handleSubmit = async () => {
    const isSaved = await submit();

    if (isSaved) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-dialog-title"
        className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2 id="appointment-dialog-title" className="text-xl font-semibold text-slate-900">
            {isEditing ? APPOINTMENT_FORM_LABELS.editTitle : APPOINTMENT_FORM_LABELS.createTitle}
          </h2>

          <p className="mt-1 text-sm text-slate-500">Заполните информацию о посещении пациента.</p>
        </div>

        {isLoadingReferences ? (
          <div className="py-12 text-center text-sm text-slate-500">Загрузка справочников...</div>
        ) : (
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="appointment-ticket" className="mb-2 block text-sm font-medium text-slate-700">
                  {APPOINTMENT_FORM_LABELS.ticketNumber}
                </label>

                <input
                  id="appointment-ticket"
                  type="number"
                  min={1}
                  step={1}
                  value={values.ticketNumber}
                  onChange={(event) => updateField('ticketNumber', event.target.value)}
                  className={fieldClassName}
                  required
                />

                {errors.ticketNumber && <p className="mt-1.5 text-sm text-red-600">{errors.ticketNumber}</p>}
              </div>

              <div>
                <label htmlFor="appointment-date" className="mb-2 block text-sm font-medium text-slate-700">
                  {APPOINTMENT_FORM_LABELS.visitDate}
                </label>

                <input
                  id="appointment-date"
                  type="datetime-local"
                  value={values.visitDate}
                  onChange={(event) => updateField('visitDate', event.target.value)}
                  className={fieldClassName}
                  required
                />

                {errors.visitDate && <p className="mt-1.5 text-sm text-red-600">{errors.visitDate}</p>}
              </div>

              <div>
                <label htmlFor="appointment-doctor" className="mb-2 block text-sm font-medium text-slate-700">
                  {APPOINTMENT_FORM_LABELS.doctor}
                </label>

                <select
                  id="appointment-doctor"
                  value={values.doctorId}
                  onChange={(event) => updateField('doctorId', event.target.value)}
                  className={fieldClassName}
                  required
                >
                  <option value="">Выберите врача</option>
                  {references.doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.fullName} — {doctor.specialty}
                    </option>
                  ))}
                </select>

                {errors.doctorId && <p className="mt-1.5 text-sm text-red-600">{errors.doctorId}</p>}
              </div>

              <div>
                <label htmlFor="appointment-patient" className="mb-2 block text-sm font-medium text-slate-700">
                  {APPOINTMENT_FORM_LABELS.patient}
                </label>

                <select
                  id="appointment-patient"
                  value={values.patientId}
                  onChange={(event) => updateField('patientId', event.target.value)}
                  className={fieldClassName}
                  required
                >
                  <option value="">Выберите пациента</option>
                  {references.patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.fullName} — карта №{patient.medicalCardNumber}
                    </option>
                  ))}
                </select>

                {errors.patientId && <p className="mt-1.5 text-sm text-red-600">{errors.patientId}</p>}
              </div>

              <div>
                <label htmlFor="appointment-diagnosis" className="mb-2 block text-sm font-medium text-slate-700">
                  {APPOINTMENT_FORM_LABELS.diagnosis}
                </label>

                <select
                  id="appointment-diagnosis"
                  value={values.diagnosisId}
                  onChange={(event) => updateField('diagnosisId', event.target.value)}
                  className={fieldClassName}
                  required
                >
                  <option value="">Выберите диагноз</option>
                  {references.diagnoses.map((diagnosis) => (
                    <option key={diagnosis.id} value={diagnosis.id}>
                      {diagnosis.code} — {diagnosis.name}
                    </option>
                  ))}
                </select>

                {errors.diagnosisId && <p className="mt-1.5 text-sm text-red-600">{errors.diagnosisId}</p>}
              </div>

              <div>
                <label htmlFor="appointment-cost" className="mb-2 block text-sm font-medium text-slate-700">
                  {APPOINTMENT_FORM_LABELS.cost}
                </label>

                <input
                  id="appointment-cost"
                  type="number"
                  min={0}
                  step="0.01"
                  value={values.cost}
                  onChange={(event) => updateField('cost', event.target.value)}
                  className={fieldClassName}
                  required
                />

                {errors.cost && <p className="mt-1.5 text-sm text-red-600">{errors.cost}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="appointment-purpose" className="mb-2 block text-sm font-medium text-slate-700">
                {APPOINTMENT_FORM_LABELS.purpose}
              </label>

              <textarea
                id="appointment-purpose"
                value={values.purpose}
                onChange={(event) => updateField('purpose', event.target.value)}
                className={fieldClassName}
                rows={3}
                maxLength={500}
                required
              />

              {errors.purpose && <p className="mt-1.5 text-sm text-red-600">{errors.purpose}</p>}
            </div>

            {submitError && (
              <p role="alert" className="text-sm text-red-600">
                {submitError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                {APPOINTMENT_FORM_LABELS.cancel}
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  isLoadingReferences ||
                  references.doctors.length === 0 ||
                  references.patients.length === 0 ||
                  references.diagnoses.length === 0
                }
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? 'Сохранение...'
                  : isEditing
                    ? APPOINTMENT_FORM_LABELS.submitEdit
                    : APPOINTMENT_FORM_LABELS.submitCreate}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
