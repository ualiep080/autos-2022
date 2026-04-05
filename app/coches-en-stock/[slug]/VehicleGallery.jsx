'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function VehicleGallery({ images, marca, modelo, estado }) {
  const [mainImage, setMainImage] = useState(
    images.find(img => img.esPrincipal) || images[0]
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        {mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mainImage.url} alt={mainImage.alt || `${marca} ${modelo}`} />
        ) : (
          <div style={{width:'100%', height:'100%', background:'#eee', display:'flex', alignItems:'center', justifyContent:'center'}}>Sin imagen</div>
        )}
        
        {estado === 'reservado' && <span className="badge badge-reservado" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem', padding: '0.5rem 1rem'}}>Reservado</span>}
        {estado === 'vendido' && <span className="badge badge-vendido" style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem', padding: '0.5rem 1rem'}}>Vendido</span>}
      </div>
      
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map(img => (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              key={img.id} 
              src={img.url} 
              className={`${styles.thumb} ${mainImage?.id === img.id ? styles.thumbActive : ''}`} 
              alt={img.alt || ''}
              onClick={() => setMainImage(img)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
