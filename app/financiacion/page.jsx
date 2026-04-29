import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Financiación de vehículos | Autos 2022',
  description: 'Consulta opciones de financiación para comprar tu próximo coche con Autos 2022 en Vícar, Almería.',
};

// La página de financiación ahora redirige a "Vende tu vehículo"
export default function FinanciacionPage() {
  redirect('/vende-tu-vehiculo');
}
