import { sql, ensureSchema } from '../../../lib/db';
import { requireAuth } from '../../../lib/admin-auth';

// The posts page is static (ISR); regenerate it right after a change so a
// new post is visible immediately, not a minute later.
const revalidatePosts = async (res, id) => {
  const paths = ['/posts', '/jp/posts', '/mn/posts'];
  if (id) paths.push(`/posts/${id}`, `/jp/posts/${id}`, `/mn/posts/${id}`);
  for (const path of paths) {
    try {
      await res.revalidate(path);
    } catch {
      // Page may not be built yet; ISR's timed revalidate covers it.
    }
  }
};

export default async function handler(req, res) {
  if (!requireAuth(req, res)) return;
  await ensureSchema();

  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    return res.json(rows);
  }

  if (req.method === 'POST') {
    const { title = '', content } = req.body || {};
    if (!content?.trim()) return res.status(400).json({ error: 'content required' });
    await sql`INSERT INTO posts (title, content) VALUES (${title.trim()}, ${content.trim()})`;
  } else if (req.method === 'DELETE') {
    const id = Number(req.query.id);
    if (!id) return res.status(400).json({ error: 'id required' });
    await sql`DELETE FROM posts WHERE id = ${id}`;
    await revalidatePosts(res, id);
    return res.json({ ok: true });
  } else {
    return res.status(405).end();
  }

  await revalidatePosts(res);
  res.json({ ok: true });
}
