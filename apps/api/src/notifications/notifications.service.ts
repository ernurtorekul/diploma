import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(binId?: string) {
    const where = binId ? { binId } : {};
    return this.prisma.notification.findMany({
      where,
      include: {
        bin: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { sentAt: 'desc' },
    });
  }

  async create(data: {
    type: string;
    message: string;
    binId: string;
    status?: string;
  }) {
    return this.prisma.notification.create({
      data,
      include: { bin: true },
    });
  }

  async getStats() {
    const total = await this.prisma.notification.count();
    const sent = await this.prisma.notification.count({
      where: { status: 'SENT' },
    });
    const failed = await this.prisma.notification.count({
      where: { status: 'FAILED' },
    });

    return { total, sent, failed };
  }
}
