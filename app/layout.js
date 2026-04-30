import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import RootLayoutUI from '@/components/RootLayoutUI';
import JsonLd from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const BASE_URL = 'https://www.autos2022.es';

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
    template: '%s | Autos 2022',
  },

  description:
    'Autos 2022 es una empresa de compraventa de vehículos en Vícar, Almería. Compra y venta de coches de ocasión, vehículos averiados, siniestrados o para desguace, con trato directo y atención personalizada.',

  keywords: [
    'compraventa de coches Vícar',
    'compraventa de coches Almería',
    'coches de ocasión Almería',
    'vender coche Almería',
    'comprar coche Vícar',
    'vehículos averiados Almería',
    'coches siniestrados Almería',
    'Autos 2022',
  ],

  authors: [{ name: 'Autos 2022' }],

  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },

  openGraph: {
    siteName: 'Autos 2022',
    locale: 'es_ES',
    type: 'website',
    url: BASE_URL,
    title: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
    description:
      'Compra y venta de vehículos en Vícar, Almería. Pago inmediato en efectivo, recogida en menos de 24h. Vehículos averiados, siniestrados, con embargos o para desguace.',
    images: [
      {
        url: '/logo.jpeg',
        width: 400,
        height: 400,
        alt: 'Autos 2022 — Compraventa de vehículos en Vícar, Almería',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Autos 2022 | Compraventa de coches en Vícar, Almería',
    description:
      'Compramos todo tipo de vehículos en Almería. Pago inmediato, recogida en 24h, sin burocracia.',
    images: ['/logo.jpeg'],
  },

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <JsonLd />
        <RootLayoutUI>
          {children}
        </RootLayoutUI>
      </body>
    </html>
  );
}
