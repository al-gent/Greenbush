import { sql } from '@vercel/postgres';

export default async function getFarmerInfo(req, res) {
  const { client } = req.query;
  try {
    const farmerInfo = (
      await sql`
    SELECT * FROM farmers
    WHERE farmcode = ${client};
    `
    ).rows[0];
    res.status(200).json(farmerInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add farmer' });
  }
}
