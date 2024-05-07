import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { client } = req.query;
  const { rows: products } =
    await sql`SELECT * FROM Products WHERE client =${client} ORDER BY name ASC `;
  res.status(200).json(products);
}
