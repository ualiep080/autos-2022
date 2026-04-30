'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconMenu, IconClose, IconWhatsapp, IconMessageCircle, IconPhone } from './Icons';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Image
              src="/logo.jpeg"
              alt="Autos 2022"
              width={72}
              height={72}
              className={styles.logoImg}
              priority
            />
            <span className={styles.logoText}>
              <strong>Autos 2022</strong>
            </span>
          </Link>

          {/* Desktop links */}
          <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
            <Link href="/" className={styles.link} onClick={closeMenu}>Inicio</Link>
            <Link href="/coches-en-stock" className={styles.link} onClick={closeMenu}>Coches en stock</Link>
            <Link href="/vende-tu-vehiculo" className={styles.link} onClick={closeMenu}>Vende tu vehículo</Link>
            <Link href="/sobre-nosotros" className={styles.link} onClick={closeMenu}>Sobre nosotros</Link>
            <Link href="/contacto" className={styles.link} onClick={closeMenu}>Contacto</Link>

            {/* Mobile CTA inside menu */}
            {isOpen && (
              <div className={styles.mobileCTA}>
                <a
                  href="https://wa.me/34610259725"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  id="navbar-mobile-whatsapp-btn"
                >
                  <IconMessageCircle size={18} /> WhatsApp
                </a>
                <a
                  href="tel:+34610259725"
                  className="btn btn-secondary"
                  onClick={closeMenu}
                  id="navbar-mobile-call-btn"
                >
                  <IconPhone size={18} /> Llamar
                </a>
              </div>
            )}
          </div>

          {/* Desktop CTA */}
          <div className={styles.actions}>
            <a
              href="https://wa.me/34610259725"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-whatsapp-btn"
            >
              <IconMessageCircle size={18} /> Solicitar tasación
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className={styles.mobileMenuBtn}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
