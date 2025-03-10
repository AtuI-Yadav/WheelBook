import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBookingInput: Prisma.BookingCreateInput) {
    return this.prisma.booking.create({
      data: createBookingInput,
    });
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
  }
}
