import Image from 'next/image';
import {
  IconStar,
  IconMessageCircle,
  IconPhone,
  IconClock,
  IconCash,
  IconFileCheck,
  IconCar,
  IconCheckCircle,
  IconShield,
  IconHandshake,
} from '@/components/Icons';

export const metadata = {
  title: 'Vende tu Vehículo',
  description:
    'Compramos todo tipo de vehículos en Almería: usados, averiados, sin ITV o con embargos. Pago inmediato en efectivo y recogida en menos de 24h. Consulta sin compromiso.',
  alternates: { canonical: '/vende-tu-vehiculo' },
  openGraph: {
    type: 'website',
    url: 'https://www.autos2022.es/vende-tu-vehiculo',
    title: 'Vende tu Vehículo | Autos 2022',
    description:
      'Compramos todo tipo de vehículos en Almería: usados, averiados, sin ITV o con embargos. Pago inmediato en efectivo y recogida en menos de 24h.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1920,
        height: 1080,
        alt: 'Vende tu vehículo — Autos 2022, Vícar, Almería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vende tu Vehículo | Autos 2022',
    description:
      'Compramos todo tipo de vehículos en Almería. Pago inmediato, recogida en 24h.',
    images: ['/og-image.jpg'],
  },
};

const ventajas = [
  { icon: IconClock, title: 'Recogida en menos de 24h', desc: 'Recogemos tu vehículo donde tú nos indiques. Sin desplazamientos ni esperas.' },
  { icon: IconCash, title: 'Pago inmediato en efectivo', desc: 'Recibes el dinero en el momento del acuerdo. Sin transferencias que tardan días.' },
  { icon: IconFileCheck, title: 'Nos encargamos de los trámites', desc: 'Transferencia, impuestos, gestión de multas, embargos... Lo hacemos nosotros.' },
  { icon: IconStar, title: 'Máxima tasación', desc: 'Ofrecemos el mejor precio del mercado. Consulta sin compromiso.' },
  { icon: IconCar, title: 'Con embargos o multas', desc: 'Compramos vehículos con deudas pendientes, impuestos atrasados o multas.' },
  { icon: IconHandshake, title: 'Trato directo y honesto', desc: 'Sin intermediarios. Tratas directamente con el propietario del negocio.' },
];

export default function VendeTuVehiculoPage() {
  return (
    <div style={{ background: 'var(--bg-color)' }}>
      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: '5rem 0',
        textAlign: 'center',
        color: 'white',
        overflow: 'hidden',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Image
          src="/vende-hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(15,15,15,0.82), rgba(26,26,26,0.9))',
          zIndex: 1,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(245,197,24,0.12)',
            border: '1px solid rgba(245,197,24,0.35)',
            color: '#F5C518',
            padding: '0.45rem 1.15rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            backdropFilter: 'blur(4px)',
          }}>
            <IconStar size={16} /> Compraventa de vehículos
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
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
              <IconMessageCircle size={20} /> Solicitar tasación gratis
            </a>
            <a href="tel:+34610259725" className="btn btn-secondary" id="vende-hero-call-btn">
              <IconPhone size={20} /> 610 25 97 25
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
                <span style={{ flexShrink: 0 }}><IconCheckCircle size={22} color="var(--primary)" /></span>
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
            {ventajas.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                padding: '2rem',
                background: 'var(--bg-color)',
                borderRadius: '1rem',
                border: '1.5px solid var(--border-color)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(245,197,24,0.12)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Icon size={24} color="var(--primary-dark)" />
                </div>
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
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
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
              <IconMessageCircle size={20} /> WhatsApp
            </a>
            <a href="tel:+34610259725" className="btn btn-outline-gold" id="vende-cta-call-btn">
              <IconPhone size={20} /> 610 25 97 25
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
