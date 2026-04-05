import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteVehicleButton from '@/components/DeleteVehicleButton';

export const metadata = {
  title: 'Vehículos | Panel de Administración',
};

export const revalidate = 0; // Prevent caching of admin datagrid

export default async function AdminVehiclesPage() {
  const cars = await prisma.vehicle.findMany({
    orderBy: { fechaPublicacion: 'desc' }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Gestión de Vehículos</h1>
        <Link href="/admin/vehiculos/nuevo" className="btn btn-primary">+ Añadir Vehículo</Link>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Marca y Modelo</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Matrícula/Versión</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Precio</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b' }}>Estado</th>
              <th style={{ padding: '1rem', fontWeight: '600', color: '#64748b', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: '600' }}>{car.marca} {car.modelo}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{car.year} | {car.kilometros} km</div>
                </td>
                <td style={{ padding: '1rem', color: '#475569' }}>{car.version}</td>
                <td style={{ padding: '1rem', fontWeight: '600' }}>{formatPrice(car.precio)}</td>
                <td style={{ padding: '1rem' }}>
                  <span className={`badge badge-${car.estado}`}>{car.estado}</span>
                  {!car.visible && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'red' }}>(Oculto)</span>}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', alignItems: 'center' }}>
                    <Link href={`/admin/vehiculos/${car.id}`} className="action-btn edit-btn" title="Editar vehículo">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </Link>
                    <DeleteVehicleButton vehicleId={car.id} />
                  </div>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>No hay vehículos registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
