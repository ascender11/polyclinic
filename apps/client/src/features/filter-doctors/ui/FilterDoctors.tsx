import type { DoctorCategory } from '@/entities/doctor';

interface FilterDoctorsProps {
  value: DoctorCategory | '';
  onChange: (value: DoctorCategory | '') => void;
}

export const FilterDoctors = ({ value, onChange }: FilterDoctorsProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as DoctorCategory | '')}
      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-52"
    >
      <option value="">Все категории</option>
      <option value="FIRST">Первая категория</option>
      <option value="SECOND">Вторая категория</option>
      <option value="THIRD">Третья категория</option>
    </select>
  );
};
