import { sql } from '@vercel/postgres';

export default async function getEmails(req, res) {
  const { client } = req.query;
  try {
    const emails = await sql`
      SELECT DISTINCT LOWER(email) as email FROM buyers
      WHERE farmcode = ${client};
    `;
    res.status(200).json(emails.rows.map((row) => row.email));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get emails' });
  }
}
