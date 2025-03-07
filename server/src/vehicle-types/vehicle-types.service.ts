import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VehicleTypesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByCategory(category: Category) {
    return this.prisma.vehicleType.findMany({
      where: {
        category: category,
      },
    });
  }
}
