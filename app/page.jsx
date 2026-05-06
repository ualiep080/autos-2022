import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import VehicleCard from '@/components/VehicleCard';
import HomeValuationCarousel from '@/components/HomeValuationCarousel';
import GoogleReviewsSection from '@/components/GoogleReviewsSection';
import styles from './page.module.css';
import {
  IconCheckCircle,
  IconCash,
  IconTruck,
  IconShield,
  IconStar,
  IconPhone,
  IconClock,
  IconCar,
  IconMessageCircle,
  IconFileCheck,
} from '@/components/Icons';

export const metadata = {
  title: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
  description:
    'Compra y venta de vehículos de ocasión en Vícar, Almería. Valoramos coches usados, averiados o sin ITV bajo valoración previa. Atención directa por teléfono y WhatsApp.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://www.autos2022.es',
    title: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
    description:
      'Compra y venta de vehículos de ocasión en Vícar, Almería. Valoramos coches usados, averiados o sin ITV bajo valoración previa. Atención directa por teléfono y WhatsApp.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1920,
        height: 1080,
        alt: 'Autos 2022 — Compraventa de vehículos en Vícar, Almería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
    description:
      'Compra y venta de vehículos de ocasión en Vícar, Almería. Valoramos coches usados, averiados o sin ITV bajo valoración previa. Atención directa por teléfono y WhatsApp.',
    images: ['/og-image.jpg'],
  },
};

export const revalidate = 60;

export default async function Home() {
  let destacadas = [];
  try {
    destacadas = await prisma.vehicle.findMany({
      where: {
        destacado: true,
        visible: true,
        estado: { not: 'vendido' },
      },
      include: { images: true },
      orderBy: { fechaActualizacion: 'desc' },
      take: 3,
    });
  } catch {
    // DB no disponible en build-time (ej. CI sin DATABASE_URL real)
  }

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <IconStar size={16} /> Compraventa de vehículos — Vícar, Almería
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
            <div className={styles.heroBulletCard}>
              <span className={styles.heroBulletCardIcon}>
                <IconClock size={22} color="#F5C518" />
              </span>
              <span className={styles.heroBulletCardText}>
                Recogida en menos de 24&nbsp;horas
              </span>
            </div>
            <div className={styles.heroBulletCard}>
              <span className={styles.heroBulletCardIcon}>
                <IconCar size={22} color="#F5C518" />
              </span>
              <span className={styles.heroBulletCardText}>
                Averiados, siniestrados o para desguace
              </span>
            </div>
            <div className={styles.heroBulletCard}>
              <span className={styles.heroBulletCardIcon}>
                <IconFileCheck size={22} color="#F5C518" />
              </span>
              <span className={styles.heroBulletCardText}>
                Embargos, multas o impuestos atrasados
              </span>
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
              <IconMessageCircle size={20} /> Solicitar tasación gratis
            </a>
            <a
              href="tel:+34610259725"
              className="btn btn-secondary"
              id="hero-call-btn"
            >
              <IconPhone size={20} /> Llamar ahora
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

      {/* ===== VALORAMOS VEHÍCULOS EN DIFERENTES ESTADOS ===== */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.valuationHeader}>
            <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <h2 className="section-title">Valoramos vehículos en diferentes estados</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              En Autos 2022, en Vícar, Almería, estudiamos cada operación de forma personalizada.
              Valoramos coches usados, averiados, sin ITV o siniestrados, siempre bajo valoración
              previa y con trato directo.
            </p>
          </div>

          <div className={styles.valuationBody}>
            <HomeValuationCarousel />

            <div className={styles.valuationCards}>
              <div className={styles.valuationCard}>
                <div className={styles.valuationCardIcon}><IconCar size={22} /></div>
                <h3 className={styles.valuationCardTitle}>Coches usados</h3>
                <p className={styles.valuationCardText}>
                  Valoramos vehículos de ocasión según estado, kilometraje, documentación y demanda.
                </p>
              </div>
              <div className={styles.valuationCard}>
                <div className={styles.valuationCardIcon}><IconShield size={22} /></div>
                <h3 className={styles.valuationCardTitle}>Averiados o sin ITV</h3>
                <p className={styles.valuationCardText}>
                  También estudiamos operaciones con vehículos averiados o sin ITV, siempre bajo valoración previa.
                </p>
              </div>
              <div className={styles.valuationCard}>
                <div className={styles.valuationCardIcon}><IconCheckCircle size={22} /></div>
                <h3 className={styles.valuationCardTitle}>Siniestrados bajo valoración</h3>
                <p className={styles.valuationCardText}>
                  Revisamos cada caso de forma individual para ofrecer una valoración ajustada al estado real del vehículo.
                </p>
              </div>
              <div className={styles.valuationCard}>
                <div className={styles.valuationCardIcon}><IconFileCheck size={22} /></div>
                <h3 className={styles.valuationCardTitle}>Gestión de la operación</h3>
                <p className={styles.valuationCardText}>
                  Te atendemos de forma directa y, si procede, coordinamos los pasos necesarios para cerrar la compraventa.
                </p>
              </div>
            </div>
          </div>

          <p className={styles.valuationNote}>
            Según el caso, también podemos coordinar la recogida del vehículo dentro de la operación de compra.
          </p>

          <div className={styles.valuationCta}>
            <a
              href="https://wa.me/34610259725?text=Hola%2C%20quiero%20solicitar%20una%20valoraci%C3%B3n%20para%20mi%20veh%C3%ADculo"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconMessageCircle size={20} /> Solicitar valoración por WhatsApp
            </a>
            <Link href="/vende-tu-vehiculo" className="btn btn-outline">
              Ver cómo vender mi vehículo
            </Link>
          </div>
        </div>
      </section>

      {/* ===== OPINIONES DE CLIENTES ===== */}
      <GoogleReviewsSection />

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
                <IconMessageCircle size={20} /> WhatsApp
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
