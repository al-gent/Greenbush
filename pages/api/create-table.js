import { sql } from '@vercel/postgres';

export default async function createTable(request, response) {
  try {
    const result = await sql`CREATE TABLE products2 (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      quantity INTEGER,
      unit text[],
      price text[],
      client VARCHAR(255)
    );`;
  } catch (error) {
    return response.status(500).json({ error });
  }
}
