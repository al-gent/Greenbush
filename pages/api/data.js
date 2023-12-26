import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { rows: products } = await sql`SELECT * FROM Products2 WHERE quantity > 0;`;
  res.status(200).json(products);
}