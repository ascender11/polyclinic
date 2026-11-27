import type { Doctor, DoctorCategory } from '@/entities/doctor';
import { doctorCategories, doctorCategoryConfig } from '@/entities/doctor';

import { DOCTOR_FORM_LABELS } from '../model/constants';
import { useSaveDoctor } from '../model/use-save-doctor';

interface SaveDoctorDialogProps {
  doctor: Doctor | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

export const SaveDoctorDialog = ({ doctor, onClose, onSaved }: SaveDoctorDialogProps) => {
  const { values, errors, submitError, isSubmitting, updateField, submit } = useSaveDoctor({ doctor, onSaved });

  const isEditing = doctor !== null;

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
        aria-labelledby="doctor-dialog-title"
        className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2 id="doctor-dialog-title" className="text-xl font-semibold text-slate-900">
            {isEditing ? DOCTOR_FORM_LABELS.editTitle : DOCTOR_FORM_LABELS.createTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Заполните информацию о медицинском специалисте.</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <div>
            <label htmlFor="doctor-full-name" className="mb-2 block text-sm font-medium text-slate-700">
              {DOCTOR_FORM_LABELS.fullName}
            </label>
            <input
              id="doctor-full-name"
              value={values.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              placeholder={DOCTOR_FORM_LABELS.fullNamePlaceholder}
              className={fieldClassName}
              maxLength={120}
              required
            />
            {errors.fullName && <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="doctor-specialty" className="mb-2 block text-sm font-medium text-slate-700">
              {DOCTOR_FORM_LABELS.specialty}
            </label>
            <input
              id="doctor-specialty"
              value={values.specialty}
              onChange={(event) => updateField('specialty', event.target.value)}
              placeholder={DOCTOR_FORM_LABELS.specialtyPlaceholder}
              className={fieldClassName}
              maxLength={100}
              required
            />
            {errors.specialty && <p className="mt-1.5 text-sm text-red-600">{errors.specialty}</p>}
          </div>

          <div>
            <label htmlFor="doctor-category" className="mb-2 block text-sm font-medium text-slate-700">
              {DOCTOR_FORM_LABELS.category}
            </label>
            <select
              id="doctor-category"
              value={values.category}
              onChange={(event) => updateField('category', event.target.value as DoctorCategory)}
              className={fieldClassName}
            >
              {doctorCategories.map((category) => (
                <option key={category} value={category}>
                  {doctorCategoryConfig[category].label}
                </option>
              ))}
            </select>
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
              {DOCTOR_FORM_LABELS.cancel}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? 'Сохранение...'
                : isEditing
                  ? DOCTOR_FORM_LABELS.submitEdit
                  : DOCTOR_FORM_LABELS.submitCreate}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
