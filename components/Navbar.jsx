'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            Autos <span>2022</span>
          </Link>
          
          <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
            <Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>Inicio</Link>
            <Link href="/coches-en-stock" className={styles.link} onClick={() => setIsOpen(false)}>Coches en stock</Link>
            <Link href="/financiacion" className={styles.link} onClick={() => setIsOpen(false)}>Financiación</Link>
            <Link href="/sobre-nosotros" className={styles.link} onClick={() => setIsOpen(false)}>Sobre nosotros</Link>
            <Link href="/contacto" className={styles.link} onClick={() => setIsOpen(false)}>Contacto</Link>
            
            {/* Mobile actions inside menu */}
            {isOpen && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="https://wa.me/34600000000" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <a href="https://wa.me/34600000000" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Contactar por WhatsApp
            </a>
          </div>

          <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Abrir menú">
            ☰
          </button>
        </nav>
      </div>
    </header>
  );
}
