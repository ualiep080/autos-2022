import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getSession } from '@/lib/auth';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `"${file.name}" no es una imagen válida. Solo JPG, PNG y WebP.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `"${file.name}" supera el tamaño máximo de 5 MB.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;

    const blob = await put(`uploads/${filename}`, buffer, { access: 'public' });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('[upload-image]', error.message);
    return NextResponse.json({ error: 'Error al subir la imagen. Inténtalo de nuevo.' }, { status: 500 });
  }
}
