import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import styles from './page.module.css';
import Link from 'next/link';
import { IconFilter, IconCar, IconFuel, IconEuro } from '@/components/Icons';


export const metadata = {
  title: 'Coches en Stock',
  description:
    'Vehículos de ocasión revisados y garantizados. Encuentra tu próximo coche al mejor precio en Vícar, Almería.',
  alternates: { canonical: '/coches-en-stock' },
  openGraph: {
    type: 'website',
    url: 'https://www.autos2022.es/coches-en-stock',
    title: 'Coches en Stock | Autos 2022',
    description:
      'Vehículos de ocasión revisados y garantizados. Encuentra tu próximo coche al mejor precio en Vícar, Almería.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1920,
        height: 1080,
        alt: 'Coches en stock — Autos 2022, Vícar, Almería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coches en Stock | Autos 2022',
    description:
      'Vehículos de ocasión revisados y garantizados en Vícar, Almería.',
    images: ['/og-image.jpg'],
  },
};

export default async function CatalogPage({ searchParams }) {
  const { marca, combustible, precio_max } = await searchParams;

  const filters = { visible: true, estado: { not: 'vendido' } };

  if (marca) filters.marca = marca;
  if (combustible) filters.combustible = combustible;
  if (precio_max) filters.precio = { lte: parseFloat(precio_max) };

  const cars = await prisma.vehicle.findMany({
    where: filters,
    include: { images: true },
    orderBy: { fechaPublicacion: 'desc' },
  });

  // Get distinct marcas for the filter
  const distinctMarcas = await prisma.vehicle.findMany({
    where: { visible: true, estado: { not: 'vendido' } },
    select: { marca: true },
    distinct: ['marca'],
  });

  return (
    <div>
      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Coches en Stock</h1>
          <p className={styles.subtitle}>Encuentra el vehículo perfecto para ti entre nuestro catálogo revisado.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <form action="/coches-en-stock" method="GET">
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>
                  <IconFilter size={20} color="var(--primary-dark)" /> Filtros
                </h3>
                <p className={styles.sidebarSubtitle}>
                  Encuentra el vehículo que mejor encaja contigo
                </p>
              </div>
              
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <IconCar size={16} color="var(--text-muted)" /> Marca
                </label>
                <select name="marca" defaultValue={marca || ""} className={styles.filterSelect}>
                  <option value="">Todas las marcas</option>
                  {distinctMarcas.map((m) => (
                    <option key={m.marca} value={m.marca}>{m.marca}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <IconFuel size={16} color="var(--text-muted)" /> Combustible
                </label>
                <select name="combustible" defaultValue={combustible || ""} className={styles.filterSelect}>
                  <option value="">Todos</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <IconEuro size={16} color="var(--text-muted)" /> Precio Máximo
                </label>
                <select name="precio_max" defaultValue={precio_max || ""} className={styles.filterSelect}>
                  <option value="">Sin límite</option>
                  <option value="5000">Hasta 5.000€</option>
                  <option value="10000">Hasta 10.000€</option>
                  <option value="15000">Hasta 15.000€</option>
                  <option value="20000">Hasta 20.000€</option>
                  <option value="30000">Hasta 30.000€</option>
                  <option value="40000">Hasta 40.000€</option>
                </select>
              </div>

              <button type="submit" className={`btn btn-primary ${styles.filterBtn}`}>Aplicar filtros</button>
              
              {(marca || combustible || precio_max) && (
                <Link href="/coches-en-stock" className={styles.clearFilters}>Limpiar filtros</Link>
              )}
            </form>
          </aside>

          <main>
            <div className={styles.resultsHeader}>
              <span>Mostrando <strong>{cars.length}</strong> vehículo{cars.length !== 1 ? 's' : ''}</span>
            </div>

            <div className={styles.grid}>
              {cars.map(car => (
                <VehicleCard key={car.id} vehicle={car} />
              ))}
            </div>

            {cars.length === 0 && (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyTitle}>No se encontraron vehículos</h3>
                <p className={styles.emptyDesc}>No hay coches que coincidan con los filtros seleccionados.</p>
                <Link href="/coches-en-stock" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Eliminar filtros</Link>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
