import { sql } from '@vercel/postgres';

export default async function getBuyerInfo(req, res) {
  const { email } = req.query;
  try {
    const buyerInfo = (
      await sql`
    SELECT * FROM buyers
    WHERE email = ${email};
    `
    ).rows[0];
    res.status(200).json(buyerInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Buyer could not be found' });
  }
}
