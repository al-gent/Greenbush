import { sql } from '@vercel/postgres';

export default async function getOrders(req, res) {
    const { rows: orders } = await sql`SELECT * FROM Orders;`;
    res.status(200).json(orders);
  }

