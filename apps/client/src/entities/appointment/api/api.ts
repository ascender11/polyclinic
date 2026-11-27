import { axiosInstance, PaginatedResponseSchema } from '@/shared/api';

import {
  AppointmentExistsSchema,
  AppointmentSchema,
  CreateAppointmentSchema,
  FindAppointmentsQuerySchema,
  UpdateAppointmentSchema,
} from '../model/contracts';
import type { CreateAppointmentInput, FindAppointmentsQuery, UpdateAppointmentInput } from '../model/types';

export const appointmentService = {
  async getAll(params: FindAppointmentsQuery = {}, signal?: AbortSignal) {
    const query = FindAppointmentsQuerySchema.parse(params);

    const { data } = await axiosInstance.get('/appointments', {
      params: query,
      signal,
    });

    return PaginatedResponseSchema(AppointmentSchema).parse(data);
  },

  async getById(id: number) {
    const { data } = await axiosInstance.get(`/appointments/${id}`);

    return AppointmentSchema.parse(data);
  },

  async exists(id: number) {
    const { data } = await axiosInstance.get(`/appointments/${id}/exists`);

    return AppointmentExistsSchema.parse(data);
  },

  async create(input: CreateAppointmentInput) {
    const payload = CreateAppointmentSchema.parse(input);

    const { data } = await axiosInstance.post('/appointments', payload);

    return AppointmentSchema.parse(data);
  },

  async update(id: number, input: UpdateAppointmentInput) {
    const payload = UpdateAppointmentSchema.parse(input);

    const { data } = await axiosInstance.patch(`/appointments/${id}`, payload);

    return AppointmentSchema.parse(data);
  },

  async delete(id: number) {
    const { data } = await axiosInstance.delete(`/appointments/${id}`);

    return AppointmentSchema.parse(data);
  },
};
