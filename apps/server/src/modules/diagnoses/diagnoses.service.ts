import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/core/prisma/prisma.service';
import { Prisma } from '@/generated/client';

import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { FindDiagnosesQueryDto } from './dto/find-diagnoses-query.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Injectable()
export class DiagnosesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDiagnosisDto) {
    try {
      return await this.prisma.diagnosis.create({ data: dto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Diagnosis with this code already exists');
      }

      throw error;
    }
  }

  async findAll(query: FindDiagnosesQueryDto) {
    const { page, limit, sortBy, sortOrder, code, name, search } = query;

    const where: Prisma.DiagnosisWhereInput = {
      code: code ? { contains: code, mode: 'insensitive' } : undefined,
      name: name ? { contains: name, mode: 'insensitive' } : undefined,
      OR: search
        ? [{ code: { contains: search, mode: 'insensitive' } }, { name: { contains: search, mode: 'insensitive' } }]
        : undefined,
    };

    const [data, total] = await Promise.all([
      this.prisma.diagnosis.findMany({
        where,
        orderBy: [{ [sortBy]: sortOrder }, { id: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.diagnosis.count({ where }),
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
    const diagnosis = await this.prisma.diagnosis.findUnique({ where: { id } });

    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with ID ${id} not found`);
    }

    return diagnosis;
  }

  async exists(id: number) {
    const count = await this.prisma.diagnosis.count({ where: { id } });

    return { exists: count > 0 };
  }

  async update(id: number, dto: UpdateDiagnosisDto) {
    try {
      return await this.prisma.diagnosis.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Diagnosis with ID ${id} not found`);
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Diagnosis with this code already exists');
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.diagnosis.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Diagnosis with ID ${id} not found`);
        }

        if (error.code === 'P2003') {
          throw new ConflictException('Diagnosis cannot be deleted because appointments reference it');
        }
      }

      throw error;
    }
  }
}
