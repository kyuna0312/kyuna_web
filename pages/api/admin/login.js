import { passwordMatches, sessionCookie } from '../../../lib/admin-auth';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not set on the server' });
  }
  if (!passwordMatches(req.body?.password)) {
    return res.status(401).json({ error: 'wrong password' });
  }
  res.setHeader('Set-Cookie', sessionCookie());
  res.json({ ok: true });
}
