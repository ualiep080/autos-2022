'use client';

export default function CallButton() {
  return (
    <a
      href="tel:+34610259725"
      id="floating-call-btn"
      aria-label="Llamar a Garage Autos 2022"
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        background: '#F5C518',
        color: '#1a1a1a',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        fontSize: '0.9rem',
        padding: '0.75rem 1.25rem',
        borderRadius: '999px',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(245, 197, 24, 0.5)',
        animation: 'pulse-cta-call 2s ease-in-out infinite',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.06)';
        e.currentTarget.style.animation = 'none';
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(245, 197, 24, 0.7)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.animation = 'pulse-cta-call 2s ease-in-out infinite';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(245, 197, 24, 0.5)';
      }}
    >
      {/* Phone SVG icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
      Llamar ahora
    </a>
  );
}
