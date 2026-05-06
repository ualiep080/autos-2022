'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';

export async function saveVehicleAction(formData, id, isNew) {
  try {
    const marca = formData.get('marca');
    const modelo = formData.get('modelo');
    const precio = parseFloat(formData.get('precio'));
    const estado = formData.get('estado');
    const version = formData.get('version') || '1.0';
    const year = parseInt(formData.get('year')) || new Date().getFullYear();
    const kilometros = parseInt(formData.get('kilometros')) || 0;
    const combustible = formData.get('combustible') || 'Gasolina';
    const cambio = formData.get('cambio') || 'Manual';

    const descripcionRaw = formData.get('descripcion');
    const potenciaRaw = formData.get('potencia');
    const colorRaw = formData.get('color');
    const etiquetaRaw = formData.get('etiquetaAmbiental');

    const destacado = formData.get('destacado') === 'on' || formData.get('destacado') === 'true';

    const descripcion = descripcionRaw?.trim() || null;
    const potencia = potenciaRaw ? parseInt(potenciaRaw) || null : null;
    const color = colorRaw?.trim() || null;
    const etiquetaAmbiental = (etiquetaRaw && etiquetaRaw !== '') ? etiquetaRaw : null;

    const slug = `${marca.toLowerCase()}-${modelo.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;

    let finalDestacado = destacado;
    if (estado === 'vendido') {
      finalDestacado = false;
    }

    if (finalDestacado) {
      const query = { destacado: true, estado: { not: 'vendido' } };
      if (!isNew && id) query.id = { not: id };
      const destacadosCount = await prisma.vehicle.count({ where: query });
      if (destacadosCount >= 3) {
        return { error: 'Solo puedes mostrar hasta 3 vehículos destacados en la home.' };
      }
    }

    const data = {
      marca, modelo, version, year, kilometros, combustible, cambio,
      precio, estado, descripcion, potencia, color, etiquetaAmbiental,
      destacado: finalDestacado,
      slug: isNew ? slug : undefined,
    };

    let vehicleId = id;

    if (isNew) {
      const v = await prisma.vehicle.create({ data });
      vehicleId = v.id;
    } else {
      await prisma.vehicle.update({ where: { id }, data });
    }

    // Las imágenes ya fueron subidas a Vercel Blob desde el cliente.
    // El cliente envía las URLs resultantes como JSON en el campo imageUrls.
    const imageUrlsRaw = formData.get('imageUrls');
    if (imageUrlsRaw) {
      const imageUrls = JSON.parse(imageUrlsRaw);
      for (const url of imageUrls) {
        const existingCount = await prisma.vehicleImage.count({ where: { vehicleId } });
        await prisma.vehicleImage.create({
          data: {
            url,
            vehicleId,
            esPrincipal: existingCount === 0,
          },
        });
      }
    }

    revalidatePath('/admin/vehiculos');
    revalidatePath('/coches-en-stock');
    revalidatePath('/');

    return { success: true, vehicleId };
  } catch (error) {
    console.error('Error saving vehicle:', error);
    return { error: 'No se pudo guardar el vehículo. Inténtalo de nuevo.' };
  }
}

export async function deleteImageAction(imageId) {
  try {
    const img = await prisma.vehicleImage.findUnique({ where: { id: imageId } });
    if (!img) return { error: 'Imagen no encontrada' };

    try {
      if (img.url.includes('vercel-storage.com')) {
        await del(img.url);
      }
    } catch (err) {
      console.warn('No se pudo eliminar el archivo físico:', err.message);
    }

    await prisma.vehicleImage.delete({ where: { id: imageId } });
    return { success: true };
  } catch (err) {
    console.error('Error deleting image:', err);
    return { error: err.message };
  }
}

export async function deleteVehicleAction(vehicleId) {
  try {
    const images = await prisma.vehicleImage.findMany({ where: { vehicleId } });

    for (const img of images) {
      try {
        if (img.url.includes('vercel-storage.com')) {
          await del(img.url);
        }
      } catch (err) {
        console.warn('No se pudo eliminar archivo físico:', err.message);
      }
    }

    await prisma.vehicle.delete({ where: { id: vehicleId } });

    revalidatePath('/admin/vehiculos');
    revalidatePath('/coches-en-stock');
    revalidatePath('/');
    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (err) {
    console.error('Error deleting vehicle:', err);
    return { error: 'No se pudo eliminar el vehículo' };
  }
}
