import Link from 'next/link';
import styles from './GoogleReviewsSection.module.css';

// Editar aqui para actualizar el enlace de resenas de Google
// Obtener el enlace en: Perfil de Empresa de Google -> "Pedir resenas"
const GOOGLE_REVIEW_URL = 'https://g.page/r/CS1WU5qKHuxmEBM/review';

// Sustituir estos objetos por resenas reales de la ficha de Google de Autos 2022
// Copiar texto y nombre exactamente como aparecen en Google Business Profile
// Si el array esta vacio se muestra el estado de invitacion a resenar sin cards
const googleReviews = [
  {
    name: 'Martina Nanzier',
    rating: 5,
    text: 'La experiencia con el vendedor fue muy buena. Su atención y compromiso con el comprador es excelente y real. Les doy mi recomendación, es leal.',
  },
  {
    name: 'Juan Martinez',
    rating: 5,
    text: 'Profesional muy cercano con el cliente, te ayuda en lo que puede.',
  },
  {
    name: 'Francisco Fernandez',
    rating: 5,
    text: 'Servicio perfecto. Grandes profesionales. Gracias por todo.',
  },
  {
    name: 'juanje sg',
    rating: 5,
    text: 'Todo perfecto, ningún tipo de problema. Gran profesional.',
  },
  {
    name: 'Jeanpool Carbajal pinto',
    rating: 5,
    text: 'Muy buena atención, 10/10.',
  },
  {
    name: 'colorinm33',
    rating: 5,
    text: 'Buen trato, buen servicio, muy atento. Una persona encantadora, no dudes en contactar con él.',
  },
];

function StarRating({ rating }) {
  return (
    <div className={styles.stars} aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function GoogleReviewsSection() {
  const hasReviews = googleReviews.length > 0;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className="accent-line" style={{ margin: '0 auto 1.5rem' }} />
          {hasReviews ? (
            <>
              <h2 className={styles.title}>Opiniones de clientes</h2>
              <p className={styles.subtitle}>
                Clientes que ya han confiado en Autos 2022 para comprar o vender su
                vehículo en Vícar, Almería.
              </p>
            </>
          ) : (
            <>
              <h2 className={styles.title}>Tu opinión nos ayuda a mejorar</h2>
              <p className={styles.subtitle}>
                Si has comprado o vendido tu vehículo con Autos 2022, puedes dejarnos
                tu reseña en Google. Tu valoración ayuda a que más clientes nos encuentren.
              </p>
            </>
          )}
        </div>

        {hasReviews && (
          <div className={styles.grid}>
            {googleReviews.map((review, i) => (
              <article key={i} className={styles.card}>
                <StarRating rating={review.rating} />
                <p className={styles.text}>&ldquo;{review.text}&rdquo;</p>
                <p className={styles.author}>{review.name}</p>
              </article>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          <a
            href={GOOGLE_REVIEW_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deja tu reseña
          </a>
          <Link href="/vehiculos-vendidos" className="btn btn-outline-gold">
            Ver vehículos vendidos
          </Link>
        </div>
      </div>
    </section>
  );
}
