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

  const sitelinksSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'SiteNavigationElement',
        'position': 1,
        'name': 'Coches en Stock',
        'description': 'Vehículos de ocasión · Revisados y garantizados · Encuentra tu próximo coche al mejor precio en Almería.',
        'url': 'https://www.autos2022.es/coches-en-stock'
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 2,
        'name': 'Vende tu Vehículo',
        'description': 'Máxima tasación · Pago en efectivo inmediato · Compramos vehículos usados, averiados o con embargos en Almería.',
        'url': 'https://www.autos2022.es/vende-tu-vehiculo'
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 3,
        'name': 'Sobre Nosotros',
        'description': 'Transparencia y confianza por bandera · Trato directo y honesto · Especialistas en compraventa de vehículos en Almería.',
        'url': 'https://www.autos2022.es/sobre-nosotros'
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 4,
        'name': 'Contacto y Ubicación',
        'description': 'Atención personalizada al cliente · Llámanos o envíanos un WhatsApp · Visita nuestra exposición en Vícar, Almería.',
        'url': 'https://www.autos2022.es/contacto'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
      />
    </>
  );
}
