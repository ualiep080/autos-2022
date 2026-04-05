const { PrismaClient } = require('@prisma/client');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const prisma = new PrismaClient();

// This is a simple hash mechanism for demo, but normally use bcrypt.
// We will use standard hash logic later, for now we will store a dummy hash or just bcrypt it on the frontend.
// Actually, let's just create a plain text password and expect the login to match it, or use standard web crypto in the app.
// Since we have no bcrypt in dependencies yet, let's just make the password hash 'admin123' directly and the login API will just compare strings (NOT secure, but for the MVP per instructions).
// Wait, better to just use a bcrypt equivalent or simple hash if we have to. Let's store 'admin123' as plaintext for the seed, and the login logic will be intentionally simple as it's a demo.

const mockVehicles = [
  {
    marca: 'SEAT',
    modelo: 'León',
    version: '1.5 TSI Style',
    slug: 'seat-leon-15-tsi-style',
    precio: 18500,
    year: 2021,
    kilometros: 45000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 130,
    motor: '1.5',
    color: 'Rojo',
    puertas: 5,
    plazas: 5,
    etiquetaAmbiental: 'C',
    descripcion: 'SEAT León en perfecto estado, único propietario, revisiones al día.',
    estado: 'disponible',
    visible: true,
    destacado: true,
  },
  {
    marca: 'Volkswagen',
    modelo: 'Golf',
    version: '2.0 TDI Life',
    slug: 'volkswagen-golf-20-tdi-life',
    precio: 21900,
    year: 2020,
    kilometros: 68000,
    combustible: 'Diésel',
    cambio: 'Automático',
    potencia: 150,
    motor: '2.0',
    color: 'Blanco',
    puertas: 5,
    plazas: 5,
    etiquetaAmbiental: 'C',
    descripcion: 'Vehículo nacional muy cuidado y con mantenimientos en casa oficial.',
    estado: 'disponible',
    visible: true,
    destacado: true,
  },
  {
    marca: 'Audi',
    modelo: 'A3',
    version: '35 TFSI S line',
    slug: 'audi-a3-35-tfsi-sline',
    precio: 26500,
    year: 2022,
    kilometros: 25000,
    combustible: 'MHEV',
    cambio: 'Automático',
    potencia: 150,
    color: 'Gris',
    etiquetaAmbiental: 'ECO',
    descripcion: 'Poco uso. Acabado deportivo S line interior y exterior.',
    estado: 'disponible',
    visible: true,
    destacado: false,
  },
  {
    marca: 'BMW',
    modelo: 'Serie 1',
    version: '118i M Sport',
    slug: 'bmw-serie-1-118i-m-sport',
    precio: 24900,
    year: 2021,
    kilometros: 35000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 136,
    color: 'Azul',
    etiquetaAmbiental: 'C',
    descripcion: 'Paquete M Sport. Estado impecable.',
    estado: 'disponible',
    visible: true,
    destacado: true,
  },
  {
    marca: 'Peugeot',
    modelo: '3008',
    version: '1.2 PureTech Allure',
    slug: 'peugeot-3008-12-puretech',
    precio: 19900,
    year: 2019,
    kilometros: 75000,
    combustible: 'Gasolina',
    cambio: 'Automático',
    potencia: 130,
    color: 'Gris',
    etiquetaAmbiental: 'C',
    descripcion: 'SUV familiar muy espacioso con gran equipamiento.',
    estado: 'disponible',
    visible: true,
    destacado: false,
  },
  {
    marca: 'Renault',
    modelo: 'Clio',
    version: '1.0 TCe Zen',
    slug: 'renault-clio-10-tce-zen',
    precio: 14500,
    year: 2022,
    kilometros: 18000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 90,
    color: 'Naranja',
    etiquetaAmbiental: 'C',
    descripcion: 'Como nuevo. Ideal para ciudad y recorridos urbanos.',
    estado: 'disponible',
    visible: true,
    destacado: true,
  },
  {
    marca: 'Nissan',
    modelo: 'Qashqai',
    version: '1.3 DIG-T N-Connecta',
    slug: 'nissan-qashqai-13-digt',
    precio: 18900,
    year: 2020,
    kilometros: 54000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 140,
    color: 'Negro',
    etiquetaAmbiental: 'C',
    descripcion: 'SUV líder en ventas, cámara 360 y pantalla táctil.',
    estado: 'disponible',
    visible: true,
    destacado: false,
  },
  {
    marca: 'Opel',
    modelo: 'Corsa',
    version: '1.2 Edition',
    slug: 'opel-corsa-12-edition',
    precio: 12900,
    year: 2020,
    kilometros: 42000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 75,
    color: 'Gris Plata',
    etiquetaAmbiental: 'C',
    descripcion: 'Consumo muy bajo. Excelente primer coche.',
    estado: 'reservado',
    visible: true,
    destacado: false,
  },
  {
    marca: 'Ford',
    modelo: 'Focus',
    version: '1.0 EcoBoost ST-Line',
    slug: 'ford-focus-10-ecoboost-stline',
    precio: 17500,
    year: 2019,
    kilometros: 60000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 125,
    color: 'Rojo',
    etiquetaAmbiental: 'C',
    descripcion: 'Acabado deportivo, muy dinámico y divertido de conducir.',
    estado: 'disponible',
    visible: true,
    destacado: false,
  },
  {
    marca: 'Mercedes-Benz',
    modelo: 'Clase A',
    version: '200 d AMG Line',
    slug: 'mercedes-clase-a-200d-amg',
    precio: 28900,
    year: 2021,
    kilometros: 48000,
    combustible: 'Diésel',
    cambio: 'Automático',
    potencia: 150,
    color: 'Blanco',
    etiquetaAmbiental: 'C',
    descripcion: 'Paquete AMG completo interior y exterior. Sistema MBUX.',
    estado: 'disponible',
    visible: true,
    destacado: true,
  },
  {
    marca: 'Toyota',
    modelo: 'C-HR',
    version: '125H Advance',
    slug: 'toyota-chr-125h-advance',
    precio: 22500,
    year: 2021,
    kilometros: 32000,
    combustible: 'Híbrido',
    cambio: 'Automático',
    potencia: 122,
    color: 'Plata',
    etiquetaAmbiental: 'ECO',
    descripcion: 'Híbrido autorrecargable, gran fiabilidad y bajo consumo.',
    estado: 'disponible',
    visible: true,
    destacado: false,
  },
  {
    marca: 'Hyundai',
    modelo: 'Tucson',
    version: '1.6 TGDI Maxx',
    slug: 'hyundai-tucson-16-tgdi',
    precio: 25500,
    year: 2022,
    kilometros: 15000,
    combustible: 'Gasolina',
    cambio: 'Manual',
    potencia: 150,
    color: 'Azul',
    etiquetaAmbiental: 'C',
    descripcion: 'Diseño espectacular, amplio y moderno. Todavía con garantía oficial.',
    estado: 'vendido',
    visible: true,
    destacado: false,
  }
];

