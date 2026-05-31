import { Controller, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private service: NotificationsService) {}

  @Get()
  async findAll(@Query('binId') binId?: string) {
    return {
      data: await this.service.findAll(binId),
      message: 'Notifications retrieved successfully',
    };
  }

  @Get('stats')
  async getStats() {
    return {
      data: await this.service.getStats(),
      message: 'Notification stats retrieved successfully',
    };
  }
}
