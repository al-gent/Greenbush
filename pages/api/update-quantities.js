import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const products = req.body;
  for (const product of products) {
    const roundedQuantity = Math.round(product.quantity);
// set quantity should be subtracted from the current quantity - not set from the quantity bought
    await sql`
    UPDATE Products
    SET quantity = ${roundedQuantity}
    
    WHERE id = ${product.id};
  `;
    res.status(200).json({
      quantityUpdated: true,
      name: product.name,
      quantity: roundedQuantity,
    });
  }
}
