'use client';

import { useState, useEffect } from 'react';
import styles from './HomeValuationCarousel.module.css';

const IMAGES = [
  {
    src: '/home/valoracion-vehiculos/imagen-1.webp',
    alt: 'Vehículo valorado por Autos 2022 en Almería',
  },
  {
    src: '/home/valoracion-vehiculos/imagen-2.webp',
    alt: 'Vehículo en proceso de compraventa',
  },
  {
    src: '/home/valoracion-vehiculos/imagen-3.webp',
    alt: 'Valoración de vehículo usado en Autos 2022',
  },
  {
    src: '/home/valoracion-vehiculos/imagen-4.webp',
    alt: 'Gestión de compraventa de vehículo en Autos 2022',
  },
  {
    src: '/home/valoracion-vehiculos/imagen-5.webp',
    alt: 'Operación de compraventa de vehículo en Autos 2022',
  },
  {
    src: '/home/valoracion-vehiculos/imagen-6.webp',
    alt: 'Vehículo en operación de compra en Vícar, Almería',
  },
];

const AUTOPLAY_MS = 5000;

export default function HomeValuationCarousel() {
  const [current, setCurrent] = useState(0);
  const count = IMAGES.length;

  // Autoplay: functional updater — no stale-closure issues, safe from set-state-in-effect
  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count]);

  const go = (idx) => setCurrent((idx + count) % count);

  return (
    <div className={styles.carousel}>
      <div className={styles.track}>
        {IMAGES.map((img, idx) => (
          <div
            key={img.src}
            className={`${styles.slide} ${idx === current ? styles.slideActive : ''}`}
            aria-hidden={idx !== current}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className={styles.image}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={() => go(current - 1)}
        aria-label="Imagen anterior"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={() => go(current + 1)}
        aria-label="Imagen siguiente"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>

      <div className={styles.dots} role="tablist" aria-label="Indicadores de imagen">
        {IMAGES.map((img, idx) => (
          <button
            key={`dot-${img.src}`}
            type="button"
            role="tab"
            aria-selected={idx === current}
            aria-label={`Ir a imagen ${idx + 1} de ${count}`}
            className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
            onClick={() => go(idx)}
          />
        ))}
      </div>
    </div>
  );
}
