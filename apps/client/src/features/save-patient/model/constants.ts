export const PATIENT_FORM_INITIAL_VALUES = {
  medicalCardNumber: '',
  fullName: '',
  birthDate: '',
  address: '',
  gender: 'MALE',
  discount: 0,
} as const;

export const PATIENT_FORM_LABELS = {
  medicalCardNumber: 'Номер медицинской карты',
  fullName: 'ФИО',
  birthDate: 'Дата рождения',
  address: 'Адрес',
  gender: 'Пол',
  discount: 'Скидка (%)',
  createTitle: 'Добавить пациента',
  editTitle: 'Редактировать пациента',
  medicalCardNumberPlaceholder: 'Введите номер медицинской карты',
  fullNamePlaceholder: 'Введите ФИО пациента',
  addressPlaceholder: 'Введите адрес проживания',
  cancel: 'Отмена',
  submitCreate: 'Добавить пациента',
  submitEdit: 'Сохранить изменения',
} as const;
