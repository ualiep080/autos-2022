#!/usr/bin/env node
/**
 * Genera public/og-image.jpg (1200x630) usando sharp.
 * Ejecutar: node scripts/generate-og-image.js
 */

const sharp = require('sharp');
const path = require('path');

const OUT = path.join(__dirname, '../public/og-image.jpg');
const LOGO = path.join(__dirname, '../public/logo.jpeg');

const W = 1200;
const H = 630;

// ── Colores de marca ──────────────────────────────────────────────────────────
const BG       = '#0D0D0D';
const YELLOW   = '#F5C518';
const WHITE    = '#FFFFFF';
const GRAY     = '#A0A0A0';
const GRAY_DIM = '#1C1C1C';
const BOTTOM_H = 64;

// ── SVG base (fondo + texto) ───────────────────────────────────────────────────
const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#111111"/>
      <stop offset="100%" stop-color="#1A1A1A"/>
    </linearGradient>
    <!-- Círculo difuso detrás del logo -->
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#F5C518" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#F5C518" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Fondo principal -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Franja izquierda amarilla -->
  <rect x="0" y="0" width="7" height="${H - BOTTOM_H}" fill="${YELLOW}"/>

  <!-- Franja superior decorativa fina -->
  <rect x="7" y="0" width="${W - 7}" height="3" fill="${YELLOW}" opacity="0.25"/>

  <!-- Fondo sección derecha (área logo) -->
  <rect x="720" y="0" width="${W - 720}" height="${H - BOTTOM_H}" fill="${GRAY_DIM}"/>

  <!-- Glowing circle behind logo -->
  <circle cx="960" cy="265" r="260" fill="url(#glow)"/>

  <!-- ── Texto izquierdo ───────────────────────────────────────────────────── -->

  <!-- Eyebrow: categoría -->
  <text x="52" y="118"
        font-family="Arial, Helvetica, sans-serif"
        font-size="22" font-weight="600" letter-spacing="4"
        fill="${YELLOW}" opacity="0.9">
    COMPRAVENTA DE VEHÍCULOS
  </text>

  <!-- Título principal: Autos -->
  <text x="50" y="225"
        font-family="Arial Black, Arial, Helvetica, sans-serif"
        font-size="112" font-weight="900"
        fill="${WHITE}">
    Autos
  </text>

  <!-- Título principal: 2022 (en amarillo) -->
  <text x="50" y="330"
        font-family="Arial Black, Arial, Helvetica, sans-serif"
        font-size="112" font-weight="900"
        fill="${YELLOW}">
    2022
  </text>

  <!-- Línea separadora -->
  <rect x="50" y="360" width="320" height="4" fill="${YELLOW}" rx="2"/>

  <!-- Subtítulo localización -->
  <text x="50" y="418"
        font-family="Arial, Helvetica, sans-serif"
        font-size="32" font-weight="400"
        fill="${WHITE}" opacity="0.85">
    Vícar, Almería
  </text>

  <!-- Descriptor secundario -->
  <text x="50" y="466"
        font-family="Arial, Helvetica, sans-serif"
        font-size="23" font-weight="400"
        fill="${GRAY}">
    Coches usados · Averiados · Sin ITV · Con embargos
  </text>

  <!-- ── Barra inferior ─────────────────────────────────────────────────────── -->
  <rect x="0" y="${H - BOTTOM_H}" width="${W}" height="${BOTTOM_H}" fill="${YELLOW}"/>

  <!-- URL -->
  <text x="50" y="${H - BOTTOM_H + 41}"
        font-family="Arial Black, Arial, sans-serif"
        font-size="26" font-weight="900"
        fill="${BG}">
    autos2022.es
  </text>

  <!-- Teléfono derecha -->
  <text x="${W - 40}" y="${H - BOTTOM_H + 41}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="24" font-weight="700"
        fill="${BG}" text-anchor="end">
    ☎  610 259 725
  </text>
</svg>
`;

async function generate() {
  try {
    // 1. Render SVG base → buffer PNG
    const base = await sharp(Buffer.from(svg)).png().toBuffer();

    // 2. Escalar logo (988×888) → ajustar al área derecha: aprox 300px de ancho
    const LOGO_W = 300;
    const LOGO_H = Math.round(300 * (888 / 988)); // ~270
    const logoResized = await sharp(LOGO)
      .resize(LOGO_W, LOGO_H, { fit: 'cover' })
      .png()
      .toBuffer();

    // 3. Posición del logo: centrado en área derecha (720–1200) y vertical (0–566)
    const logoX = Math.round((720 + W) / 2 - LOGO_W / 2); // ~810
    const logoY = Math.round((H - BOTTOM_H) / 2 - LOGO_H / 2); // ~148

    // 4. Composite logo sobre base
    const result = await sharp(base)
      .composite([
        {
          input: logoResized,
          left: logoX,
          top: logoY,
        },
      ])
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(OUT);

    console.log(`\n✅ Imagen OG generada: ${OUT}`);
    console.log(`   Tamaño: ${result.width}×${result.height} px · ${(result.size / 1024).toFixed(1)} KB\n`);
  } catch (err) {
    console.error('Error generando og-image:', err.message);
    process.exit(1);
  }
}

generate();
