import { prisma } from '@/lib/prisma';
import VehicleForm from './VehicleForm';

export const metadata = {
  title: 'Editar Vehículo | Panel Admin',
};

export default async function AdminVehicleEditPage({ params }) {
  const { id } = await params;
  const isNew = id === 'nuevo';

  let vehicle = null;
  if (!isNew) {
    vehicle = await prisma.vehicle.findUnique({ 
      where: { id },
      include: { images: true } 
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{isNew ? 'Nuevo Vehículo' : 'Editar Vehículo'}</h1>
      </div>
      
      <VehicleForm vehicle={vehicle} isNew={isNew} />
    </div>
  );
}
