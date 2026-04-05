import Link from 'next/link';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ vehicle }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  const getMainImage = () => {
    if (vehicle.images && vehicle.images.length > 0) {
      const main = vehicle.images.find(img => img.esPrincipal);
      return main ? main.url : vehicle.images[0].url;
    }
    return '/placeholder-car.jpg'; // We'll assume there is a fallback or real images
  };

  const getStatusBadge = () => {
    if (vehicle.estado === 'reservado') return <span className={`badge badge-reservado ${styles.badgeAbsolute}`}>Reservado</span>;
    if (vehicle.estado === 'vendido') return <span className={`badge badge-vendido ${styles.badgeAbsolute}`}>Vendido</span>;
    return null;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {getStatusBadge()}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getMainImage()} alt={`${vehicle.marca} ${vehicle.modelo}`} className={styles.image} />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{vehicle.marca} {vehicle.modelo}</h3>
        <p className={styles.version}>{vehicle.version}</p>
        
        <div className={styles.price}>{formatPrice(vehicle.precio)}</div>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📅</span>
            <span>{vehicle.year}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🛣️</span>
            <span>{vehicle.kilometros.toLocaleString()} km</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⛽</span>
            <span>{vehicle.combustible}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚙️</span>
            <span>{vehicle.cambio}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={`/coches-en-stock/${vehicle.slug}`} className="btn btn-primary">
            Ver detalles
          </Link>
          <a 
            href={`https://wa.me/34600000000?text=Hola,%20me%20interesa%20el%20${vehicle.marca}%20${vehicle.modelo}`}
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
