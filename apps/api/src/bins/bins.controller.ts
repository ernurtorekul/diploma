import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BinsService } from './bins.service';

@Controller('bins')
export class BinsController {
  constructor(private binsService: BinsService) {}

  @Get()
  async findAll() {
    return {
      data: await this.binsService.findAll(),
      message: 'Bins retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.binsService.findOne(id),
      message: 'Bin retrieved successfully',
    };
  }

  @Post()
  async create(@Body() body: { qrCode: string; location: string; areaId: string; categoryId: string }) {
    return {
      data: await this.binsService.create(body),
      message: 'Bin created successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { location?: string; areaId?: string; categoryId?: string; isFull?: boolean }
  ) {
    return {
      data: await this.binsService.update(id, body),
      message: 'Bin updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.binsService.remove(id);
    return {
      data: null,
      message: 'Bin deleted successfully',
    };
  }

  @Post(':id/fullness')
  async updateFullness(@Param('id') id: string, @Body() body: { percentage: number; wifiNetworks?: any[] }) {
    const bin = await this.binsService.updateFullness(id, body.percentage, body.wifiNetworks);
    return {
      data: bin,
      message: `Bin fullness updated to ${body.percentage}%`,
    };
  }
}
