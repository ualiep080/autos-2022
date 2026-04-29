import { prisma } from '@/lib/prisma';

const BASE_URL = 'https://www.autos2022.es';

export default async function sitemap() {
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/coches-en-stock`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vende-tu-vehiculo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/financiacion`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  let vehicleRoutes = [];
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { visible: true },
      select: { slug: true, fechaActualizacion: true },
    });

    vehicleRoutes = vehicles.map((vehicle) => ({
      url: `${BASE_URL}/coches-en-stock/${vehicle.slug}`,
      lastModified: vehicle.fechaActualizacion,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching vehicles for sitemap:', error);
  }

  return [...staticRoutes, ...vehicleRoutes];
}
