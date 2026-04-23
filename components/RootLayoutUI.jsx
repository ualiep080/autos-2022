'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CallButton from './CallButton';
import CookieBanner from './CookieBanner';
import AnalyticsTracker from './AnalyticsTracker';

export default function RootLayoutUI({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
      <CallButton />
      <CookieBanner />
    </>
  );
}
