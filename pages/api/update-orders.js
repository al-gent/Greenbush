import { sql } from '@vercel/postgres';

export default async function updateOrder(req, res) {
  const order = req.body;
  const { client } = req.query;
  await sql`
  UPDATE orders
  SET status = 'edited', items = ${order.items}
  WHERE id = ${order.id} AND client = ${client};
  `;
  res.status(200).json({ message: 'Order updated!' });
}
