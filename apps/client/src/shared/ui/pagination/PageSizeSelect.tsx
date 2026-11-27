interface PageSizeSelectProps {
  value: number;
  options: readonly number[];
  onChange: (value: number) => void;
}

export const PageSizeSelect = ({ value, options, onChange }: PageSizeSelectProps) => (
  <select
    value={value}
    onChange={(event) => onChange(Number(event.target.value))}
    className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option} записей
      </option>
    ))}
  </select>
);
