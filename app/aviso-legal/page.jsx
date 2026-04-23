export const metadata = {
  title: 'Aviso Legal | Garage Autos 2022',
  description: 'Aviso legal de Garage Autos 2022, compraventa de vehículos en Vícar, Almería.',
};

export default function AvisoLegalPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Aviso Legal</h1>
      <div className="accent-line" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            1. Datos identificativos
          </h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Denominación:</strong> Garage Autos 2022</li>
            <li><strong>Actividad:</strong> Compraventa de vehículos</li>
            <li><strong>Domicilio:</strong> Polígono Industrial, 04738 Vícar, Almería</li>
            <li><strong>Teléfono:</strong> 610 25 97 25</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            2. Objeto y ámbito de aplicación
          </h2>
          <p>
            El presente Aviso Legal regula el uso del sitio web de Garage Autos 2022. El acceso y uso del sitio web implica la aceptación plena de las condiciones recogidas en este aviso legal.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            3. Propiedad intelectual e industrial
          </h2>
          <p>
            Todos los contenidos del sitio web —incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software y demás contenidos audiovisuales o sonoros— son titularidad de Garage Autos 2022 o de sus legítimos licenciatarios, estando protegidos por los derechos de propiedad intelectual e industrial correspondientes.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Queda prohibida su reproducción, distribución, comunicación pública y transformación, sin la autorización expresa del titular.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            4. Exclusión de responsabilidad
          </h2>
          <p>
            Garage Autos 2022 no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse del acceso o uso del sitio web, ni de los errores u omisiones en los contenidos del mismo.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            5. Legislación aplicable y jurisdicción
          </h2>
          <p>
            Las relaciones entre Garage Autos 2022 y los usuarios se regirán por la legislación española vigente, siendo competentes para resolver cualquier controversia los Juzgados y Tribunales de Almería.
          </p>
        </section>

        <p style={{ fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
