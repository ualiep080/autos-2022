import Link from 'next/link';
import { IconCheckCircle } from '@/components/Icons';

export const metadata = {
  title: 'Sobre Autos 2022 | Compraventa de vehículos en Almería',
  description: 'Conoce Autos 2022, empresa de compraventa de vehículos en Vícar, Almería, con trato cercano y atención personalizada.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="container page-section">
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Sobre Autos 2022</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Pasión por el motor, compromiso con nuestros clientes en Almería.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>

        <div className="page-card">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Nuestra Historia</h2>
          <p style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
            Autos 2022 nace con el objetivo de ofrecer una alternativa transparente, profesional y cercana para la compra de coches de segunda mano y ocasión en Almería occidental. Situados estratégicamente en Vícar, nos hemos consolidado como un referente para quienes buscan seguridad en la compra de su próximo coche.
          </p>
          <p style={{ color: 'var(--text-main)' }}>
            No somos un concesionario genérico. Seleccionamos cuidadosamente cada vehículo que entra en nuestro stock y nos aseguramos de que cumpla con nuestros estándares de calidad.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '2.5rem', borderRadius: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nuestro Compromiso</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconCheckCircle size={20} color="var(--primary)" /></span>
              <span>Transparencia total en el kilometraje e historial de cada coche.</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconCheckCircle size={20} color="var(--primary)" /></span>
              <span>Posibilidad de revisión en talleres de confianza.</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconCheckCircle size={20} color="var(--primary)" /></span>
              <span>Información clara sobre el estado, documentación y condiciones del vehículo.</span>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconCheckCircle size={20} color="var(--primary)" /></span>
              <span>Atención 100% personalizada por parte de nuestro equipo.</span>
            </li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ven a conocernos</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Contacta con nosotros y te asesoramos para encontrar tu próximo coche, sin compromiso.</p>
          <div className="cta-group">
            <Link href="/coches-en-stock" className="btn btn-primary">Ver stock de vehículos</Link>
            <Link href="/contacto" className="btn btn-outline">Contacto y Ubicación</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
