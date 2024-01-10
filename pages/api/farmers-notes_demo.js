import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { rows: notes } =
    await sql`SELECT * FROM demo_farmersnotes ORDER BY id DESC LIMIT 1`;
  res.status(200).json(notes[0]);
}
