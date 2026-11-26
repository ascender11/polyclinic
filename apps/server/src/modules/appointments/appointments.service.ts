import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/core/prisma/prisma.service';
import { Prisma } from '@/generated/client';

import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindAppointmentsQueryDto } from './dto/find-appointments-query.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    try {
      return await this.prisma.appointment.create({
        data: dto,
        include: {
          doctor: true,
          patient: true,
          diagnosis: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Appointment with this ticket number already exists');
        }

        if (error.code === 'P2003') {
          throw new NotFoundException('Doctor, patient or diagnosis does not exist');
        }
      }

      throw error;
    }
  }

  async findAll(query: FindAppointmentsQueryDto) {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      ticketNumber,
      purpose,
      doctorId,
      patientId,
      diagnosisId,
      dateFrom,
      dateTo,
      search,
    } = query;

    const where: Prisma.AppointmentWhereInput = {
      ticketNumber,
      doctorId,
      patientId,
      diagnosisId,
      purpose: purpose ? { contains: purpose, mode: 'insensitive' } : undefined,
      visitDate: dateFrom || dateTo ? { gte: dateFrom, lte: dateTo } : undefined,
      OR: search ? this.buildSearchFilter(search) : undefined,
    };

    const [data, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where,
        orderBy: [{ [sortBy]: sortOrder }, { id: 'asc' }],
        include: {
          doctor: true,
          patient: true,
          diagnosis: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.appointment.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
        diagnosis: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async exists(id: number) {
    const count = await this.prisma.appointment.count({ where: { id } });

    return { exists: count > 0 };
  }

  async update(id: number, dto: UpdateAppointmentDto) {
    try {
      return await this.prisma.appointment.update({
        where: { id },
        data: dto,
        include: {
          doctor: true,
          patient: true,
          diagnosis: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Appointment with ID ${id} not found`);
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Appointment with this ticket number already exists');
        }

        if (error.code === 'P2003') {
          throw new NotFoundException('Doctor, patient or diagnosis does not exist');
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.appointment.delete({
        where: { id },
        include: {
          doctor: true,
          patient: true,
          diagnosis: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }

      throw error;
    }
  }

  private buildSearchFilter(search: string): Prisma.AppointmentWhereInput[] {
    const match = { contains: search, mode: 'insensitive' } as const;

    return [
      // only digit strings that fit into int4 are treated as a ticket number
      ...(/^\d{1,9}$/.test(search) ? [{ ticketNumber: Number(search) }] : []),
      { purpose: match },
      { doctor: { fullName: match } },
      { patient: { fullName: match } },
      { diagnosis: { name: match } },
    ];
  }
}
