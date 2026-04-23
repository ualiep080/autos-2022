import { prisma } from '@/lib/prisma';
import { markAsContacted, markAsNew } from './actions';

export const metadata = {
  title: 'Contactos | Panel de Administración',
};

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { fechaCreacion: 'desc' },
    include: { vehicle: true }
  });

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Contactos Recibidos (Leads)</h1>

      <div className="table-responsive" style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
        <table style={{ minWidth: '700px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Fecha</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Contacto</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Mensaje e Interés</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', color: '#475569', fontSize: '0.875rem', verticalAlign: 'top' }}>
                  {new Date(lead.fechaCreacion).toLocaleDateString('es-ES')} <br/>
                  {new Date(lead.fechaCreacion).toLocaleTimeString('es-ES')}
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: '600' }}>{lead.nombre}</div>
                  <div style={{ fontSize: '0.875rem' }}><a href={`tel:${lead.telefono}`} style={{ color: 'var(--primary)' }}>{lead.telefono}</a></div>
                  {lead.email && <div style={{ fontSize: '0.875rem' }}><a href={`mailto:${lead.email}`}>{lead.email}</a></div>}
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top', maxWidth: '400px' }}>
                  {lead.vehicle && (
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                      Interés sobre: {lead.vehicle.marca} {lead.vehicle.modelo}
                    </div>
                  )}
                  <p style={{ fontSize: '0.875rem', color: '#475569', whiteSpace: 'pre-wrap' }}>{lead.mensaje}</p>
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                    backgroundColor: lead.estado === 'nuevo' ? '#fef08a' : '#dcfce7',
                    color: lead.estado === 'nuevo' ? '#854d0e' : '#166534'
                  }}>
                    {lead.estado === 'nuevo' ? 'NUEVO' : 'ATENDIDO'}
                  </span>
                  <form action={lead.estado === 'nuevo' ? markAsContacted : markAsNew}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button type="submit" style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      border: '1px solid #cbd5e1',
                      background: 'white',
                      cursor: 'pointer',
                      display: 'block'
                    }}>
                      {lead.estado === 'nuevo' ? '✓ Marcar Atendido' : '↩ Marcar Nuevo'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>No hay contactos aún</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
