import { sql, ensureSchema } from '../../../lib/db';
import { requireAuth } from '../../../lib/admin-auth';
import { defaultProjects } from '../../../lib/projects';

const revalidateProjects = async res => {
  for (const path of ['/projects', '/jp/projects', '/mn/projects']) {
    try {
      await res.revalidate(path);
    } catch {
      // Page may not be built yet; ISR's timed revalidate covers it.
    }
  }
};

const upsert = p => sql`
  INSERT INTO projects (key, title, descriptions, tech, url, github, thumbnail, featured, sort)
  VALUES (${p.key}, ${p.title}, ${JSON.stringify(p.descriptions || {})}, ${p.tech || ''},
          ${p.url || null}, ${p.github || null}, ${p.thumbnail || null},
          ${!!p.featured}, ${Number(p.sort) || 0})
  ON CONFLICT (key) DO UPDATE SET
    title = EXCLUDED.title,
    descriptions = EXCLUDED.descriptions,
    tech = EXCLUDED.tech,
    url = EXCLUDED.url,
    github = EXCLUDED.github,
    thumbnail = EXCLUDED.thumbnail,
    featured = EXCLUDED.featured,
    sort = EXCLUDED.sort`;

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  await ensureSchema();

  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM projects ORDER BY sort`;
    return res.json(rows);
  }

  if (req.method === 'POST' && req.body?.action === 'seed') {
    for (const p of defaultProjects()) await upsert(p);
  } else if (req.method === 'PUT') {
    const p = req.body;
    if (!p?.key || !p?.title) return res.status(400).json({ error: 'key and title required' });
    await upsert(p);
  } else if (req.method === 'DELETE') {
    const key = String(req.query.key || '');
    if (!key) return res.status(400).json({ error: 'key required' });
    await sql`DELETE FROM projects WHERE key = ${key}`;
  } else {
    return res.status(405).end();
  }

  await revalidateProjects(res);
  res.json({ ok: true });
}
