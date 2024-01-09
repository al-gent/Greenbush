import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const products = req.body;
  for (const product of products) {
    await sql`
    UPDATE Products
    SET name = ${product.name}, unit = ${product.unit}, price = ${product.price}, quantity = ${product.quantity}
    WHERE id = ${id};
  `;
  }
  res.status(200).json({ productsUpdated: true, products: products });
}
