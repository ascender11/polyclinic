import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { Prisma, PrismaClient } from '../src/generated/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

const doctors = [
  { fullName: 'Иванов Сергей Петрович', specialty: 'Терапевт', category: 'FIRST' },
  { fullName: 'Петрова Анна Викторовна', specialty: 'Кардиолог', category: 'THIRD' },
  { fullName: 'Сидоров Алексей Николаевич', specialty: 'Хирург', category: 'SECOND' },
  { fullName: 'Смирнова Елена Андреевна', specialty: 'Невролог', category: 'FIRST' },
  { fullName: 'Кузнецов Дмитрий Олегович', specialty: 'Офтальмолог', category: 'THIRD' },
  { fullName: 'Попова Мария Сергеевна', specialty: 'Дерматолог', category: 'SECOND' },
  { fullName: 'Васильев Андрей Игоревич', specialty: 'Стоматолог', category: 'FIRST' },
  { fullName: 'Соколова Ольга Владимировна', specialty: 'Эндокринолог', category: 'SECOND' },
  { fullName: 'Михайлов Павел Александрович', specialty: 'Ортопед', category: 'THIRD' },
  { fullName: 'Федорова Наталья Дмитриевна', specialty: 'Педиатр', category: 'FIRST' },
] satisfies Prisma.DoctorCreateManyInput[];

const diagnoses = [
  { code: 'J00', name: 'Острый назофарингит' },
  { code: 'I10', name: 'Эссенциальная гипертензия' },
  { code: 'M54.5', name: 'Боль в нижней части спины' },
  { code: 'G43.9', name: 'Мигрень неуточненная' },
  { code: 'H10.9', name: 'Конъюнктивит неуточненный' },
  { code: 'L20.9', name: 'Атопический дерматит' },
  { code: 'K29.7', name: 'Гастрит неуточненный' },
  { code: 'E11.9', name: 'Сахарный диабет второго типа' },
  { code: 'J20.9', name: 'Острый бронхит неуточненный' },
  { code: 'M25.5', name: 'Боль в суставе' },
] satisfies Prisma.DiagnosisCreateManyInput[];

const maleFirstNames = [
  'Александр',
  'Дмитрий',
  'Максим',
  'Андрей',
  'Сергей',
  'Михаил',
  'Иван',
  'Николай',
  'Павел',
  'Евгений',
  'Артем',
  'Роман',
  'Владимир',
  'Константин',
  'Олег',
];

const femaleFirstNames = [
  'Анна',
  'Мария',
  'Елена',
  'Ольга',
  'Наталья',
  'Ирина',
  'Екатерина',
  'Татьяна',
  'Светлана',
  'Юлия',
  'Анастасия',
  'Виктория',
  'Дарья',
  'Алиса',
  'Полина',
];

const maleLastNames = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Смирнов',
  'Кузнецов',
  'Попов',
  'Васильев',
  'Соколов',
  'Михайлов',
  'Федоров',
];

const femaleLastNames = [
  'Иванова',
  'Петрова',
  'Сидорова',
  'Смирнова',
  'Кузнецова',
  'Попова',
  'Васильева',
  'Соколова',
  'Михайлова',
  'Федорова',
];

const maleMiddleNames = [
  'Александрович',
  'Алексеевич',
  'Андреевич',
  'Владимирович',
  'Викторович',
  'Дмитриевич',
  'Иванович',
  'Михайлович',
  'Николаевич',
  'Сергеевич',
];

const femaleMiddleNames = [
  'Александровна',
  'Алексеевна',
  'Андреевна',
  'Владимировна',
  'Викторовна',
  'Дмитриевна',
  'Ивановна',
  'Михайловна',
  'Николаевна',
  'Сергеевна',
];

const streets = [
  'Ленина',
  'Мира',
  'Советская',
  'Центральная',
  'Садовая',
  'Школьная',
  'Молодежная',
  'Набережная',
  'Парковая',
  'Полевая',
];

const purposes = [
  'Первичная консультация',
  'Повторный осмотр',
  'Профилактический осмотр',
  'Обследование',
  'Консультация по результатам анализов',
  'Назначение лечения',
];

const discounts = [0, 0, 5, 10, 15, 20];

async function seed() {
  await prisma.$transaction([
    prisma.appointment.deleteMany(),
    prisma.diagnosis.deleteMany(),
    prisma.patient.deleteMany(),
    prisma.doctor.deleteMany(),
  ]);

  await prisma.doctor.createMany({ data: doctors });
  await prisma.diagnosis.createMany({ data: diagnoses });

  const patientsData: Prisma.PatientCreateManyInput[] = Array.from({ length: 30 }, (_, index) => {
    const isFemale = index % 2 === 1;

    const firstName = isFemale
      ? femaleFirstNames[index % femaleFirstNames.length]
      : maleFirstNames[index % maleFirstNames.length];

    const lastName = isFemale
      ? femaleLastNames[index % femaleLastNames.length]
      : maleLastNames[index % maleLastNames.length];

    const middleName = isFemale
      ? femaleMiddleNames[index % femaleMiddleNames.length]
      : maleMiddleNames[index % maleMiddleNames.length];

    const birthYear = 1950 + ((index * 7) % 55);
    const birthMonth = index % 12;
    const birthDay = (index % 28) + 1;

    return {
      medicalCardNumber: `MC-2026-${String(index + 1).padStart(4, '0')}`,
      fullName: `${lastName} ${firstName} ${middleName}`,
      birthDate: new Date(birthYear, birthMonth, birthDay),
      address: `г. Москва, ул. ${streets[index % streets.length]}, д. ${index + 1}`,
      gender: isFemale ? 'FEMALE' : 'MALE',
      discount: discounts[index % discounts.length],
    };
  });

  await prisma.patient.createMany({ data: patientsData });

  const [createdDoctors, createdPatients, createdDiagnoses] = await Promise.all([
    prisma.doctor.findMany({ orderBy: { id: 'asc' } }),
    prisma.patient.findMany({ orderBy: { id: 'asc' } }),
    prisma.diagnosis.findMany({ orderBy: { id: 'asc' } }),
  ]);

  const appointmentsData: Prisma.AppointmentCreateManyInput[] = Array.from({ length: 60 }, (_, index) => {
    const visitDate = new Date();

    visitDate.setDate(visitDate.getDate() + (index % 31) - 15);
    visitDate.setHours(8 + (index % 10), (index % 4) * 15, 0, 0);

    return {
      ticketNumber: 10001 + index,
      visitDate,
      purpose: purposes[index % purposes.length],
      cost: 1000 + (index % 8) * 250,
      doctorId: createdDoctors[(index * 3 + 1) % createdDoctors.length].id,
      patientId: createdPatients[index % createdPatients.length].id,
      diagnosisId: createdDiagnoses[index % createdDiagnoses.length].id,
    };
  });

  await prisma.appointment.createMany({ data: appointmentsData });

  const total = createdDoctors.length + createdPatients.length + createdDiagnoses.length + appointmentsData.length;

  console.log('Database seeded successfully');
  console.log(`Doctors: ${createdDoctors.length}`);
  console.log(`Patients: ${createdPatients.length}`);
  console.log(`Diagnoses: ${createdDiagnoses.length}`);
  console.log(`Appointments: ${appointmentsData.length}`);
  console.log(`Total: ${total}`);
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
