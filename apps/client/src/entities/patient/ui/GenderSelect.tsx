import { genderLabels, genders, isGender } from '../model/gender';
import type { Gender } from '../model/types';

interface GenderSelectProps {
  value: Gender | '';
  onChange: (value: Gender | '') => void;
}

export const GenderSelect = ({ value, onChange }: GenderSelectProps) => (
  <select
    value={value}
    onChange={(event) => onChange(isGender(event.target.value) ? event.target.value : '')}
    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:w-52"
  >
    <option value="">Любой пол</option>
    {genders.map((gender) => (
      <option key={gender} value={gender}>
        {genderLabels[gender]}
      </option>
    ))}
  </select>
);
