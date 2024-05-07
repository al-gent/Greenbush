import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { client } = req.query;
  const { rows: notes } =
    await sql`SELECT * FROM farmersnotes WHERE client = ${client} ORDER BY id DESC LIMIT 1`;
  res.status(200).json(notes[0]);
}
