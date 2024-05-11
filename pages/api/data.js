import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { client } = req.query;
  console.log('API call is running - client is', client);
  const { rows: products } =
    await sql`SELECT * FROM Products WHERE client =${client.toLowerCase()} ORDER BY name ASC `;
  res.status(200).json(products);
}
