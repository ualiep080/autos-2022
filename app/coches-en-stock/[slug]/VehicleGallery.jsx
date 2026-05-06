'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function VehicleGallery({ images, marca, modelo, estado }) {
  const principalIdx = images.findIndex(img => img.esPrincipal);
  const [mainIdx, setMainIdx] = useState(principalIdx >= 0 ? principalIdx : 0);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const count = images.length;
  const isOpen = lightboxIdx !== null;

  const openAt = (idx) => setLightboxIdx(idx);
  const close = () => setLightboxIdx(null);

  // Keep gallery main image in sync with lightbox navigation
  useEffect(() => {
    if (lightboxIdx !== null) setMainIdx(lightboxIdx);
  }, [lightboxIdx]);

  // Keyboard: Escape closes, arrows navigate
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      else if (e.key === 'ArrowLeft') setLightboxIdx(i => (i - 1 + count) % count);
      else if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, count]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const mainImage = images[mainIdx] ?? null;
  const lbImage = isOpen ? images[lightboxIdx] : null;

  return (
    <>
      <div className={styles.gallery}>
        {/* Main image */}
        <div
          className={styles.mainImage}
          onClick={() => mainImage && openAt(mainIdx)}
          role={mainImage ? 'button' : undefined}
          tabIndex={mainImage ? 0 : undefined}
          aria-label={mainImage ? `Ver foto de ${marca} ${modelo} en pantalla completa` : undefined}
          onKeyDown={mainImage ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(mainIdx); } } : undefined}
          style={mainImage ? { cursor: 'zoom-in' } : undefined}
        >
          {mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mainImage.url} alt={`${marca} ${modelo}`} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Sin imagen
            </div>
          )}
          {estado === 'reservado' && (
            <span className="badge badge-reservado" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
              Reservado
            </span>
          )}
          {estado === 'vendido' && (
            <span className="badge badge-vendido" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
              Vendido
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {count > 1 && (
          <div className={styles.thumbnails}>
            {images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                className={`${styles.thumbBtn} ${mainIdx === idx ? styles.thumbActive : ''}`}
                onClick={() => { setMainIdx(idx); openAt(idx); }}
                aria-label={`Ver foto ${idx + 1} de ${count}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className={styles.thumb} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isOpen && lbImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de fotos: ${marca} ${modelo}`}
          className={styles.lightboxBackdrop}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          {/* Close */}
          <button
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            type="button"
            className={styles.lightboxClose}
            onClick={close}
            aria-label="Cerrar galería"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image + counter */}
          <div className={styles.lightboxContent}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lbImage.url}
              alt={`Foto ${lightboxIdx + 1} de ${count}: ${marca} ${modelo}`}
              className={styles.lightboxImage}
            />
            {count > 1 && (
              <div className={styles.lightboxCounter} aria-live="polite">
                {lightboxIdx + 1} / {count}
              </div>
            )}
          </div>

          {/* Navigation — only when multiple images */}
          {count > 1 && (
            <>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={() => setLightboxIdx(i => (i - 1 + count) % count)}
                aria-label="Imagen anterior"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true">
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={() => setLightboxIdx(i => (i + 1) % count)}
                aria-label="Imagen siguiente"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden="true">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
