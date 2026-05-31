import { Controller, Post, Get, Body } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';

@Controller('classifications')
export class ClassificationsController {
  constructor(private classificationsService: ClassificationsService) {}

  @Post()
  async create(@Body() body: any) {
    const result = await this.classificationsService.create(body);
    return {
      data: result,
      message: 'Classification completed successfully',
    };
  }

  @Get()
  findAll() {
    return {
      data: this.classificationsService.findAll(),
      message: 'Classifications retrieved successfully',
    };
  }
}
