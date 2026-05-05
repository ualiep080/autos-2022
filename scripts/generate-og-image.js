#!/usr/bin/env node
/**
 * Genera public/og-image.jpg (1200x630).
 * Diseño: logo grande centrado sobre fondo negro + "autos2022.es" abajo.
 * Ejecutar: node scripts/generate-og-image.js
 */

const sharp = require('sharp');
const path = require('path');

const OUT  = path.join(__dirname, '../public/og-image.jpg');
const LOGO = path.join(__dirname, '../public/logo.jpeg');

const W = 1200;
const H = 630;

// Padding y área disponible
const PAD_TOP     = 30;
const PAD_SIDE    = 40;
const PAD_BOTTOM  = 75; // espacio para el texto URL

const availW = W - PAD_SIDE * 2;   // 1120
const availH = H - PAD_TOP - PAD_BOTTOM; // 525

async function generate() {
  // 1. Obtener dimensiones reales del logo
  const meta = await sharp(LOGO).metadata();
  const logoW = meta.width;
  const logoH = meta.height;

  // 2. Escalar logo para que quepa en el área disponible (fit: inside)
  const scale  = Math.min(availW / logoW, availH / logoH);
  const resW   = Math.round(logoW * scale);
  const resH   = Math.round(logoH * scale);

  const logoResized = await sharp(LOGO)
    .resize(resW, resH, { fit: 'inside', kernel: 'lanczos3' })
    .jpeg({ quality: 95 })
    .toBuffer();

  // 3. Centrar logo: margen izquierdo y superior
  const logoX = Math.round((W - resW) / 2);
  const logoY = PAD_TOP + Math.round((availH - resH) / 2);

  // 4. SVG de fondo + texto URL (se composita después del logo)
  const textSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <!-- Fondo negro limpio -->
      <rect width="${W}" height="${H}" fill="#0D0D0D"/>
      <!-- Línea amarilla inferior -->
      <rect x="0" y="${H - 4}" width="${W}" height="4" fill="#F5C518"/>
      <!-- URL centrada -->
      <text
        x="${W / 2}" y="${H - 18}"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="22"
        font-weight="700"
        letter-spacing="3"
        fill="#F5C518"
        opacity="0.85"
      >autos2022.es</text>
    </svg>`;

  const bgBuffer = await sharp(Buffer.from(textSvg)).png().toBuffer();

  // 5. Compositar: fondo → logo centrado
  await sharp(bgBuffer)
    .composite([{ input: logoResized, left: logoX, top: logoY }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(OUT);

  const result = await sharp(OUT).metadata();
  console.log(`\n✅  ${OUT}`);
  console.log(`    ${result.width}×${result.height} px`);
  console.log(`    Logo renderizado: ${resW}×${resH} px (posición ${logoX},${logoY})\n`);
}

generate().catch(err => { console.error(err.message); process.exit(1); });
