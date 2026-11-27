export const APPOINTMENT_FORM_INITIAL_VALUES = {
  ticketNumber: '',
  visitDate: '',
  purpose: '',
  cost: '0',
  doctorId: '',
  patientId: '',
  diagnosisId: '',
} as const;

export const APPOINTMENT_FORM_LABELS = {
  ticketNumber: 'Номер талона',
  visitDate: 'Дата и время посещения',
  purpose: 'Цель посещения',
  cost: 'Стоимость',
  doctor: 'Врач',
  patient: 'Пациент',
  diagnosis: 'Диагноз',
  createTitle: 'Добавить приём',
  editTitle: 'Редактировать приём',
  cancel: 'Отмена',
  submitCreate: 'Добавить приём',
  submitEdit: 'Сохранить изменения',
} as const;
