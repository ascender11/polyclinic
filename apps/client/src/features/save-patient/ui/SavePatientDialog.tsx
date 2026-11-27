import type { Gender, Patient } from '@/entities/patient';
import { genderLabels, genders } from '@/entities/patient';

import { PATIENT_FORM_LABELS } from '../model/constants';
import { useSavePatient } from '../model/use-save-patient';

interface SavePatientDialogProps {
  patient: Patient | null;
  onClose: () => void;
  onSaved: (message: string) => void;
}

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';

export const SavePatientDialog = ({ patient, onClose, onSaved }: SavePatientDialogProps) => {
  const { values, errors, submitError, isSubmitting, updateField, submit } = useSavePatient({ patient, onSaved });

  const isEditing = patient !== null;

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
        aria-labelledby="patient-dialog-title"
        className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2 id="patient-dialog-title" className="text-xl font-semibold text-slate-900">
            {isEditing ? PATIENT_FORM_LABELS.editTitle : PATIENT_FORM_LABELS.createTitle}
          </h2>

          <p className="mt-1 text-sm text-slate-500">Заполните информацию о пациенте.</p>
        </div>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <div>
            <label htmlFor="patient-card-number" className="mb-2 block text-sm font-medium text-slate-700">
              {PATIENT_FORM_LABELS.medicalCardNumber}
            </label>

            <input
              id="patient-card-number"
              value={values.medicalCardNumber}
              onChange={(event) => updateField('medicalCardNumber', event.target.value)}
              placeholder={PATIENT_FORM_LABELS.medicalCardNumberPlaceholder}
              className={fieldClassName}
              maxLength={30}
              required
            />

            {errors.medicalCardNumber && <p className="mt-1.5 text-sm text-red-600">{errors.medicalCardNumber}</p>}
          </div>

          <div>
            <label htmlFor="patient-full-name" className="mb-2 block text-sm font-medium text-slate-700">
              {PATIENT_FORM_LABELS.fullName}
            </label>

            <input
              id="patient-full-name"
              value={values.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              placeholder={PATIENT_FORM_LABELS.fullNamePlaceholder}
              className={fieldClassName}
              maxLength={120}
              required
            />

            {errors.fullName && <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="patient-birth-date" className="mb-2 block text-sm font-medium text-slate-700">
              {PATIENT_FORM_LABELS.birthDate}
            </label>

            <input
              id="patient-birth-date"
              type="date"
              value={values.birthDate}
              onChange={(event) => updateField('birthDate', event.target.value)}
              className={fieldClassName}
              max={new Date().toISOString().slice(0, 10)}
              required
            />

            {errors.birthDate && <p className="mt-1.5 text-sm text-red-600">{errors.birthDate}</p>}
          </div>

          <div>
            <label htmlFor="patient-address" className="mb-2 block text-sm font-medium text-slate-700">
              {PATIENT_FORM_LABELS.address}
            </label>

            <input
              id="patient-address"
              value={values.address}
              onChange={(event) => updateField('address', event.target.value)}
              placeholder={PATIENT_FORM_LABELS.addressPlaceholder}
              className={fieldClassName}
              maxLength={255}
              required
            />

            {errors.address && <p className="mt-1.5 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label htmlFor="patient-gender" className="mb-2 block text-sm font-medium text-slate-700">
              {PATIENT_FORM_LABELS.gender}
            </label>

            <select
              id="patient-gender"
              value={values.gender}
              onChange={(event) => updateField('gender', event.target.value as Gender)}
              className={fieldClassName}
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {genderLabels[gender]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="patient-discount" className="mb-2 block text-sm font-medium text-slate-700">
              {PATIENT_FORM_LABELS.discount}
            </label>

            <input
              id="patient-discount"
              type="number"
              min={0}
              max={100}
              step={1}
              value={values.discount}
              onChange={(event) => updateField('discount', Number(event.target.value))}
              className={fieldClassName}
              required
            />

            {errors.discount && <p className="mt-1.5 text-sm text-red-600">{errors.discount}</p>}
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
              {PATIENT_FORM_LABELS.cancel}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? 'Сохранение...'
                : isEditing
                  ? PATIENT_FORM_LABELS.submitEdit
                  : PATIENT_FORM_LABELS.submitCreate}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
