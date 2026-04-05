import LeadForm from '@/app/coches-en-stock/[slug]/LeadForm';

export const metadata = {
  title: 'Contacto | Autos 2022, Almería',
  description: 'Ponte en contacto con nuestro concesionario en Vícar para solicitarnos información, comprar tu vehículo o pedir cita previa.',
};

export default function ContactoPage() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">Contacto</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>Estamos aquí para ayudarte a encontrar tu próximo coche.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Nuestra Exposición</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📍</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Dirección</strong>
                <p style={{ color: 'var(--text-muted)' }}>Polígono Industrial<br/>04738 Vícar, Almería</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📞</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Teléfono</strong>
                <p style={{ color: 'var(--text-muted)' }}><a href="tel:600000000" style={{ color: 'var(--primary)' }}>600 000 000</a></p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>💬</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>WhatsApp</strong>
                <p style={{ color: 'var(--text-muted)' }}><a href="https://wa.me/34600000000" style={{ color: 'var(--primary)' }} target="_blank" rel="noopener noreferrer">600 000 000</a></p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🕒</span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Horario</strong>
                <p style={{ color: 'var(--text-muted)' }}>L-V: 09:30 - 14:00 y 16:30 - 20:00<br/>Sábados: 10:00 - 13:30</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--surface-color)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Envíanos un mensaje</h2>
          <LeadForm />
        </div>

      </div>
    </div>
  );
}
