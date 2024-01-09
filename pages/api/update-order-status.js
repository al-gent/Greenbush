import { sql } from '@vercel/postgres';

export default async function updateOrder(req, res) {
  const { orderID, status } = req.body;
  await sql`
  UPDATE orders
  SET status = ${status}
  WHERE id = ${orderID};
  `;
  res.status(200).json({ message: 'Status updated!' });
}
