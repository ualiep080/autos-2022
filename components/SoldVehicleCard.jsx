import styles from './SoldVehicleCard.module.css';
import { IconCalendar, IconRoad, IconFuel, IconGear } from './Icons';

export default function SoldVehicleCard({ vehicle }) {
  const getMainImage = () => {
    if (!vehicle.images || vehicle.images.length === 0) return null;
    const main = vehicle.images.find(img => img.esPrincipal);
    return main ? main.url : vehicle.images[0].url;
  };

  const mainImageUrl = getMainImage();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <span className={`badge badge-vendido ${styles.badgeAbsolute}`}>Vendido</span>
        {mainImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mainImageUrl}
            alt={`${vehicle.marca} ${vehicle.modelo}`}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>Sin imagen</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{vehicle.marca} {vehicle.modelo}</h3>
        {vehicle.version && (
          <p className={styles.version}>{vehicle.version}</p>
        )}

        <div className={styles.features}>
          {vehicle.year && (
            <div className={styles.feature}>
              <IconCalendar size={14} color="var(--primary-dark)" />
              <span>{vehicle.year}</span>
            </div>
          )}
          {vehicle.kilometros > 0 && (
            <div className={styles.feature}>
              <IconRoad size={14} color="var(--primary-dark)" />
              <span>{vehicle.kilometros.toLocaleString()} km</span>
            </div>
          )}
          {vehicle.combustible && (
            <div className={styles.feature}>
              <IconFuel size={14} color="var(--primary-dark)" />
              <span>{vehicle.combustible}</span>
            </div>
          )}
          {vehicle.cambio && (
            <div className={styles.feature}>
              <IconGear size={14} color="var(--primary-dark)" />
              <span>{vehicle.cambio}</span>
            </div>
          )}
        </div>

        {vehicle.soldComment && (
          <div className={styles.comment}>
            <p className={styles.commentLabel}>Comentario de la operación</p>
            <p className={styles.commentText}>{vehicle.soldComment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
