import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { loginAdmin } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const envEmail = process.env.ADMIN_EMAIL;
    const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!envEmail || !envPasswordHash) {
      console.error('Faltan variables de entorno ADMIN_EMAIL o ADMIN_PASSWORD_HASH');
      return NextResponse.json({ error: 'Configuración del servidor incompleta' }, { status: 500 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const emailMatch = email === envEmail;
    const passwordMatch = await bcrypt.compare(password, envPasswordHash);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    await loginAdmin('admin-env');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
