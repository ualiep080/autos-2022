import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import styles from './page.module.css';
import {
  IconCheckCircle,
  IconCash,
  IconTruck,
  IconShield,
  IconStar,
  IconPhone,
} from '@/components/Icons';

export const metadata = {
  title: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
  description: 'Compra y venta de vehículos en Vícar, Almería. En Autos 2022 te ayudamos a vender tu coche, consultar stock disponible y gestionar la recogida de vehículos.',
};

export const revalidate = 60;

export default async function Home() {
  const destacadas = await prisma.vehicle.findMany({
    where: { destacado: true, visible: true },
    include: { images: true },
    orderBy: { fechaPublicacion: 'desc' },
    take: 6,
  });

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroBadge}>
            <span>⭐</span> Compraventa de vehículos — Vícar, Almería
          </div>

          <h1 className={styles.heroTitle}>
            Compramos{' '}
            <span className={styles.heroTitleAccent}>todo tipo</span>
            <br />
            de vehículos
          </h1>

          <p className={styles.heroSubtitle}>
            Pago inmediato en efectivo · Sin burocracia · Nos encargamos de todos los trámites
          </p>

          <div className={styles.heroBullets}>
            <div className={styles.heroBullet}>
              <span className={styles.heroBulletIcon}>✔</span>
              Recogida en menos de 24&nbsp;horas
            </div>
            <div className={styles.heroBullet}>
              <span className={styles.heroBulletIcon}>✔</span>
              Compramos coches averiados, siniestrados o para desguace
            </div>
            <div className={styles.heroBullet}>
              <span className={styles.heroBulletIcon}>✔</span>
              Con embargos, multas o impuestos atrasados
            </div>
          </div>

          <div className={styles.heroActions}>
            <a
              href="https://wa.me/34610259725"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-btn"
            >
              📲 Solicitar tasación gratis
            </a>
            <a
              href="tel:+34610259725"
              className="btn btn-secondary"
              id="hero-call-btn"
            >
              📞 Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ===== SEARCH BOX ===== */}
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
                <option value="Renault">Renault</option>
                <option value="Ford">Ford</option>
                <option value="Opel">Opel</option>
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
                <option value="5000">Hasta 5.000€</option>
                <option value="10000">Hasta 10.000€</option>
                <option value="15000">Hasta 15.000€</option>
                <option value="20000">Hasta 20.000€</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <button type="submit" className="btn btn-primary" id="search-btn">
                Buscar vehículo
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* ===== VEHÍCULOS DESTACADOS ===== */}
      {destacadas.length > 0 && (
        <section className={`${styles.section} ${styles.sectionLight}`}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="accent-line" />
                <h2 className="section-title">Vehículos en Stock</h2>
                <p className="section-subtitle" style={{ marginBottom: 0 }}>
                  Selección de coches disponibles actualmente en tienda.
                </p>
              </div>
              <Link href="/coches-en-stock" className="btn btn-outline" id="ver-catalogo-btn">
                Ver todo el catálogo →
              </Link>
            </div>

            <div className={styles.grid3}>
              {destacadas.map(car => (
                <VehicleCard key={car.id} vehicle={car} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ¿POR QUÉ VENDERNOS TU VEHÍCULO? ===== */}
      <section className={styles.section}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <h2 className="section-title">¿Por qué vendernos tu vehículo?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Rápido, sencillo y sin complicaciones. Nos encargamos de todo.
            </p>
          </div>

          <div className={styles.advGrid}>
            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <IconTruck />
              </div>
              <h3 className={styles.advTitle}>Recogida en menos de 24h</h3>
              <p className={styles.advDesc}>
                Recogemos tu vehículo donde tú nos indiques. Sin esperas, sin desplazamientos.
              </p>
            </div>

            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <IconCash />
              </div>
              <h3 className={styles.advTitle}>Pago inmediato en efectivo</h3>
              <p className={styles.advDesc}>
                Recibes el dinero en el momento. Sin esperas ni transferencias que tardan días.
              </p>
            </div>

            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <IconShield />
              </div>
              <h3 className={styles.advTitle}>Gestionamos los trámites</h3>
              <p className={styles.advDesc}>
                Nos ocupamos de todo el papeleo: transferencia, impuestos y gestión administrativa.
              </p>
            </div>

            <div className={styles.advCard}>
              <div className={styles.advIcon}>
                <IconStar />
              </div>
              <h3 className={styles.advTitle}>Máxima tasación</h3>
              <p className={styles.advDesc}>
                Te ofrecemos el mejor precio del mercado. Consulta sin compromiso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BANNER VENDE TU VEHÍCULO ===== */}
      <section style={{ background: 'var(--bg-color)', padding: '0 0 5rem' }}>
        <div className="container">
          <div className={styles.sellBanner}>
            <div>
              <h2 className={styles.sellBannerTitle}>
                ¿Tienes un vehículo que <span>quieres vender</span>?
              </h2>
              <p className={styles.sellBannerDesc}>
                Compramos coches, motos, furgonetas, vehículos averiados, siniestrados o para desguace · Transporte incluido · Gestión rápida
              </p>
            </div>
            <div className={styles.sellBannerActions}>
              <a
                href="https://wa.me/34610259725"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                id="sell-banner-whatsapp-btn"
              >
                📲 WhatsApp
              </a>
              <Link href="/vende-tu-vehiculo" className="btn btn-outline-gold" id="sell-banner-link-btn">
                Más información →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.seoContent}>
            <div className="accent-line" />
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
              Compraventa de vehículos en Vícar y Almería
            </h2>
            <p>
              En <strong>Autos 2022</strong> compramos todo tipo de vehículos en Almería y alrededores: coches, motos, furgonetas, caravanas, tractores, remolques y barcos. También valoramos vehículos averiados, siniestrados, sin ITV, parados o destinados a desguace, además de vehículos con embargos, multas o impuestos atrasados.
            </p>
            <p>
              Nuestro servicio incluye la <strong>recogida del vehículo en menos de 24 horas</strong> y
              el <strong>pago inmediato en efectivo</strong>. Consulta sin compromiso llamando al{' '}
              <a href="tel:+34610259725" style={{ color: 'var(--primary-dark)', fontWeight: 700 }}>
                610 25 97 25
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
