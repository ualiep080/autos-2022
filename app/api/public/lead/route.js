import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, telefono, email, mensaje, vehicleId } = body;

    if (!nombre || !telefono || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        nombre,
        telefono,
        email: email || '',
        mensaje,
        vehicleId: vehicleId || null,
      }
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
