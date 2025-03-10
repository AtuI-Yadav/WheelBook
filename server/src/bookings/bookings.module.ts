import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [BookingsResolver, BookingsService, PrismaService],
})
export class BookingsModule {}
