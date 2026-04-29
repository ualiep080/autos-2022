'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Vehículos', path: '/admin/vehiculos' },
    { name: 'Contactos (Leads)', path: '/admin/leads' }
  ];

  const styles = {
    // Removed sidebar inline styles as they are now in globals.css
    logo: {
      fontSize: '1.5rem',
      fontWeight: '800',
      marginBottom: '3rem',
      color: 'white',
      textDecoration: 'none'
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    link: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      color: '#cbd5e1',
      transition: 'all 0.2s ease',
      display: 'block',
      textDecoration: 'none'
    },
    linkActive: {
      backgroundColor: 'var(--primary)',
      color: 'var(--text-on-primary)',
      fontWeight: '700'
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo-wrapper" style={{ marginBottom: '3rem' }}>
        <Link href="/" style={styles.logo}>
          Autos <span style={{color: 'var(--primary)'}}>2022</span>
        </Link>
        <div style={{fontSize:'0.875rem', fontWeight:'normal', color:'#94a3b8', marginTop: '0.25rem'}}>Panel Admin</div>
      </div>
      <nav style={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link 
              key={item.name}
              href={item.path} 
              style={{
                ...styles.link, 
                ...(isActive ? styles.linkActive : {})
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.target.style.backgroundColor = 'var(--secondary-light)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.target.style.backgroundColor = 'transparent';
              }}
            >
              {item.name}
            </Link>
          );
        })}
        <Link 
          href="/" 
          style={{...styles.link, marginTop: 'auto'}} 
          target="_blank"
          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--secondary-light)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Ver web pública ↗
        </Link>
        <button 
          onClick={handleLogout}
          style={{
            ...styles.link, 
            marginTop: '0.5rem', 
            backgroundColor: 'transparent',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '1rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.target.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#cbd5e1';
          }}
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
