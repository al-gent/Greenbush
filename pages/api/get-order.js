import { sql } from '@vercel/postgres';

export default async function getOrders(req, res) {
  const { ordernum } = req.query;
  try {
    const order = (await sql`SELECT * FROM orders WHERE id = ${ordernum}`)
      .rows[0];
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order could not be found' });
  }
}
