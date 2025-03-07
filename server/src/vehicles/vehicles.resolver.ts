import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { UpdateVehicleInput } from 'assets/graphql/generated-graphql';
import { Prisma } from '@prisma/client';

@Resolver('Vehicle')
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query('vehicleByType')
  findAllByType(@Args('vehicleTypeId') vehicleTypeId: string) {
    return this.vehiclesService.findAllByType(vehicleTypeId);
  }

  @Mutation('updateVehicle')
  update(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) {
    const { id, ...restUpdateVehicleInput } = updateVehicleInput;

    const prismaUpdateVehicleInput = {
      where: {
        id,
      },
      data: {
        restUpdateVehicleInput,
      },
    } as Prisma.VehicleUpdateArgs;

    return this.vehiclesService.update(prismaUpdateVehicleInput);
  }
}
