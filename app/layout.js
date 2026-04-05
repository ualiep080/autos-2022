import './globals.css';
import Navbar from '@/components/Navbar';
import RootLayoutUI from '@/components/RootLayoutUI';

export const metadata = {
  title: 'Autos 2022 | Coches de Segunda Mano y Ocasión en Almería',
  description: 'Tu concesionario de confianza en Vícar, Almería. Especialistas en vehículos de segunda mano, ocasión y seminuevos revisados y garantizados.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <RootLayoutUI>
          {children}
        </RootLayoutUI>
      </body>
    </html>
  );
}
