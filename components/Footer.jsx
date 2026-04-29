import Link from 'next/link';
import Image from 'next/image';
import { IconLocation, IconPhone, IconClock } from './Icons';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image
                src="/logo.jpeg"
                alt="Autos 2022"
                width={72}
                height={72}
                className={styles.logoImg}
              />
              <span className={styles.logoText}>
                <strong>Autos 2022</strong>
              </span>
            </Link>
            <p className={styles.description}>
              Compramos todo tipo de vehículos. Pago inmediato en efectivo y recogida en menos de 24 horas.
            </p>
            <a
              href="https://wa.me/34610259725"
              className={styles.waBtn}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-whatsapp-btn"
            >
              📲 Solicitar tasación gratis
            </a>
          </div>

          {/* Links rápidos */}
          <div className={styles.col}>
            <h3>Servicios</h3>
            <div className={styles.links}>
              <Link href="/coches-en-stock" className={styles.link}>Coches en stock</Link>
              <Link href="/vende-tu-vehiculo" className={styles.link}>Vende tu vehículo</Link>
              <Link href="/sobre-nosotros" className={styles.link}>Sobre nosotros</Link>
              <Link href="/contacto" className={styles.link}>Contacto</Link>
            </div>
          </div>

          {/* Contacto */}
          <div className={styles.col}>
            <h3>Contacto</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><IconLocation size={18} color="#F5C518" /></span>
                <p>Blvr. Cdad. de Vícar, 75<br />04738 La Gangosa, Vícar, Almería</p>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><IconPhone size={18} color="#F5C518" /></span>
                <div>
                  <a href="tel:+34610259725" className={styles.phoneLink}>610 25 97 25</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><IconClock size={18} color="#F5C518" /></span>
                <p>Lunes – Viernes<br />09:30–14:00 / 16:30–20:00<br />Sábados 10:00–13:30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Autos 2022. Todos los derechos reservados.</p>
          <div className={styles.legalLinks}>
            <Link href="/aviso-legal" className={styles.link}>Aviso Legal</Link>
            <Link href="/privacidad" className={styles.link}>Política de Privacidad</Link>
            <Link href="/cookies" className={styles.link}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
