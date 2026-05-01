import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(getSecretKey());
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, getSecretKey(), {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function loginAdmin(userId) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expires });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
