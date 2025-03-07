import { Module } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';
import { VehicleTypesResolver } from './vehicle-types.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [VehicleTypesResolver, VehicleTypesService, PrismaService],
})
export class VehicleTypesModule {}
