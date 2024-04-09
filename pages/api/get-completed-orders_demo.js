import { sql } from '@vercel/postgres';

export default async function getOrders(req, res) {
  const orders = (
    await sql`SELECT * FROM demo_orders WHERE status = 'completed' ORDER BY date DESC;`
  ).rows;
  res.status(200).json(orders);
}
