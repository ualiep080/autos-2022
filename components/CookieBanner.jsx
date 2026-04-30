'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconCookie } from './Icons';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it doesn't flash immediately
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      style={{
        position: 'fixed',
        bottom: '5rem',
        left: '1.5rem',
        right: '1.5rem',
        maxWidth: '480px',
        background: '#1a1a1a',
        color: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        zIndex: 9998,
        border: '1px solid rgba(245,197,24,0.25)',
        animation: 'slideInUp 0.4s ease',
      }}
    >
      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', color: '#d1d5db', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{ flexShrink: 0, marginTop: '2px' }}><IconCookie size={18} color="#F5C518" /></span>
        <span>
          Usamos cookies para analizar el tráfico y mejorar tu experiencia.{' '}
          <Link href="/cookies" style={{ color: '#F5C518', fontWeight: 600 }}>
            Más información
          </Link>
        </span>
      </p>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={accept}
          id="cookie-accept-btn"
          style={{
            flex: 1,
            background: '#F5C518',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Aceptar
        </button>
        <button
          onClick={decline}
          id="cookie-decline-btn"
          style={{
            flex: 1,
            background: 'transparent',
            color: '#9ca3af',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          Solo esenciales
        </button>
      </div>
    </div>
  );
}
