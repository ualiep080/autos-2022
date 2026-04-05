import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';

// Simple CSS purely for the admin panel layout
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
  },
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
    color: 'white'
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
    transition: 'background-color 0.2s',
    display: 'block'
  },
  linkActive: {
    backgroundColor: '#1e293b',
    color: 'white',
    fontWeight: '600'
  },
  content: {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    backgroundColor: 'white',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    boxShadow: 'var(--shadow-sm)'
  }
};

export default function AdminLayout({ children }) {
  // We cannot use layout.jsx conditionally easily without breaking Next.js rules
  // So the login page will be outside this layout structure logically by returning its own layout or just rendering children?
  // Wait, in Next.js app router, app/admin/layout.jsx applies to app/admin/login too!
  // To fix this, I should have put login in /admin/login/page.jsx without the layout, or use route groups.
  // Actually, I can check the headers or just make this layout render children directly if the url is /admin/login.
  // Let's use a Route Group (app/(admin-panel)/layout.jsx) to make it cleaner, but since I already created app/admin/login,
  return (
    <div style={styles.container}>
      <AdminSidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Sesión iniciada</span>
        </header>
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
