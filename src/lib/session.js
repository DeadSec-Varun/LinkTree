import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedKey)
}
 
export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session'+ error)
    return null;
  }
}

export async function getSession(req) {
  const session = req.cookies.get('session')?.value;
  
  if (!session) {
    return null;
  }
  
  const payload = await decrypt(session);
  if (!payload) {
    return null;
  }
  
  return payload;
}

export async function createSession(payload) {
// This function sets the session cookie with the encrypted payload
  const session = await encrypt(payload);
  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: Number(process.env.SESSION_EXPIRY),
    path: '/',
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

  