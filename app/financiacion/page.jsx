import LeadForm from '@/app/coches-en-stock/[slug]/LeadForm';

export const metadata = {
  title: 'Financiación de coches de segunda mano en Vícar | Autos 2022',
  description: 'Financia tu próximo coche de ocasión con nosotros. Estudio rápido y personalizado, cuotas a tu medida. Concesionario en Vícar, Almería.',
};

export default function FinanciacionPage() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">Financiación a tu medida</h1>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          En Autos 2022 sabemos que cada cliente es único. Por eso, te ofrecemos condiciones de financiación flexibles y adaptadas a tus necesidades reales. No dejes que la financiación sea un impedimento para conducir el coche que deseas.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⏱️</span> Respuesta Rápida
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>Estudio de viabilidad en menos de 24 horas. Para que no tengas que esperar.</p>
        </div>
        
        <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💯</span> 100% Financiable
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>Te ofrecemos la posibilidad de financiar la totalidad del vehículo sin dar entrada si así lo prefieres.</p>
        </div>

        <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📝</span> Trámites Sencillos
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>Nos encargamos de toda la gestión y el papeleo. Tú solo tienes que elegir tu nuevo coche.</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--surface-color)', padding: '2.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Solicita tu estudio sin compromiso</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Déjanos tus datos y nos pondremos en contacto contigo para ver las opciones disponibles.
        </p>
        <LeadForm />
      </div>
    </div>
  );
}
