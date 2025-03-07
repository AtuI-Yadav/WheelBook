/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import { Category } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creating Vehicle Types with Categories
  const hatchback = await prisma.vehicleType.upsert({
    where: { name: 'Hatchback' },
    update: {},
    create: { name: 'Hatchback', category: Category.FOUR_WHEELER },
  });

  const suv = await prisma.vehicleType.upsert({
    where: { name: 'SUV' },
    update: {},
    create: { name: 'SUV', category: Category.FOUR_WHEELER },
  });

  const sedan = await prisma.vehicleType.upsert({
    where: { name: 'Sedan' },
    update: {},
    create: { name: 'Sedan', category: Category.FOUR_WHEELER },
  });

  const cruiser = await prisma.vehicleType.upsert({
    where: { name: 'Cruiser' },
    update: {},
    create: { name: 'Cruiser', category: Category.TWO_WHEELER },
  });
  const sports = await prisma.vehicleType.upsert({
    where: { name: 'Sports' },
    update: {},
    create: { name: 'Sports', category: Category.TWO_WHEELER },
  });

  // Creating Vehicles
  await prisma.vehicle.createMany({
    data: [
      { name: 'Hyundai i10', vehicleTypeId: hatchback.id },
      { name: 'Ford EcoSport', vehicleTypeId: suv.id },
      { name: 'Honda City', vehicleTypeId: sedan.id },
      { name: 'Royal Enfield', vehicleTypeId: cruiser.id },
      { name: 'TVS Apache', vehicleTypeId: sports.id },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
