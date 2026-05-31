import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ResponsiblePersonsService } from './responsible-persons.service';

@Controller('responsible-persons')
export class ResponsiblePersonsController {
  constructor(private service: ResponsiblePersonsService) {}

  @Get()
  async findAll() {
    return {
      data: await this.service.findAll(),
      message: 'Responsible persons retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.service.findOne(id),
      message: 'Responsible person retrieved successfully',
    };
  }

  @Post()
  async create(@Body() body: { name: string; telegramId: string; areaId: string }) {
    return {
      data: await this.service.create(body),
      message: 'Responsible person created successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; telegramId?: string; areaId?: string }
  ) {
    return {
      data: await this.service.update(id, body),
      message: 'Responsible person updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return {
      data: null,
      message: 'Responsible person deleted successfully',
    };
  }
}
