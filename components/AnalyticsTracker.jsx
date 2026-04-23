'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Track pageview on route change
  useEffect(() => {
    trackEvent('pageview', { page: pathname });
  }, [pathname]);

  // Track CTA button clicks globally
  useEffect(() => {
    const handleClick = (e) => {
      const btn = e.target.closest('[id]');
      if (!btn) return;

      const id = btn.id;
      // Track buttons that have meaningful IDs (our CTA buttons)
      const ctaPatterns = ['btn', 'whatsapp', 'call', 'search', 'catalogo', 'sell', 'floating'];
      if (ctaPatterns.some(p => id.toLowerCase().includes(p))) {
        trackEvent('click', { page: pathname, element: id });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}

async function trackEvent(event, data) {
  try {
    await fetch('/api/public/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, ...data }),
    });
  } catch {
    // Silent fail — never break the user experience
  }
}
