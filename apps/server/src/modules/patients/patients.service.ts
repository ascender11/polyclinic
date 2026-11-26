import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/core/prisma/prisma.service';
import { Prisma } from '@/generated/client';

import { CreatePatientDto } from './dto/create-patient.dto';
import { FindPatientsQueryDto } from './dto/find-patients-query.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePatientDto) {
    try {
      return await this.prisma.patient.create({ data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Patient with this medical card number already exists');
      }

      throw error;
    }
  }

  async findAll(query: FindPatientsQueryDto) {
    const { page, limit, sortBy, sortOrder, medicalCardNumber, fullName, address, gender, search } = query;

    const where: Prisma.PatientWhereInput = {
      gender,
      medicalCardNumber: medicalCardNumber ? { contains: medicalCardNumber, mode: 'insensitive' } : undefined,
      fullName: fullName ? { contains: fullName, mode: 'insensitive' } : undefined,
      address: address ? { contains: address, mode: 'insensitive' } : undefined,
      OR: search
        ? [
            { medicalCardNumber: { contains: search, mode: 'insensitive' } },
            { fullName: { contains: search, mode: 'insensitive' } },
            { address: { contains: search, mode: 'insensitive' } },
          ]
        : undefined,
    };

    const [data, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        orderBy: [{ [sortBy]: sortOrder }, { id: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.patient.count({ where }),
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
    const patient = await this.prisma.patient.findUnique({ where: { id } });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async exists(id: number) {
    const count = await this.prisma.patient.count({ where: { id } });

    return { exists: count > 0 };
  }

  async update(id: number, dto: UpdatePatientDto) {
    try {
      return await this.prisma.patient.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${id} not found`);
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Patient with this medical card number already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.patient.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Patient with ID ${id} not found`);
        }

        if (error.code === 'P2003') {
          throw new ConflictException('Patient cannot be deleted because appointments reference it');
        }
      }

      throw error;
    }
  }
}
