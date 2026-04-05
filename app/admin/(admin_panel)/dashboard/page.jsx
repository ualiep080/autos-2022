import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Panel de Administración',
};

export default async function DashboardPage() {
  const [totalVehicles, availableVehicles, totalLeads, newLeads] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { estado: 'disponible' } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { estado: 'nuevo' } }),
  ]);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Vehículos Totales</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{totalVehicles}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Vehículos Disponibles</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a' }}>{availableVehicles}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Leads Totales</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{totalLeads}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>Leads Nuevos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ea580c' }}>{newLeads}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/admin/vehiculos" className="btn btn-primary">Gestionar Vehículos</Link>
        <Link href="/admin/leads" className="btn btn-outline" style={{ background: 'white' }}>Ver Contactos</Link>
      </div>
    </div>
  );
}
