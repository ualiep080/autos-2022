/**
 * LocalBusiness / AutoDealer JSON-LD structured data for Autos 2022.
 * Rendered as a <script> tag in the <head> via Next.js App Router.
 */
export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Autos 2022',
    description:
      'Empresa de compraventa de vehículos en Vícar, Almería. Compramos coches usados, averiados, siniestrados o para desguace. Pago inmediato y recogida rápida.',
    url: 'https://www.autos2022.es',
    telephone: '+34610259725',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Blvr. Cdad. de Vícar, 75',
      addressLocality: 'Vícar',
      addressRegion: 'Almería',
      postalCode: '04738',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.8073,
      longitude: -2.6056,
    },
    areaServed: [
      { '@type': 'City', name: 'Vícar' },
      { '@type': 'City', name: 'Almería' },
      { '@type': 'City', name: 'Roquetas de Mar' },
      { '@type': 'City', name: 'El Ejido' },
      { '@type': 'City', name: 'Aguadulce' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '16:30',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '13:30',
      },
    ],
    priceRange: '€€',
    image: 'https://www.autos2022.es/logo.jpeg',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