async function main() {
  console.log('Seeding database...');
  
  // Clear existing
  await prisma.vehicleImage.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.siteSettings.deleteMany();

  // Create Admin
  await prisma.adminUser.create({
    data: {
      nombre: 'Administrador Demo',
      email: 'admin@cochesvicar.com',
      passwordHash: 'admin123', // Demo plaintext, will use simple compare in API
      rol: 'admin'
    }
  });

  // Create Settings
  await prisma.siteSettings.create({
    data: {
      telefono: '600 000 000',
      whatsapp: '600 000 000',
      email: 'info@cochesvicar.com',
      direccion: 'Polígono Industrial, Vícar, Almería',
      horario: 'Lunes a Viernes 09:30 - 14:00 y 16:30 - 20:00. Sábados 10:00 - 13:30',
      textosHome: 'Coches revisados y garantizados al mejor precio en Vícar, Almería. ¡Ven a conocernos!',
    }
  });

  // Create Vehicles
  for (const car of mockVehicles) {
    const vehicle = await prisma.vehicle.create({
      data: car
    });
    
    // Add dummy image
    await prisma.vehicleImage.create({
      data: {
        vehicleId: vehicle.id,
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop',
        alt: `${car.marca} ${car.modelo}`,
        esPrincipal: true,
        orden: 1,
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
