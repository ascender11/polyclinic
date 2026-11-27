import { doctorCategories, doctorCategoryConfig, isDoctorCategory } from '../model/category';
import type { DoctorCategory } from '../model/types';

interface DoctorCategorySelectProps {
  value: DoctorCategory | '';
  onChange: (value: DoctorCategory | '') => void;
}

export const DoctorCategorySelect = ({ value, onChange }: DoctorCategorySelectProps) => (
  <select
    value={value}
    onChange={(event) => onChange(isDoctorCategory(event.target.value) ? event.target.value : '')}
    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-52"
  >
    <option value="">Все категории</option>
    {doctorCategories.map((category) => (
      <option key={category} value={category}>
        {doctorCategoryConfig[category].label}
      </option>
    ))}
  </select>
);
