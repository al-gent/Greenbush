import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const products = req.body;
  for (const product of products) {
    await sql`
    UPDATE Products2
    SET quantity = ${product.quantity}
    WHERE id = ${product.id};
  `;
    res
      .status(200)
      .json({
        quantityUpdated: true,
        name: product.name,
        quantity: product.quantity,
      });
  }
}
