'use client';

import { useState } from 'react';

export default function LeadForm({ vehicleId }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      email: formData.get('email'),
      mensaje: formData.get('mensaje'),
      vehicleId
    };

    // Validar nombre
    if (data.nombre.trim().length < 2) {
      setValidationError('Introduce tu nombre (mínimo 2 caracteres).');
      setStatus('idle');
      return;
    }

    // Validar teléfono
    const rawPhone = data.telefono.trim();
    if (rawPhone.length > 20) {
      setValidationError('Introduce un teléfono válido.');
      setStatus('idle');
      return;
    }
    const cleanedPhone = rawPhone.replace(/[\s\-\(\)]/g, '');
    let finalPhone = cleanedPhone;
    if (finalPhone.startsWith('+34')) {
      finalPhone = finalPhone.substring(3);
    } else if (finalPhone.startsWith('0034')) {
      finalPhone = finalPhone.substring(4);
    }
    if (!/^[6789]\d{8}$/.test(finalPhone)) {
      setValidationError('El teléfono debe tener exactamente 9 dígitos válidos.');
      setStatus('idle');
      return;
    }
    data.telefono = finalPhone;

    // Validar email
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      setValidationError('Introduce un email válido.');
      setStatus('idle');
      return;
    }

    // Validar mensaje
    if (data.mensaje.trim().length < 3) {
      setValidationError('Completa este campo (mínimo 3 caracteres).');
      setStatus('idle');
      return;
    }

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
        const errData = await res.json().catch(() => ({}));
        setValidationError(errData.error || 'Ocurrió un error en el servidor.');
        setStatus('error');
      }
    } catch (err) {
      setValidationError('Ocurrió un error de conexión.');
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
        <input type="text" id="nombre" name="nombre" required autoComplete="name" minLength="2" maxLength="80" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="telefono" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Teléfono *</label>
        <input type="tel" id="telefono" name="telefono" required inputMode="tel" autoComplete="tel" maxLength="20" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Email</label>
        <input type="email" id="email" name="email" autoComplete="email" maxLength="120" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="mensaje" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Mensaje *</label>
        <textarea id="mensaje" name="mensaje" required minLength="3" maxLength="1000" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem', minHeight: '100px', resize: 'vertical' }}></textarea>
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {validationError && (
        <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center', backgroundColor: '#fef2f2', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #fca5a5' }}>
          {validationError}
        </p>
      )}
    </form>
  );
}
