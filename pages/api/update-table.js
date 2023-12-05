import { sql } from '@vercel/postgres';

export default async function updateProducts(req, res) {
  const products = req.body;

  for (const product of products) {
  await sql`
    UPDATE Products
    SET Quantity = ${product.quantity}
    WHERE Name = ${product.name};
  `;
  }
  res.status(200).json( {message: 'Table updated successfully'});
}