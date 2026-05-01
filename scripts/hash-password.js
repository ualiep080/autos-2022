#!/usr/bin/env node
/**
 * Genera un hash bcrypt para usar como ADMIN_PASSWORD_HASH en Vercel.
 *
 * Uso:
 *   npm run hash-password -- "TuPasswordAqui"
 *
 * Copia el hash resultante y ponlo en Vercel como:
 *   ADMIN_PASSWORD_HASH=<hash generado>
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Error: debes proporcionar una contraseña como argumento.');
  console.error('  Uso: npm run hash-password -- "TuPassword"');
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  console.log('\nHash generado (cópialo en Vercel como ADMIN_PASSWORD_HASH):');
  console.log(hash);
});
