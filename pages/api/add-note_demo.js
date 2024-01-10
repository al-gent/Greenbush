import { sql } from '@vercel/postgres';

export default async function createNote(req, res) {
  const { farmersNote } = req.body;

  await sql`
    INSERT INTO demo_farmersnotes (note)
    VALUES (${farmersNote});
  `;

  res.status(200).json({ noteAdded: true, note: farmersNote });
}
