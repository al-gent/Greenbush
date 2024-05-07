import { sql } from '@vercel/postgres';

export default async function deleteOrder(req, res) {
  const id = req.body;
  const { client } = req.query;
  console.log('deleting order #', id, client);
  await sql`
    DELETE FROM orders
    WHERE id = ${id} AND client = ${client};
    `;

  res.status(200).json({ productDeleted: true, id: id });
}
