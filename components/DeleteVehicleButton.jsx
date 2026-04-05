'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteVehicleAction } from '@/app/admin/(admin_panel)/vehiculos/[id]/actions';

export default function DeleteVehicleButton({ vehicleId }) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('¿Estás totalmente seguro de que deseas eliminar este vehículo? Esta acción no se puede deshacer y borrará también las fotos asociadas.')) return;

    setIsDeleting(true);
    startTransition(async () => {
      const res = await deleteVehicleAction(vehicleId);
      if (res.success) {
        // revalidation handled on server, just refresh client route
        router.refresh();
      } else {
        alert(res.error);
        setIsDeleting(false);
      }
    });
  };

  const loading = isPending || isDeleting;

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="action-btn delete-btn"
      style={{
        opacity: loading ? 0.5 : 1,
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
      title="Eliminar vehículo"
    >
      {/* Trash Icon SVGs */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  );
}
