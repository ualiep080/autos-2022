require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testAction() {
  const cars = await prisma.vehicle.findMany();
  if (cars.length > 0) {
    const carId = cars[0].id;
    console.log(`Trying to delete car: ${carId}`);
    try {
      // Simulate action logic
      const images = await prisma.vehicleImage.findMany({ where: { vehicleId: carId } });
      console.log(`Found ${images.length} images`);
      for (const img of images) {
        console.log(`Processing image: ${img.url}`);
        if (img.url.includes('vercel-storage.com')) {
           console.log(`Would delete from vercel blob: ${img.url}`);
        }
      }
      console.log('Deleting vehicle from DB...');
      await prisma.vehicle.delete({ where: { id: carId } });
      console.log('Successfully deleted!');
    } catch (e) {
      console.error('Delete error:', e);
    }
  } else {
    console.log('No cars to delete.');
  }
}

testAction().finally(() => prisma.$disconnect());
