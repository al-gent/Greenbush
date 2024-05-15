import { sql } from '@vercel/postgres';

export default async function getOrders(req, res) {
  const { client } = req.query;
  const count = (
    await sql`SELECT COUNT(*) FROM Orders WHERE status != 'completed' AND client = ${client};`
  ).rows[0].count;

  res.status(200).json(count);
}
