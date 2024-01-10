import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { rows: products } =
    await sql`SELECT * FROM demo_products ORDER BY name ASC`;
  res.status(200).json(products);
}
