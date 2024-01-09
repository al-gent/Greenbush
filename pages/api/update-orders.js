import { sql } from '@vercel/postgres';

export default async function updateOrder(req, res) {
  const order = req.body;
  await sql`
  UPDATE orders
  SET status = 'edited', items = ${order.items}
  WHERE id = ${order.id};
  `;
  res.status(200).json({ message: 'Order updated!' });
}
