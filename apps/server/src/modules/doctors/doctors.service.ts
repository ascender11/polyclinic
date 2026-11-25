import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/core/prisma/prisma.service';
import { Prisma } from '@/generated/client';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { FindDoctorsQueryDto } from './dto/find-doctors-query.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDoctorDto) {
    return this.prisma.doctor.create({ data: dto });
  }

  async findAll(query: FindDoctorsQueryDto) {
    const { page, limit, sortBy, sortOrder, fullName, specialty, category, search } = query;

    const where: Prisma.DoctorWhereInput = {
      category,
      fullName: fullName ? { contains: fullName, mode: 'insensitive' } : undefined,
      specialty: specialty ? { contains: specialty, mode: 'insensitive' } : undefined,
      OR: search
        ? [
            { fullName: { contains: search, mode: 'insensitive' } },
            { specialty: { contains: search, mode: 'insensitive' } },
          ]
        : undefined,
    };

    const [data, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where,
        orderBy: [{ [sortBy]: sortOrder }, { id: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.doctor.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  async exists(id: number) {
    const count = await this.prisma.doctor.count({ where: { id } });

    return { exists: count > 0 };
  }

  async update(id: number, dto: UpdateDoctorDto) {
    try {
      return await this.prisma.doctor.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Doctor with ID ${id} not found`);
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.doctor.delete({ where: { id } });

      return { message: 'Doctor deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Doctor with ID ${id} not found`);
        }

        if (error.code === 'P2003') {
          throw new ConflictException('Cannot delete a doctor with existing appointments');
        }
      }

      throw error;
    }
  }
}
