import { redirect } from 'next/navigation';

// La página de financiación ahora redirige a "Vende tu vehículo"
export default function FinanciacionPage() {
  redirect('/vende-tu-vehiculo');
}
