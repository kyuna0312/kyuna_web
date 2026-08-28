import crypto from 'crypto';

// Single-admin auth: the session cookie is an HMAC derived from
// ADMIN_PASSWORD, so there is no session store and restarting the server
// invalidates nothing. Changing the password invalidates every session.
const secret = () => process.env.ADMIN_PASSWORD || '';

export const sessionToken = () =>
  crypto.createHmac('sha256', secret()).update('admin-session').digest('hex');

const safeEqual = (a, b) => {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
};

export const passwordMatches = password => !!secret() && safeEqual(password, secret());

export const isAuthed = req => !!secret() && safeEqual(req.cookies?.admin || '', sessionToken());

export function requireAuth(req, res) {
  if (!isAuthed(req)) {
    res.status(401).json({ error: 'unauthorized' });
    return false;
  }
  return true;
}

export const sessionCookie = () =>
  `admin=${sessionToken()}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
