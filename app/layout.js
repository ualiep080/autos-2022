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

const OG_TITLE = 'Autos 2022 | Compraventa de coches en Vícar, Almería';
const OG_DESCRIPTION =
  'Compra y venta de vehículos de ocasión en Vícar, Almería. Valoramos coches usados, averiados o sin ITV bajo valoración previa. Atención directa por teléfono y WhatsApp.';
const OG_IMAGE = '/og-image.jpg';

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: OG_TITLE,
    template: '%s | Autos 2022',
  },

  description: OG_DESCRIPTION,

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

  alternates: {
    canonical: '/',
  },

  openGraph: {
    siteName: 'Autos 2022',
    locale: 'es_ES',
    type: 'website',
    url: BASE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
        alt: 'Autos 2022 — Compraventa de vehículos en Vícar, Almería',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
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
