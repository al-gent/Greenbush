import { sql } from '@vercel/postgres';
 
export default async function createTable(request, response) {
  try {
    const result = 
    await sql`CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      notes TEXT,
      date TIMESTAMP,
      status VARCHAR(255),
      items text[]
    );`;

  } catch (error) {
    return response.status(500).json({ error });
  }
}