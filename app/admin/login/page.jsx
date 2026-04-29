'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
      <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem', color: 'var(--secondary)' }}>
          Autos <span style={{color: 'var(--primary)'}}>2022</span> <br/>
          <span style={{ fontSize:'1rem', color:'var(--text-muted)', fontWeight:'normal' }}>Panel de Administración</span>
        </h1>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
            <input type="email" id="email" name="email" autoComplete="username" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Contraseña</label>
            <input type="password" id="password" name="password" autoComplete="current-password" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Entrando...' : 'Acceder'}
          </button>
        </form>
      </div>
    </div>
  );
}
