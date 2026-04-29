import { NextResponse } from 'next/server';
import { loginDemoAdmin } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envEmail || !envPassword) {
      console.error('Falta configuración de variables de entorno ADMIN_EMAIL o ADMIN_PASSWORD');
      return NextResponse.json({ error: 'Configuración del servidor incompleta' }, { status: 500 });
    }

    if (email !== envEmail || password !== envPassword) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Generate JWT cookie using a generic admin ID since we no longer rely on DB for auth
    await loginDemoAdmin('admin-env');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
