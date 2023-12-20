import { sql } from '@vercel/postgres';

export default async function updateProduct(req, res) {
  const {product, productName, newQuantity, unit, price} = req.body;

  await sql`
    UPDATE Products
    SET name = ${productName || product.name}, unit = ${unit || product.unit}, price = ${price || product.price}, quantity = ${newQuantity || product.quantity}
    WHERE id = ${product.id};
  `;
  res.status(200).json( {productUpdated: true, name: productName, oldQuantity: product.quantity, newQuantity: newQuantity});
}