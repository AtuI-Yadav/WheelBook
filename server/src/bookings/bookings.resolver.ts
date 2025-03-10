import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from 'assets/graphql/generated-graphql';

@Resolver('Booking')
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation('createBooking')
  create(@Args('createBookingInput') createBookingInput: CreateBookingInput) {
    const { firstName, lastName, startDate, endDate, vehicleId } =
      createBookingInput;

    return this.bookingsService.create({
      startDate,
      endDate,
      user: {
        create: { firstName: firstName, lastName: lastName },
      },
      vehicle: {
        connect: { id: vehicleId },
      },
    });
  }

  @Query('booking')
  findOne(@Args('id') id: string) {
    return this.bookingsService.findOne(id);
  }
}
