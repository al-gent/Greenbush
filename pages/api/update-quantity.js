import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const { product, productName, newQuantity } = req.body;
  await sql`
    UPDATE Products
    SET quantity = ${newQuantity}
    WHERE id = ${product.id};
  `;
  res.status(200).json({
    quantityUpdated: true,
    name: productName,
    oldQuantity: product.quantity,
    newQuantity: newQuantity,
  });
}
