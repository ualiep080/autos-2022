import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Coches en Stock | Vehículos de segunda mano en Almería',
  description: 'Descubre nuestro catálogo completo de coches de segunda mano y ocasión en Vícar, Almería. Filtra por marca, precio y combustible.',
};

export default async function CatalogPage({ searchParams }) {
  const { marca, combustible, precio_max } = await searchParams;

  const filters = { visible: true };

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
    where: { visible: true },
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
              <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Filtros</h3>
              
              <div className={styles.filterGroup}>
                <h4>Marca</h4>
                <select name="marca" defaultValue={marca || ""}>
                  <option value="">Todas las marcas</option>
                  {distinctMarcas.map((m) => (
                    <option key={m.marca} value={m.marca}>{m.marca}</option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <h4>Combustible</h4>
                <select name="combustible" defaultValue={combustible || ""}>
                  <option value="">Todos</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <h4>Precio Máximo</h4>
                <select name="precio_max" defaultValue={precio_max || ""}>
                  <option value="">Sin límite</option>
                  <option value="10000">Hasta 10.000€</option>
                  <option value="15000">Hasta 15.000€</option>
                  <option value="20000">Hasta 20.000€</option>
                  <option value="30000">Hasta 30.000€</option>
                  <option value="40000">Hasta 40.000€</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Aplicar filtros</button>
              
              {(marca || combustible || precio_max) && (
                <Link href="/coches-en-stock" className={styles.clearFilters}>Limpiar filtros</Link>
              )}
            </form>
          </aside>

          <main>
            <div style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
              Mostrando {cars.length} vehículo{cars.length !== 1 ? 's' : ''}
            </div>

            <div className={styles.grid}>
              {cars.map(car => (
                <VehicleCard key={car.id} vehicle={car} />
              ))}
            </div>

            {cars.length === 0 && (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No se encontraron vehículos</h3>
                <p style={{ color: 'var(--text-muted)' }}>No hay coches que coincidan con los filtros seleccionados.</p>
                <Link href="/coches-en-stock" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Eliminar filtros</Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
