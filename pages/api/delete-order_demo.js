import { sql } from '@vercel/postgres';

export default async function deleteOrder(req, res) {
  const id = req.body;
  console.log('delete order', id);

  try {
    await sql`
      DELETE FROM demo_orders
      WHERE id = ${id};
      `;
  } catch (error) {
    console.error('SQL error', error);
    res.status(500).json({ error: 'Failed to delete order' });
    return;
  }

  res.status(200).json({ productDeleted: true, id: id });
}
