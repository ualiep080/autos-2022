import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SoldVehicleCard from '@/components/SoldVehicleCard';
import { IconMessageCircle } from '@/components/Icons';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vehículos vendidos | Autos 2022',
  description:
    'Consulta algunos vehículos vendidos por Autos 2022 en Vícar, Almería. Compraventa de automóviles, valoración de coches usados y trato directo.',
  alternates: { canonical: '/vehiculos-vendidos' },
  openGraph: {
    type: 'website',
    url: 'https://www.autos2022.es/vehiculos-vendidos',
    title: 'Vehículos vendidos | Autos 2022',
    description:
      'Consulta algunos vehículos vendidos por Autos 2022 en Vícar, Almería. Compraventa de automóviles, valoración de coches usados y trato directo.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vehículos vendidos — Autos 2022, Vícar, Almería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vehículos vendidos | Autos 2022',
    description:
      'Consulta algunos vehículos vendidos por Autos 2022 en Vícar, Almería.',
    images: ['/og-image.jpg'],
  },
};

export default async function VehiculosVendidosPage() {
  let vehicles = [];
  try {
    vehicles = await prisma.vehicle.findMany({
      where: { estado: 'vendido', visible: true },
      include: { images: true },
      orderBy: { fechaActualizacion: 'desc' },
    });
  } catch {
    // DB unavailable at build time
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.accentLine} />
          <h1 className={styles.title}>Vehículos vendidos por Autos 2022</h1>
          <p className={styles.subtitle}>
            Algunos vehículos que ya han encontrado nuevo propietario. Si quieres vender tu coche, contacta con nosotros para una valoración personalizada.
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className={styles.section}>
        <div className="container">
          {vehicles.length > 0 ? (
            <div className={styles.grid}>
              {vehicles.map(vehicle => (
                <SoldVehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Pronto añadiremos operaciones completadas. Contacta con nosotros si quieres vender tu vehículo.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>
              ¿Quieres vender tu <span>vehículo</span>?
            </h2>
            <p className={styles.ctaDesc}>
              En Autos 2022 valoramos tu vehículo de forma personalizada. Trato directo, gestión sencilla y respuesta rápida.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://wa.me/34610259725?text=Hola%2C%20quiero%20vender%20mi%20veh%C3%ADculo%20y%20solicitar%20una%20valoraci%C3%B3n"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconMessageCircle size={20} /> Solicitar valoración por WhatsApp
              </a>
              <Link href="/vende-tu-vehiculo" className="btn btn-outline-gold">
                Ver cómo vender mi vehículo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
