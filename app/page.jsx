import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import styles from './page.module.css';

export const metadata = {
  title: 'Coches de segunda mano y ocasión en Vícar, Almería | Autos 2022',
  description: 'Encuentra tu próximo coche en Vícar, Almería. Vehículos de 2ª mano, seminuevos y ocasión totalmente revisados, garantizados y al mejor precio.',
};

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const destacadas = await prisma.vehicle.findMany({
    where: { destacado: true, visible: true },
    include: { images: true },
    orderBy: { fechaPublicacion: 'desc' },
    take: 6,
  });

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Coches de Segunda Mano en Vícar, Almería</h1>
          <p className={styles.heroSubtitle}>Encuentra tu próximo coche al mejor precio. Vehículos revisados, seleccionados y listos para entrega inmediata.</p>
          <div className={styles.heroActions}>
            <Link href="/coches-en-stock" className="btn btn-primary">Ver coches disponibles</Link>
            <a href="https://wa.me/34600000000" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Contactar por WhatsApp</a>
          </div>
        </div>
      </section>

      <div className="container">
        <section className={styles.searchBox}>
          <form action="/coches-en-stock" method="GET" className={styles.searchGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="marca">Marca</label>
              <select name="marca" id="marca">
                <option value="">Todas las marcas</option>
                <option value="SEAT">SEAT</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Audi">Audi</option>
                <option value="BMW">BMW</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="combustible">Combustible</label>
              <select name="combustible" id="combustible">
                <option value="">Todos</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Diésel">Diésel</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="precio_max">Precio máximo</label>
              <select name="precio_max" id="precio_max">
                <option value="">Cualquier precio</option>
                <option value="10000">Hasta 10.000€</option>
                <option value="15000">Hasta 15.000€</option>
                <option value="20000">Hasta 20.000€</option>
                <option value="30000">Hasta 30.000€</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <button type="submit" className="btn btn-primary">Buscar coche</button>
            </div>
          </form>
        </section>
      </div>

      <section className={styles.sectionLight}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
            <div>
              <h2 className="section-title">Vehículos Destacados</h2>
              <p className="section-subtitle" style={{marginBottom: 0}}>Nuestro stock más exclusivo, revisado y garantizado.</p>
            </div>
            <Link href="/coches-en-stock" className="btn btn-outline" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
              Ver todo el catálogo
            </Link>
          </div>
          
          <div className={styles.grid3}>
            {destacadas.map(car => (
              <VehicleCard key={car.id} vehicle={car} />
            ))}
            {destacadas.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>No hay vehículos destacados de momento.</p>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>¿Por qué comprar tu coche con nosotros?</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 3rem' }}>Tu tranquilidad y confianza son lo primero.</p>
          
          <div className={styles.advGrid}>
            <div className={styles.advCard}>
              <div className={styles.advIcon}>✅</div>
              <h3 className={styles.advTitle}>Vehículos Revisados</h3>
              <p className={styles.advDesc}>Todos nuestros coches pasan un estricto control mecánico antes de su venta.</p>
            </div>
            <div className={styles.advCard}>
              <div className={styles.advIcon}>💶</div>
              <h3 className={styles.advTitle}>Financiación a Medida</h3>
              <p className={styles.advDesc}>Estudiamos tu caso y te ofrecemos las mejores opciones para que pagues cómodamente.</p>
            </div>
            <div className={styles.advCard}>
              <div className={styles.advIcon}>🚙</div>
              <h3 className={styles.advTitle}>Tu coche en parte de pago</h3>
              <p className={styles.advDesc}>Tasamos tu coche actual y te lo descontamos del precio de tu nuevo vehículo.</p>
            </div>
            <div className={styles.advCard}>
              <div className={styles.advIcon}>📍</div>
              <h3 className={styles.advTitle}>Asesoramiento Cercano</h3>
              <p className={styles.advDesc}>Trato directo y transparente desde nuestras instalaciones en Vícar, Almería.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.seoContent}>
            <h2 className="section-title">Compraventa de coches de ocasión en Vícar y Almería</h2>
            <p>
              Si estás pensando en <strong>comprar un coche usado en Almería</strong>, en Autos 2022 te ofrecemos una selección 
              exclusiva de vehículos de segunda mano, seminuevos y ocasión de todas las marcas.
            </p>
            <p>
              Trabajamos cada día para ofrecer el mejor <strong>concesionario de coches en Almería</strong> con un servicio 
              postventa de calidad, gestión rápida del papeleo y una transparencia total en cada vehículo que entra en nuestras instalaciones.
            </p>
            <p>
              Consúltanos por WhatsApp o ven a visitarnos a nuestras instalaciones. Encontraremos el coche que mejor se adapte 
              a tu estilo de vida y a tu presupuesto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
