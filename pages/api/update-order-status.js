import { sql } from '@vercel/postgres';

export default async function updateOrder(req, res) {
  const { orderID, status } = req.body;
  const { client } = req.query;
  await sql`
  UPDATE orders
  SET status = ${status}
  WHERE id = ${orderID} AND client = ${client};
  `;
  res.status(200).json({ message: 'Status updated!' });
}
