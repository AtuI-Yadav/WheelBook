import { Resolver, Query, Args } from '@nestjs/graphql';
import { VehicleTypesService } from './vehicle-types.service';
import { Category } from 'assets/graphql/generated-graphql';

@Resolver('VehicleType')
export class VehicleTypesResolver {
  constructor(private readonly vehicleTypesService: VehicleTypesService) {}

  @Query('vehicleTypesByCategory')
  findOne(@Args('category') category: Category) {
    return this.vehicleTypesService.findAllByCategory(category);
  }
}
