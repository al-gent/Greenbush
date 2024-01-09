import { sql } from '@vercel/postgres';

export default async function createNote(req, res) {
  const { farmersNote } = req.body;

  await sql`
    INSERT INTO FarmersNotes (note)
    VALUES (${farmersNote});
  `;

  res.status(200).json({ noteAdded: true, note: farmersNote });
}
