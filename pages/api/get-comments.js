import { sql } from '@vercel/postgres';

export default async function getOrders(req, res) {
  const orders = (await sql`SELECT * FROM comments ORDER BY id DESC LIMIT 3;`)
    .rows;
  res.status(200).json(orders);
}
