import type { Gender } from '@/entities/patient';

interface FilterPatientsProps {
  value: Gender | '';
  onChange: (value: Gender | '') => void;
}

export const FilterPatients = ({ value, onChange }: FilterPatientsProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as Gender | '')}
      className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-52"
    >
      <option value="">Любой пол</option>
      <option value="MALE">Мужской</option>
      <option value="FEMALE">Женский</option>
    </select>
  );
};
