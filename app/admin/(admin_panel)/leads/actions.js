'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markAsContacted(formData) {
  const id = formData.get('id');
  if (!id) return;
  
  await prisma.lead.update({
    where: { id },
    data: { estado: 'contactado' }
  });
  
  revalidatePath('/admin/leads');
  revalidatePath('/admin/dashboard');
}

export async function markAsNew(formData) {
  const id = formData.get('id');
  if (!id) return;
  
  await prisma.lead.update({
    where: { id },
    data: { estado: 'nuevo' }
  });
  
  revalidatePath('/admin/leads');
  revalidatePath('/admin/dashboard');
}

export async function deleteLead(formData) {
  const id = formData.get('id');
  if (!id) return;
  
  try {
    await prisma.lead.delete({
      where: { id }
    });
    
    revalidatePath('/admin/leads');
    revalidatePath('/admin/dashboard');
  } catch (error) {
    console.error('Error deleting lead:', error);
  }
}
