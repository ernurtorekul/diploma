import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BinCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.binCategory.findMany({
      include: {
        _count: {
          select: { bins: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.binCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bins: true },
        },
      },
    });
  }

  async create(data: { name: string; color: string; icon: string }) {
    return this.prisma.binCategory.create({
      data,
    });
  }

  async update(id: string, data: { name?: string; color?: string; icon?: string }) {
    return this.prisma.binCategory.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    // Check if category has bins
    const binsCount = await this.prisma.bin.count({
      where: { categoryId: id },
    });

    if (binsCount > 0) {
      throw new Error('Cannot delete category with assigned bins');
    }

    return this.prisma.binCategory.delete({
      where: { id },
    });
  }
}
