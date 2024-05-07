import { sql } from '@vercel/postgres';

export default async function addProduct(req, res) {
  const { id } = req.body;

  await sql`
    DELETE FROM products
    WHERE id = ${id};
    `;

  res.status(200).json({ productDeleted: true, id: id });
}
