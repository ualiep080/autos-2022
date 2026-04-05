'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Vehículos', path: '/admin/vehiculos' },
    { name: 'Contactos (Leads)', path: '/admin/leads' }
  ];

  const styles = {
    sidebar: {
      width: '250px',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
    },
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
      backgroundColor: '#1e293b',
      color: 'white',
      fontWeight: '600'
    }
  };

  return (
    <aside style={styles.sidebar}>
      <div style={{ marginBottom: '3rem' }}>
        <Link href="/" style={styles.logo}>
          Autos <span style={{color: '#dc2626'}}>2022</span>
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
                if (!isActive) e.target.style.backgroundColor = '#1e293b';
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
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Ver web pública ↗
        </Link>
      </nav>
    </aside>
  );
}
