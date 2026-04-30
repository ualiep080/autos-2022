'use client';

import { useState } from 'react';
import { deleteLead } from '@/app/admin/(admin_panel)/leads/actions';

export default function DeleteLeadButton({ leadId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm('¿Seguro que quieres eliminar este lead? Esta acción no se puede deshacer.')) {
      setIsDeleting(true);
      const formData = new FormData();
      formData.append('id', leadId);
      await deleteLead(formData);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      title="Eliminar lead"
      style={{
        fontSize: '0.75rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '0.25rem',
        border: '1px solid #fca5a5',
        background: '#fef2f2',
        color: '#dc2626',
        cursor: isDeleting ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        marginTop: '0.5rem',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
