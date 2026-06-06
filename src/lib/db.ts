import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

export const db = {
  query: async (text: string, params?: unknown[]) => {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params ?? []);
      return { rows: result.rows as Record<string, unknown>[] };
    } finally {
      client.release();
    }
  },
};