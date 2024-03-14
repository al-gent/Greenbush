import { sql } from '@vercel/postgres';

export default async function deleteOrder(req, res) {
  const id = req.body;
  console.log('deleting order #', id);
  await sql`
    DELETE FROM orders
    WHERE id = ${id};
    `;

  res.status(200).json({ productDeleted: true, id: id });
}
