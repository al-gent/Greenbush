import { sql } from '@vercel/postgres';

export default async function updateProducts(req, res) {
  const products = req.body;

  for (const product of products) {
  await sql`
    UPDATE Products
    SET Quantity = ${product.quantity}
    WHERE id = ${product.id};
  `;
  }
  res.status(200).json( {message: 'Table updated successfully'});
}