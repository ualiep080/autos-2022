import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import LeadForm from './LeadForm';
import VehicleGallery from './VehicleGallery';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug }
  });
  
  if (!vehicle) return { title: 'Vehículo no encontrado' };
  
  return {
    title: `${vehicle.marca} ${vehicle.modelo} en Vícar, Almería | Autos 2022`,
    description: `${vehicle.marca} ${vehicle.modelo} ${vehicle.version}. ${vehicle.precio}€. ${vehicle.year}, ${vehicle.kilometros} km. Consúltanos en Autos 2022.`,
  };
}

export default async function VehicleDetail({ params }) {
  const { slug } = await params;
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
    include: { images: true }
  });

  if (!vehicle || !vehicle.visible) {
    notFound();
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="container">
      <div className={styles.layout}>
        
        <div className={styles.breadcrumb}>
          <Link href="/">Inicio</Link> &gt; <Link href="/coches-en-stock">Coches en stock</Link> &gt; {vehicle.marca} {vehicle.modelo}
        </div>

        <div className={styles.grid}>
          <div className={styles.mainContent}>
            
            <VehicleGallery 
              images={vehicle.images} 
              marca={vehicle.marca} 
              modelo={vehicle.modelo} 
              estado={vehicle.estado} 
            />

            <div className={styles.content}>
              <h1 className={styles.title}>{vehicle.marca} {vehicle.modelo}</h1>
              <p className={styles.version}>{vehicle.version}</p>
              
              <div className={styles.description}>
                <h3>Descripción</h3>
                <p style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{vehicle.descripcion || 'Sin descripción detallada.'}</p>
              </div>

              {vehicle.equipamiento && (
                <div className={styles.description}>
                  <h3>Equipamiento Destacado</h3>
                  <p style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{vehicle.equipamiento}</p>
                </div>
              )}

              <h3 style={{ marginBottom: '1.5rem', marginTop: '3rem' }}>Características Técnicas</h3>
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Año</span>
                  <span className={styles.specValue}>{vehicle.year}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Kilómetros</span>
                  <span className={styles.specValue}>{vehicle.kilometros.toLocaleString()} km</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Combustible</span>
                  <span className={styles.specValue}>{vehicle.combustible}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Cambio</span>
                  <span className={styles.specValue}>{vehicle.cambio}</span>
                </div>
                {vehicle.potencia && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Potencia</span>
                    <span className={styles.specValue}>{vehicle.potencia} CV</span>
                  </div>
                )}
                {vehicle.motor && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Motor</span>
                    <span className={styles.specValue}>{vehicle.motor}</span>
                  </div>
                )}
                {vehicle.color && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Color</span>
                    <span className={styles.specValue}>{vehicle.color}</span>
                  </div>
                )}
                {vehicle.puertas && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Puertas</span>
                    <span className={styles.specValue}>{vehicle.puertas}</span>
                  </div>
                )}
                {vehicle.plazas && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Plazas</span>
                    <span className={styles.specValue}>{vehicle.plazas}</span>
                  </div>
                )}
                {vehicle.etiquetaAmbiental && (
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Etiqueta Ambiental</span>
                    <span className={styles.specValue}>{vehicle.etiquetaAmbiental}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className={styles.sidebar}>
            <div className={styles.priceBox}>
              <div className={styles.price}>{formatPrice(vehicle.precio)}</div>
              <div className={styles.taxes}>Precio al contado. IVA incluido.</div>
              
              <div className={styles.actions}>
                <a 
                  href={`https://wa.me/34600000000?text=Hola,%20tengo%20interés%20en%20el%20${vehicle.marca}%20${vehicle.modelo}%20por%20${vehicle.precio}€`}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a href="tel:600000000" className="btn btn-outline">
                  Llamar ahora
                </a>
              </div>
            </div>

            <div className={styles.contactForm}>
              <h3>Solicitar información</h3>
              <LeadForm vehicleId={vehicle.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
