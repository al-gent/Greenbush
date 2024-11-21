import { sql } from '@vercel/postgres';

export default async function getProducts(req, res) {
  const { client } = req.query;
  console.log('API call is running - client is', client);

  try {
    const { rows: products } = await sql`
      SELECT * FROM orders WHERE client = 'ggc' ORDER BY date;
    `;
    res.status(200).json(products);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}