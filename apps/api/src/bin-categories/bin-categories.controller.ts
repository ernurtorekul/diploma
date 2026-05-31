import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BinCategoriesService } from './bin-categories.service';

@Controller('bin-categories')
export class BinCategoriesController {
  constructor(private service: BinCategoriesService) {}

  @Get()
  async findAll() {
    return {
      data: await this.service.findAll(),
      message: 'Categories retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.service.findOne(id),
      message: 'Category retrieved successfully',
    };
  }

  @Post()
  async create(@Body() body: { name: string; color: string; icon: string }) {
    return {
      data: await this.service.create(body),
      message: 'Category created successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; color?: string; icon?: string }
  ) {
    return {
      data: await this.service.update(id, body),
      message: 'Category updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return {
      data: null,
      message: 'Category deleted successfully',
    };
  }
}
