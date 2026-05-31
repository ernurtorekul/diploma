import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResponsiblePersonsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.responsiblePerson.findMany({
      include: {
        area: {
          include: {
            bins: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.responsiblePerson.findUnique({
      where: { id },
      include: { area: true },
    });
  }

  async create(data: { name: string; telegramId: string; areaId: string }) {
    return this.prisma.responsiblePerson.create({
      data,
      include: { area: true },
    });
  }

  async update(
    id: string,
    data: { name?: string; telegramId?: string; areaId?: string }
  ) {
    return this.prisma.responsiblePerson.update({
      where: { id },
      data,
      include: { area: true },
    });
  }

  async remove(id: string) {
    return this.prisma.responsiblePerson.delete({
      where: { id },
    });
  }
}
