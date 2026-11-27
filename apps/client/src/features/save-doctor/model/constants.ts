export const DOCTOR_FORM_INITIAL_VALUES = {
  fullName: '',
  specialty: '',
  category: 'THIRD',
} as const;

export const DOCTOR_FORM_LABELS = {
  fullName: 'ФИО',
  specialty: 'Специальность',
  category: 'Категория',
  createTitle: 'Добавить врача',
  editTitle: 'Редактировать врача',
  fullNamePlaceholder: 'Введите ФИО врача',
  specialtyPlaceholder: 'Введите специальность',
  cancel: 'Отмена',
  submitCreate: 'Добавить врача',
  submitEdit: 'Сохранить изменения',
} as const;
