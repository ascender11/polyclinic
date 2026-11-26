import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

import { DiagnosesService } from './diagnoses.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { FindDiagnosesQueryDto } from './dto/find-diagnoses-query.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Controller('diagnoses')
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  @Post()
  create(@Body() dto: CreateDiagnosisDto) {
    return this.diagnosesService.create(dto);
  }

  @Get()
  findAll(@Query() query: FindDiagnosesQueryDto) {
    return this.diagnosesService.findAll(query);
  }

  @Get(':id/exists')
  exists(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosesService.exists(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiagnosisDto) {
    return this.diagnosesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.diagnosesService.remove(id);
  }
}
