import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByType(vehicleTypeId: string) {
    return this.prisma.vehicle.findMany({
      where: {
        vehicleTypeId,
      },
    });
  }

  update(updateVehicleInput: Prisma.VehicleUpdateArgs) {
    return this.prisma.vehicle.update(updateVehicleInput);
  }
}
