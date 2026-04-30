'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put, del } from '@vercel/blob';

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

    // Optional fields
    const descripcionRaw = formData.get('descripcion');
    const potenciaRaw = formData.get('potencia');
    const colorRaw = formData.get('color');
    const etiquetaRaw = formData.get('etiquetaAmbiental');
    
    // El checkbox envía 'on' si está marcado
    const destacado = formData.get('destacado') === 'on' || formData.get('destacado') === 'true';

    const descripcion = descripcionRaw?.trim() || null;
    const potencia = potenciaRaw ? parseInt(potenciaRaw) || null : null;
    const color = colorRaw?.trim() || null;
    const etiquetaAmbiental = (etiquetaRaw && etiquetaRaw !== '') ? etiquetaRaw : null;

    // Base slug generated from brand & model
    const slug = `${marca.toLowerCase()}-${modelo.toLowerCase().replace(/ /g, '-')}-${Date.now()}`;

    // Lógica de destacados
    let finalDestacado = destacado;
    if (estado === 'vendido') {
      finalDestacado = false;
    }

    if (finalDestacado) {
      // Verificar si ya hay 3 destacados (excluyendo el actual si es edición)
      const query = {
        destacado: true,
        estado: { not: 'vendido' }
      };
      if (!isNew && id) {
        query.id = { not: id };
      }
      const destacadosCount = await prisma.vehicle.count({ where: query });
      if (destacadosCount >= 3) {
        return { error: 'Solo puedes mostrar hasta 3 vehículos destacados en la home.' };
      }
    }

    const data = {
      marca,
      modelo,
      version,
      year,
      kilometros,
      combustible,
      cambio,
      precio,
      estado,
      descripcion,
      potencia,
      color,
      etiquetaAmbiental,
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

    // Process image uploads
    const files = formData.getAll('images');
    for (const file of files) {
      if (file.size > 0 && file.name !== 'undefined') {
        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename, append timestamp to prevent collisions
        const filename = Date.now() + '-' + file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        
        const blob = await put(`uploads/${filename}`, buffer, { access: 'public' });

        // Check if there are existing images so we set esPrincipal correctly
        const existingImagesCount = await prisma.vehicleImage.count({ where: { vehicleId } });

        await prisma.vehicleImage.create({
          data: {
            url: blob.url,
            vehicleId,
            esPrincipal: existingImagesCount === 0, // First image uploaded becomes primary
          }
        });
      }
    }

    revalidatePath('/admin/vehiculos');
    revalidatePath('/coches-en-stock');
    revalidatePath('/');
    
    return { success: true, vehicleId };
  } catch (error) {
    console.error('Error saving vehicle:', error);
    return { error: 'Failed to save vehicle' };
  }
}

export async function deleteImageAction(imageId) {
  try {
    const img = await prisma.vehicleImage.findUnique({ where: { id: imageId } });
    if (!img) return { error: 'Not found' };

    // Try deleting from cloud
    try {
      if (img.url.includes('vercel-storage.com')) {
        await del(img.url);
      }
    } catch(err) {
      console.warn('File already deleted physically:', err.message);
    }

    await prisma.vehicleImage.delete({ where: { id: imageId } });
    return { success: true };
  } catch (err) {
    return { error: err.message };
  }
}

export async function deleteVehicleAction(vehicleId) {
  try {
    const images = await prisma.vehicleImage.findMany({ where: { vehicleId } });
    
    // Delete physical files
    for (const img of images) {
      try {
        if (img.url.includes('vercel-storage.com')) {
          await del(img.url);
        }
      } catch (err) {
        console.warn('Physical image not found for deletion:', err.message);
      }
    }

    // Delete vehicle (Cascade will handle images in DB if configured, but we do it manually or simply let Prisma handle it since it's onDelete: Cascade)
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
