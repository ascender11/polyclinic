import { axiosInstance, PaginatedResponseSchema } from '@/shared/api';

import { DiagnosisSchema, FindDiagnosesQuerySchema } from '../model/contracts';
import type { FindDiagnosesQuery } from '../model/types';

export const diagnosisService = {
  async getAll(params: FindDiagnosesQuery = {}, signal?: AbortSignal) {
    const query = FindDiagnosesQuerySchema.parse(params);

    const { data } = await axiosInstance.get('/diagnoses', {
      params: query,
      signal,
    });

    return PaginatedResponseSchema(DiagnosisSchema).parse(data);
  },
};
