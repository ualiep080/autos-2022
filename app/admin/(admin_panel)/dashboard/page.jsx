import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Panel de Administración',
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    totalVehicles,
    availableVehicles,
    totalLeads,
    newLeads,
    totalViews,
    viewsToday,
    topPages,
    topClicks,
    viewsLast7Days,
  ] = await Promise.all([
    prisma.vehicle.count(),
    prisma.vehicle.count({ where: { estado: 'disponible' } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { estado: 'nuevo' } }),
    prisma.pageView.count({ where: { event: 'pageview' } }),
    prisma.pageView.count({
      where: {
        event: 'pageview',
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    // Top pages by visits
    prisma.pageView.groupBy({
      by: ['page'],
      where: { event: 'pageview' },
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } },
      take: 5,
    }),
    // Top clicked elements
    prisma.pageView.groupBy({
      by: ['element'],
      where: { event: 'click', element: { not: null } },
      _count: { element: true },
      orderBy: { _count: { element: 'desc' } },
      take: 5,
    }),
    // Views per day last 7 days
    prisma.$queryRaw`
      SELECT DATE("created_at") as day, COUNT(*) as count
      FROM "PageView"
      WHERE event = 'pageview'
        AND "created_at" >= NOW() - INTERVAL '7 days'
      GROUP BY DATE("created_at")
      ORDER BY day ASC
    `,
  ]);

  const statCard = (label, value, color = 'var(--text-main)', subtitle = '') => (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <h3 style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</h3>
      <p style={{ fontSize: '2.5rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</p>
      {subtitle && <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.5rem' }}>{subtitle}</p>}
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--secondary)' }}>Dashboard</h1>

      {/* ===== KPIs vehículos y leads ===== */}
      <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
        Vehículos y Contactos
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {statCard('Vehículos Totales', totalVehicles ?? 0)}
        {statCard('Disponibles', availableVehicles ?? 0, '#16a34a')}
        {statCard('Leads Totales', totalLeads ?? 0)}
        {statCard('Leads Nuevos', newLeads ?? 0, '#ea580c', 'Sin gestionar')}
      </div>

      {/* ===== KPIs tráfico ===== */}
      <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
        Tráfico Web
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {statCard('Visitas Totales', totalViews ?? 0, '#1a1a1a')}
        {statCard('Visitas Hoy', viewsToday ?? 0, '#F5C518')}
      </div>

      {/* ===== Tablas analytics ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>

        {/* Top páginas */}
        <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6', fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>
            📊 Páginas más visitadas
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '0.6rem 1.5rem', textAlign: 'left', color: '#6b7280', fontWeight: 600 }}>Página</th>
                <th style={{ padding: '0.6rem 1.5rem', textAlign: 'right', color: '#6b7280', fontWeight: 600 }}>Visitas</th>
              </tr>
            </thead>
            <tbody>
              {(!topPages || topPages.length === 0) ? (
                <tr><td colSpan={2} style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af' }}>Sin datos aún</td></tr>
              ) : topPages.map((row, i) => (
                <tr key={row?.page || i} style={{ borderTop: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.65rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-main)' }}>{row?.page || '/'}</td>
                  <td style={{ padding: '0.65rem 1.5rem', textAlign: 'right', fontWeight: 700, color: '#F5C518', fontFamily: 'monospace' }}>{Number(row?._count?.page ?? 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top clicks */}
        <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f3f4f6', fontWeight: 700, fontSize: '0.9rem', color: 'var(--secondary)' }}>
            🖱️ Botones más pulsados
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '0.6rem 1.5rem', textAlign: 'left', color: '#6b7280', fontWeight: 600 }}>Elemento</th>
                <th style={{ padding: '0.6rem 1.5rem', textAlign: 'right', color: '#6b7280', fontWeight: 600 }}>Clics</th>
              </tr>
            </thead>
            <tbody>
              {(!topClicks || topClicks.length === 0) ? (
                <tr><td colSpan={2} style={{ padding: '1.5rem', textAlign: 'center', color: '#9ca3af' }}>Sin datos aún</td></tr>
              ) : topClicks.map((row, i) => (
                <tr key={row?.element || i} style={{ borderTop: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.65rem 1.5rem', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-main)' }}>{row?.element}</td>
                  <td style={{ padding: '0.65rem 1.5rem', textAlign: 'right', fontWeight: 700, color: '#16a34a', fontFamily: 'monospace' }}>{Number(row?._count?.element ?? 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Acciones rápidas ===== */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/admin/vehiculos" className="btn btn-primary">Gestionar Vehículos</Link>
        <Link href="/admin/leads" className="btn btn-outline" style={{ background: 'white' }}>Ver Contactos</Link>
      </div>
    </div>
  );
}
