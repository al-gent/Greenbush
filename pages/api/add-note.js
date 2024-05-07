import { sql } from '@vercel/postgres';

export default async function createNote(req, res) {
  const { farmersNote } = req.body;
  const { client } = req.query;

  await sql`
    INSERT INTO FarmersNotes (note, client)
    VALUES (${farmersNote}, ${client});
  `;

  res.status(200).json({ noteAdded: true, note: farmersNote });
}
