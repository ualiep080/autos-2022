import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { event, page, element } = body;

    // Get IP from headers (Vercel sets x-forwarded-for)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await prisma.pageView.create({
      data: {
        event: event || 'pageview',
        page: page || '/',
        element: element || null,
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Silently fail — analytics should never break the app
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
