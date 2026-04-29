import VehicleTypeCard from './VehicleTypeCard';

export const metadata = {
  title: 'Vende tu coche en Almería | Autos 2022',
  description: 'Compramos y valoramos vehículos usados, averiados, sin ITV, siniestrados o para desguace en Almería. Recogida rápida según disponibilidad y trato directo.',
};

export default function VendeTuVehiculoPage() {
  return (
    <div style={{ background: 'var(--bg-color)' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(rgba(15,15,15,0.85), rgba(26,26,26,0.93)), url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop") center/cover',
        padding: '5rem 0',
        textAlign: 'center',
        color: 'white',
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(245,197,24,0.15)',
            border: '1px solid rgba(245,197,24,0.4)',
            color: '#F5C518',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            ⭐ Compraventa de vehículos
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Compramos tu vehículo<br />
            <span style={{ color: '#F5C518' }}>al mejor precio</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#d1d5db', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Pago inmediato en efectivo · Recogida en menos de 24h · Sin burocracia
          </p>
          <div className="cta-group">
            <a
              href="https://wa.me/34610259725"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="vende-hero-whatsapp-btn"
            >
              📲 Solicitar tasación gratis
            </a>
            <a href="tel:+34610259725" className="btn btn-secondary" id="vende-hero-call-btn">
              📞 610 25 97 25
            </a>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <h2 className="section-title">¿Cómo funciona nuestro proceso?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Tres sencillos pasos para vender tu vehículo de la forma más rápida y segura.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { step: '1', title: 'Contáctanos', desc: 'Escríbenos por WhatsApp o llámanos. Cuéntanos qué vehículo tienes y te daremos una tasación aproximada en el acto.' },
              { step: '2', title: 'Tasación y Acuerdo', desc: 'Si estás de acuerdo con la oferta, concretamos una cita para ver el vehículo, ya sea en nuestras instalaciones o donde nos indiques.' },
              { step: '3', title: 'Recogida y Pago', desc: 'Nos encargamos de todo el papeleo. Recibes el dinero en efectivo en el momento y nosotros nos llevamos el vehículo en grúa si es necesario.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{
                background: 'white',
                border: '1.5px solid var(--border-color)',
                borderRadius: '1rem',
                padding: '2.5rem 2rem',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-1.5rem', 
                  left: '2rem', 
                  background: 'var(--primary)', 
                  color: 'var(--secondary)', 
                  width: '3rem', 
                  height: '3rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(245,197,24,0.4)'
                }}>
                  {step}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1rem', marginTop: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estados del vehículo */}
      <section style={{ background: 'var(--bg-color)', padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <h2 className="section-title">Compramos vehículos en diferentes estados</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '800px' }}>
              En Autos 2022 valoramos tu vehículo aunque esté averiado, sin ITV, siniestrado, parado o destinado a desguace. Te damos una tasación clara, nos encargamos de la recogida y te ayudamos con los trámites necesarios.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { text: 'Vehículos usados, averiados o siniestrados' },
              { text: 'Coches sin ITV, parados o para desguace' },
              { text: 'Recogida rápida según disponibilidad' },
              { text: 'Gestión sencilla y trato directo' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)'
              }}>
                <span style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>✓</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section style={{ background: 'white', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
            <h2 className="section-title">¿Por qué elegirnos?</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { icon: '⏱️', title: 'Recogida en menos de 24h', desc: 'Recogemos tu vehículo donde tú nos indiques. Sin desplazamientos ni esperas.' },
              { icon: '💵', title: 'Pago inmediato en efectivo', desc: 'Recibes el dinero en el momento del acuerdo. Sin transferencias que tardan días.' },
              { icon: '📋', title: 'Nos encargamos de los trámites', desc: 'Transferencia, impuestos, gestión de multas, embargos... Lo hacemos nosotros.' },
              { icon: '⭐', title: 'Máxima tasación', desc: 'Ofrecemos el mejor precio del mercado. Consulta sin compromiso.' },
              { icon: '🚗', title: 'Con embargos o multas', desc: 'Compramos vehículos con deudas pendientes, impuestos atrasados o multas.' },
              { icon: '🤝', title: 'Trato directo y honesto', desc: 'Sin intermediarios. Tratas directamente con el propietario del negocio.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                padding: '2rem',
                background: 'var(--bg-color)',
                borderRadius: '1rem',
                border: '1.5px solid var(--border-color)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ background: 'var(--secondary)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            ¿Listo para vender?
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', maxWidth: 500, margin: '0 auto 2.5rem' }}>
            Consúltanos sin compromiso. Te hacemos una oferta en minutos.
          </p>
          <div className="cta-group">
            <a
              href="https://wa.me/34610259725"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="vende-cta-whatsapp-btn"
            >
              📲 WhatsApp
            </a>
            <a href="tel:+34610259725" className="btn btn-outline-gold" id="vende-cta-call-btn">
              📞 610 25 97 25
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
