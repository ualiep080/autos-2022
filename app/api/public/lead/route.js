import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    let { nombre, telefono, email, mensaje, vehicleId } = body;

    if (!nombre || !telefono || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    nombre = String(nombre).trim();
    if (nombre.length < 2 || nombre.length > 80) {
      return NextResponse.json({ error: 'El nombre debe tener entre 2 y 80 caracteres' }, { status: 400 });
    }

    let rawPhone = String(telefono).trim();
    if (rawPhone.length > 20) {
      return NextResponse.json({ error: 'Formato de teléfono inválido' }, { status: 400 });
    }
    
    const cleanedPhone = rawPhone.replace(/[\s\-\(\)]/g, '');
    let finalPhone = cleanedPhone;
    if (finalPhone.startsWith('+34')) {
      finalPhone = finalPhone.substring(3);
    } else if (finalPhone.startsWith('0034')) {
      finalPhone = finalPhone.substring(4);
    }
    
    if (!/^[6789]\d{8}$/.test(finalPhone)) {
      return NextResponse.json({ error: 'El teléfono debe ser un número español válido de 9 dígitos' }, { status: 400 });
    }

    email = email ? String(email).trim() : '';
    if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: 'El email no es válido' }, { status: 400 });
    }

    mensaje = String(mensaje).trim();
    if (mensaje.length < 3 || mensaje.length > 1000) {
      return NextResponse.json({ error: 'El mensaje debe tener entre 3 y 1000 caracteres' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        nombre,
        telefono: finalPhone,
        email,
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
