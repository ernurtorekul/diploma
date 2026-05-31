import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard() {
    const users = await this.prisma.user.findMany({
      orderBy: { ecoPoints: 'desc' },
      take: 100,
      include: {
        _count: {
          select: { classifications: true },
        },
      },
    });

    return users.map((user: any, index: number) => ({
      rank: index + 1,
      username: user.telegramId || 'Anonymous',
      points: user.ecoPoints,
      classifications: user._count.classifications,
    }));
  }

  async findByTelegramId(telegramId: string) {
    return this.prisma.user.findUnique({
      where: { telegramId },
      include: {
        _count: {
          select: { classifications: true },
        },
      },
    });
  }
}
