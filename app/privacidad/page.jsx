export const metadata = {
  title: 'Política de Privacidad | Garage Autos 2022',
  description: 'Política de privacidad y protección de datos de Garage Autos 2022.',
};

export default function PrivacidadPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Política de Privacidad</h1>
      <div className="accent-line" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            1. Responsable del tratamiento
          </h2>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Responsable:</strong> Garage Autos 2022</li>
            <li><strong>Dirección:</strong> Polígono Industrial, 04738 Vícar, Almería</li>
            <li><strong>Teléfono:</strong> 610 25 97 25</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            2. Finalidad del tratamiento
          </h2>
          <p>Los datos personales que nos facilite a través de los formularios de contacto serán tratados con las siguientes finalidades:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Gestionar las consultas y solicitudes de información recibidas.</li>
            <li>Contactarle para dar respuesta a su solicitud de tasación o venta de vehículo.</li>
            <li>Análisis estadístico del tráfico del sitio web (datos anonimizados).</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            3. Base jurídica del tratamiento
          </h2>
          <p>
            La base legal para el tratamiento de sus datos es el consentimiento del interesado, prestado al cumplimentar el formulario de contacto, y el interés legítimo en la gestión de consultas comerciales.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            4. Conservación de los datos
          </h2>
          <p>
            Los datos personales proporcionados se conservarán mientras sean necesarios para atender su solicitud o, en su caso, durante los plazos legalmente establecidos.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            5. Derechos del interesado
          </h2>
          <p>Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad contactando con nosotros en:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Teléfono:</strong> 610 25 97 25</li>
            <li><strong>Dirección postal:</strong> Polígono Industrial, 04738 Vícar, Almería</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            6. Comunicación de datos a terceros
          </h2>
          <p>
            Sus datos no serán cedidos ni comunicados a terceros, salvo obligación legal o cuando sea estrictamente necesario para la prestación del servicio solicitado.
          </p>
        </section>

        <p style={{ fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
