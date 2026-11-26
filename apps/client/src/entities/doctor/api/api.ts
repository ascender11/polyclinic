import { axiosInstance } from '@/shared/api/axios-instance';

import {
  CreateDoctorSchema,
  DeleteDoctorResponseSchema,
  DoctorExistsSchema,
  DoctorSchema,
  FindDoctorsQuerySchema,
  PaginatedResponseSchema,
  UpdateDoctorSchema,
} from '../model/contracts';
import type { CreateDoctorInput, FindDoctorsQuery, UpdateDoctorInput } from '../model/types';

export const doctorService = {
  async getAll(params: FindDoctorsQuery = {}, signal?: AbortSignal) {
    const query = FindDoctorsQuerySchema.parse(params);

    const { data } = await axiosInstance.get('/doctors', {
      params: query,
      signal,
    });

    return PaginatedResponseSchema(DoctorSchema).parse(data);
  },

  async getById(id: number) {
    const { data } = await axiosInstance.get(`/doctors/${id}`);

    return DoctorSchema.parse(data);
  },

  async exists(id: number) {
    const { data } = await axiosInstance.get(`/doctors/${id}/exists`);

    return DoctorExistsSchema.parse(data);
  },

  async create(input: CreateDoctorInput) {
    const payload = CreateDoctorSchema.parse(input);

    const { data } = await axiosInstance.post('/doctors', payload);

    return DoctorSchema.parse(data);
  },

  async update(id: number, input: UpdateDoctorInput) {
    const payload = UpdateDoctorSchema.parse(input);

    const { data } = await axiosInstance.patch(`/doctors/${id}`, payload);

    return DoctorSchema.parse(data);
  },

  async delete(id: number) {
    const { data } = await axiosInstance.delete(`/doctors/${id}`);

    return DeleteDoctorResponseSchema.parse(data);
  },
};
