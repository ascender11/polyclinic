interface PageSizeSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export const PageSizeSelect = ({ value, onChange }: PageSizeSelectProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
    >
      <option value={10}>10 записей</option>
      <option value={20}>20 записей</option>
      <option value={50}>50 записей</option>
    </select>
  );
};
