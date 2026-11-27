import { doctorCategoryConfig } from '../model/category';
import type { DoctorCategory } from '../model/types';

interface DoctorCategoryBadgeProps {
  category: DoctorCategory;
}

export const DoctorCategoryBadge = ({ category }: DoctorCategoryBadgeProps) => {
  const { shortLabel, badgeClass } = doctorCategoryConfig[category];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}
    >
      {shortLabel}
    </span>
  );
};
