import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              Autos <span>2022</span>
            </Link>
            <p className={styles.description}>
              Tu concesionario de confianza en Vícar, Almería. Vehículos de segunda mano, ocasión y seminuevos totalmente revisados y garantizados.
            </p>
          </div>
          
          <div className={styles.col}>
            <h3>Enlaces Rápidos</h3>
            <div className={styles.links}>
              <Link href="/coches-en-stock" className={styles.link}>Coches en stock</Link>
              <Link href="/financiacion" className={styles.link}>Financiación</Link>
              <Link href="/sobre-nosotros" className={styles.link}>Sobre nosotros</Link>
              <Link href="/contacto" className={styles.link}>Contacto</Link>
              <Link href="/admin/login" className={styles.link}>Acceso Empleados</Link>
            </div>
          </div>

          <div className={styles.col}>
            <h3>Contacto</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span>📍</span>
                <p>Polígono Industrial<br/>04738 Vícar, Almería</p>
              </div>
              <div className={styles.contactItem}>
                <span>📞</span>
                <p>600 000 000</p>
              </div>
              <div className={styles.contactItem}>
                <span>✉️</span>
                <p>info@autos2022.com</p>
              </div>
            </div>
          </div>

          <div className={styles.col}>
            <h3>Horario</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span>🕒</span>
                <p>Lunes a Viernes<br/>09:30 - 14:00<br/>16:30 - 20:00</p>
              </div>
              <div className={styles.contactItem}>
                <span>🕒</span>
                <p>Sábados<br/>10:00 - 13:30</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Autos 2022. Todos los derechos reservados.</p>
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
