import { axiosInstance } from '@/shared/api';

import {
  CreatePatientSchema,
  DeletePatientResponseSchema,
  FindPatientsQuerySchema,
  PaginatedResponseSchema,
  PatientExistsSchema,
  PatientSchema,
  UpdatePatientSchema,
} from '../model/contracts';
import type { CreatePatientInput, FindPatientsQuery, UpdatePatientInput } from '../model/types';

export const patientService = {
  async getAll(params: FindPatientsQuery = {}, signal?: AbortSignal) {
    const query = FindPatientsQuerySchema.parse(params);

    const { data } = await axiosInstance.get('/patients', {
      params: query,
      signal,
    });

    return PaginatedResponseSchema(PatientSchema).parse(data);
  },

  async getById(id: number) {
    const { data } = await axiosInstance.get(`/patients/${id}`);

    return PatientSchema.parse(data);
  },

  async exists(id: number) {
    const { data } = await axiosInstance.get(`/patients/${id}/exists`);

    return PatientExistsSchema.parse(data);
  },

  async create(input: CreatePatientInput) {
    const payload = CreatePatientSchema.parse(input);

    const { data } = await axiosInstance.post('/patients', payload);

    return PatientSchema.parse(data);
  },

  async update(id: number, input: UpdatePatientInput) {
    const payload = UpdatePatientSchema.parse(input);

    const { data } = await axiosInstance.patch(`/patients/${id}`, payload);

    return PatientSchema.parse(data);
  },

  async delete(id: number) {
    const { data } = await axiosInstance.delete(`/patients/${id}`);

    return DeletePatientResponseSchema.parse(data);
  },
};
