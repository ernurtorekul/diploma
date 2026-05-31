import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AreasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.area.findMany({
      include: {
        responsiblePerson: true,
        bins: {
          include: {
            category: true,
          },
        },
        _count: {
          select: { bins: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.area.findUnique({
      where: { id },
      include: {
        responsiblePerson: true,
        bins: true,
      },
    });
  }

  async create(data: { name: string; responsiblePersonId?: string }) {
    return this.prisma.area.create({
      data,
      include: {
        responsiblePerson: true,
      },
    });
  }

  async update(id: string, data: { name?: string; responsiblePersonId?: string }) {
    return this.prisma.area.update({
      where: { id },
      data,
      include: {
        responsiblePerson: true,
      },
    });
  }

  async remove(id: string) {
    // Check if area has bins
    const binsCount = await this.prisma.bin.count({
      where: { areaId: id },
    });

    if (binsCount > 0) {
      throw new Error('Cannot delete area with assigned bins');
    }

    // Remove responsible person assignment
    await this.prisma.responsiblePerson.deleteMany({
      where: { areaId: id },
    });

    return this.prisma.area.delete({
      where: { id },
    });
  }
}
