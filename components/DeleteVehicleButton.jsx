'use client';

import { useState } from 'react';
import { deleteVehicleAction } from '@/app/admin/(admin_panel)/vehiculos/[id]/actions';

export default function DeleteVehicleButton({ vehicleId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRealDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      const res = await deleteVehicleAction(vehicleId);
      if (res && res.success) {
        window.location.reload();
      } else {
        alert('Server Action falló: ' + JSON.stringify(res));
        setIsDeleting(false);
        setShowConfirm(false);
      }
    } catch (err) {
      alert('Excepción de red/React: ' + err.message);
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button 
          onClick={handleRealDelete} 
          disabled={isDeleting}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: isDeleting ? 'not-allowed' : 'pointer' }}
        >
          {isDeleting ? 'Borrando...' : 'Confirmar'}
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(false); }}
          disabled={isDeleting}
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '0.25rem', cursor: isDeleting ? 'not-allowed' : 'pointer' }}
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowConfirm(true); }}
      className="action-btn delete-btn"
      title="Eliminar vehículo"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  );
}
