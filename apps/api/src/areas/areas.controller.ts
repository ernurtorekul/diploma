import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private service: AreasService) {}

  @Get()
  async findAll() {
    return {
      data: await this.service.findAll(),
      message: 'Areas retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.service.findOne(id),
      message: 'Area retrieved successfully',
    };
  }

  @Post()
  async create(@Body() body: { name: string; responsiblePersonId?: string }) {
    return {
      data: await this.service.create(body),
      message: 'Area created successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; responsiblePersonId?: string }
  ) {
    return {
      data: await this.service.update(id, body),
      message: 'Area updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return {
      data: null,
      message: 'Area deleted successfully',
    };
  }
}
