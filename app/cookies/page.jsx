export const metadata = {
  title: 'Política de Cookies | Garage Autos 2022',
  description: 'Información sobre el uso de cookies en el sitio web de Garage Autos 2022.',
};

export default function CookiesPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 className="section-title">Política de Cookies</h1>
      <div className="accent-line" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            ¿Qué son las cookies?
          </h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita una página web. Permiten que el sitio recuerde sus preferencias y analice cómo se usa para mejorar el servicio.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Cookies utilizadas en este sitio
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Cookie</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Tipo</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Duración</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Finalidad</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem' }}><code>cookie-consent</code></td>
                  <td style={{ padding: '0.75rem 1rem' }}>Esencial</td>
                  <td style={{ padding: '0.75rem 1rem' }}>1 año</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Guardar su preferencia sobre el uso de cookies</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#f9fafb' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>Análisis de tráfico</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Analítica</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Sesión</td>
                  <td style={{ padding: '0.75rem 1rem' }}>Registrar páginas visitadas y clics en botones principales (datos anonimizados)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            ¿Cómo gestionar las cookies?
          </h2>
          <p>
            Puede aceptar o rechazar las cookies analíticas a través del banner que aparece al acceder al sitio web. Además, puede configurar su navegador para bloquear o eliminar todas las cookies:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
            <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad</li>
            <li><strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Tenga en cuenta que bloquear las cookies puede afectar al correcto funcionamiento del sitio.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Cookies de terceros
          </h2>
          <p>
            Este sitio web no instala cookies de terceros con fines publicitarios ni comparte datos con redes de publicidad.
          </p>
        </section>

        <p style={{ fontSize: '0.85rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
