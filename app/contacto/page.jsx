import LeadForm from '@/app/coches-en-stock/[slug]/LeadForm';
import {
  IconLocation,
  IconPhone,
  IconMessageCircle,
  IconClock,
  IconNavigation,
} from '@/components/Icons';

export const metadata = {
  title: 'Contacto y Ubicación',
  description:
    'Contacta con Autos 2022 en Vícar, Almería. Llámanos o escríbenos por WhatsApp para una tasación gratuita de tu vehículo. Atención directa y personalizada.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    type: 'website',
    url: 'https://www.autos2022.es/contacto',
    title: 'Contacto y Ubicación | Autos 2022',
    description:
      'Contacta con Autos 2022 en Vícar, Almería. Llámanos o escríbenos por WhatsApp para una tasación gratuita de tu vehículo.',
    images: [
      {
        url: '/hero-bg.webp',
        width: 1920,
        height: 1080,
        alt: 'Contacto — Autos 2022, Vícar, Almería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto y Ubicación | Autos 2022',
    description:
      'Contacta con Autos 2022 en Vícar, Almería. Tasación gratuita de tu vehículo.',
    images: ['/hero-bg.webp'],
  },
};

export default function ContactoPage() {
  return (
    <div className="container page-section">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Contacto</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>Estamos aquí para ayudarte a encontrar tu próximo coche.</p>
      </div>

      <div className="auto-grid-2" style={{ gap: '3rem' }}>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Nuestra Exposición</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconLocation size={24} color="var(--primary)" /></span>
              <div style={{ width: '100%', minWidth: 0 }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Dirección</strong>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Blvr. Cdad. de Vícar, 75<br />04738 La Gangosa, Almería</p>
                <iframe
                  src="https://maps.google.com/maps?q=Blvr.%20Cdad.%20de%20V%C3%ADcar,%2075,%2004738%20La%20Gangosa,%20Almer%C3%ADa&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '0.5rem', marginBottom: '1rem', display: 'block' }}
                  allowFullScreen
                  loading="lazy">
                </iframe>
                <a
                  href="https://www.google.com/maps/place/TGG+COMPETICION/@36.807344,-2.6059797,19.5z/data=!4m6!3m5!1s0xd707123edfd0ea1:0xa740652f3fd0fa75!8m2!3d36.8073045!4d-2.6055819!16s%2Fg%2F11s0t2sjnp?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                >
                  <IconNavigation size={18} /> Cómo llegar
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconPhone size={24} color="var(--primary)" /></span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Teléfono</strong>
                <p style={{ color: 'var(--text-muted)' }}><a href="tel:+34610259725" style={{ color: 'var(--text-main)', fontWeight: 600 }}>610 25 97 25</a></p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconMessageCircle size={24} color="var(--primary)" /></span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>WhatsApp</strong>
                <p style={{ color: 'var(--text-muted)' }}><a href="https://wa.me/34610259725" style={{ color: 'var(--text-main)', fontWeight: 600 }} target="_blank" rel="noopener noreferrer">610 25 97 25</a></p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}><IconClock size={24} color="var(--primary)" /></span>
              <div>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Horario</strong>
                <p style={{ color: 'var(--text-muted)' }}>L-V: 09:30 - 14:00 y 16:30 - 20:00<br />Sábados y Domingos: <strong style={{ color: 'var(--text)', fontWeight: 700 }}>
                  Cita previa
                </strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="page-card">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Envíanos un mensaje</h2>
          <LeadForm />
        </div>

      </div>
    </div>
  );
}
