import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [VehiclesResolver, VehiclesService, PrismaService],
})
export class VehiclesModule {}
