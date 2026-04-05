'use client';

import { useState } from 'react';

export default function LeadForm({ vehicleId }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      email: formData.get('email'),
      mensaje: formData.get('mensaje'),
      vehicleId
    };

    try {
      const res = await fetch('/api/public/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '0.5rem' }}>
        <strong>¡Mensaje enviado!</strong>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Nos pondremos en contacto contigo lo antes posible.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: '1rem', width: '100%' }}>Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="nombre" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Nombre *</label>
        <input type="text" id="nombre" name="nombre" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="telefono" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Teléfono *</label>
        <input type="tel" id="telefono" name="telefono" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Email</label>
        <input type="email" id="email" name="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="mensaje" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Mensaje *</label>
        <textarea id="mensaje" name="mensaje" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', minHeight: '100px', resize: 'vertical' }}></textarea>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'error' && (
        <p style={{ color: 'var(--primary)', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
          Ocurrió un error. Por favor, inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
