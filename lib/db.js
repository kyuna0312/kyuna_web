import { sql } from '@vercel/postgres';

export { sql };

// Schema lives with the client. Callers await ensureSchema() before querying;
// the promise is cached so it runs once per server instance.
let ready;
export function ensureSchema() {
  ready ||= (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        key TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        descriptions JSONB NOT NULL DEFAULT '{}',
        tech TEXT NOT NULL DEFAULT '',
        url TEXT,
        github TEXT,
        thumbnail TEXT,
        featured BOOLEAN NOT NULL DEFAULT false,
        sort INT NOT NULL DEFAULT 0
      )`;
  })();
  return ready;
}
