'use client';

export default function VehicleTypeCard({ icon, label }) {
  return (
    <div
      style={{
        background: 'white',
        border: '1.5px solid var(--border-color)',
        borderRadius: '1rem',
        padding: '2rem 1rem',
        textAlign: 'center',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,197,24,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{icon}</div>
      <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{label}</p>
    </div>
  );
}
