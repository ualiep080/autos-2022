import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginDemoAdmin } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const admin = await prisma.adminUser.findUnique({
      where: { email }
    });

    if (!admin) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // In a real application, use bcrypt.compare(password, admin.passwordHash)
    // For this business demo MVP:
    if (admin.passwordHash !== password) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Generate JWT cookie
    await loginDemoAdmin(admin.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
